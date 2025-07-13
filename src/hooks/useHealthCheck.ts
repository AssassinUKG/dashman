import { useState, useEffect, useRef } from 'react';
import type { DashboardTile } from '../types/dashboard';

export interface HealthStatus {
  [tileId: string]: 'online' | 'offline' | 'checking';
}

export const useHealthCheck = (tiles: DashboardTile[], enabled: boolean = true) => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({});
  const intervalRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const checkHealth = async (tile: DashboardTile): Promise<'online' | 'offline'> => {
    const checkUrl = tile.aliveCheckUrl || tile.url;
    
    if (!checkUrl) return 'offline';

    try {
      // Create a new AbortController for this request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      // Try to fetch the URL
      await fetch(checkUrl, {
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
          img.src = `${new URL(checkUrl).origin}/favicon.ico?t=${Date.now()}`;
        });
      } catch {
        return 'offline';
      }
    }
  };

  const checkAllTiles = async () => {
    if (!enabled || tiles.length === 0) return;

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
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial check
    checkAllTiles();

    // Set up periodic checks every 30 seconds
    intervalRef.current = setInterval(checkAllTiles, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [tiles, enabled]);

  return {
    healthStatus,
    checkAllTiles,
    isChecking: Object.values(healthStatus).some(status => status === 'checking')
  };
};
