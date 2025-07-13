import React, { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboard';

export const FaviconManager: React.FC = () => {
  const { config } = useDashboardStore();

  useEffect(() => {
    const updateFavicon = () => {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      existingLinks.forEach(link => link.remove());

      if (config.favicon) {
        if (config.faviconType === 'emoji') {
          // Create emoji favicon using canvas
          const canvas = document.createElement('canvas');
          canvas.width = 32;
          canvas.height = 32;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.font = '24px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(config.favicon, 16, 16);
            
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            link.href = dataURL;
            document.head.appendChild(link);
          }
        } else if (config.faviconType === 'url' || config.faviconType === 'upload') {
          // Use provided URL or uploaded image
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/x-icon';
          link.href = config.favicon;
          document.head.appendChild(link);
        }
      }
      
      // Also update the page title
      document.title = config.title || 'Dashman - Homelab Dashboard';
    };

    updateFavicon();
  }, [config.favicon, config.faviconType, config.title]);

  return null;
};
