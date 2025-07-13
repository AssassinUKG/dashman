import { useState, useEffect, useRef } from 'react';
import type { DashboardTile, HealthCheckConfig } from '../types/dashboard';

export interface HealthStatus {
  [tileId: string]: 'online' | 'offline' | 'checking';
}

export const useHealthCheck = (tiles: DashboardTile[], healthCheckConfig?: HealthCheckConfig) => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({});
  const intervalRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Use default values if no config provided
  const config = healthCheckConfig || {
    enabled: true,
    interval: 30,
    timeout: 5
  };

  const checkUrlHealth = async (url: string): Promise<'online' | 'offline'> => {
    try {
      // Create a new AbortController for this request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout * 1000); // Convert to milliseconds

      // Try to fetch the URL
      await fetch(url, {
        method: 'HEAD', // Use HEAD to minimize data transfer
        mode: 'no-cors', // Handle CORS issues
        signal: controller.signal,
        cache: 'no-cache',
      });

      clearTimeout(timeoutId);
      
      // For no-cors mode, we can't check status, but if it doesn't throw, it's likely online
      return 'online';
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return 'offline'; // Timeout
      }
      
      // Try a simple ping approach as fallback
      try {
        const img = new Image();
        return new Promise<'online' | 'offline'>((resolve) => {
          const timeout = setTimeout(() => {
            resolve('offline');
          }, 3000);

          img.onload = () => {
            clearTimeout(timeout);
            resolve('online');
          };
          
          img.onerror = () => {
            clearTimeout(timeout);
            resolve('offline');
          };
          
          // Try to load a favicon or small resource
          img.src = `${new URL(url).origin}/favicon.ico?t=${Date.now()}`;
        });
      } catch {
        return 'offline';
      }
    }
  };

  const checkHealth = async (tile: DashboardTile): Promise<'online' | 'offline'> => {
    // For health checking, prioritize the dedicated health check URL
    // If no health check URL is set, fall back to the main URL
    const healthCheckUrl = tile.aliveCheckUrl || tile.url;
    
    if (!healthCheckUrl) return 'offline';

    const status = await checkUrlHealth(healthCheckUrl);
    return status;
  };

  const checkAllTiles = async () => {
    if (!config.enabled || tiles.length === 0) return;

    // Set all tiles to checking state
    const checkingStatus: HealthStatus = {};
    tiles.forEach(tile => {
      checkingStatus[tile.id] = 'checking';
    });
    setHealthStatus(checkingStatus);

    // Check each tile
    const promises = tiles.map(async (tile) => {
      const status = await checkHealth(tile);
      return { tileId: tile.id, status };
    });

    try {
      const results = await Promise.allSettled(promises);
      const newStatus: HealthStatus = {};
      
      results.forEach((result, index) => {
        const tileId = tiles[index].id;
        if (result.status === 'fulfilled') {
          newStatus[tileId] = result.value.status;
        } else {
          newStatus[tileId] = 'offline';
        }
      });

      setHealthStatus(newStatus);
    } catch (error) {
      console.error('Health check error:', error);
    }
  };

  useEffect(() => {
    if (!config.enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial check
    checkAllTiles();

    // Set up periodic checks using the configured interval
    intervalRef.current = setInterval(checkAllTiles, config.interval * 1000); // Convert to milliseconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [tiles, config.enabled, config.interval, config.timeout]);

  return {
    healthStatus,
    checkAllTiles,
    isChecking: Object.values(healthStatus).some(status => status === 'checking')
  };
};
