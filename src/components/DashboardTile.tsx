import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Globe, AlertCircle, Server, Home, Play, Monitor, Shield, Database, Cloud, Wifi, Settings, HardDrive, Folder, File, Download, Upload, Camera, Music, Video, Image, Book, Mail, Phone, Calendar, Clock, Search } from 'lucide-react';
import type { DashboardTile as TileType, ThemeConfig } from '../types/dashboard';
import { useDashboardStore } from '../store/dashboard';

interface DashboardTileProps {
  tile: TileType;
  theme: ThemeConfig;
  healthStatus?: 'online' | 'offline' | 'checking';
  healthCheckEnabled?: boolean;
}

export const DashboardTile: React.FC<DashboardTileProps> = ({ 
  tile, 
  theme,
  healthStatus,
  healthCheckEnabled = true
}) => {
  const { selectTile, editorState } = useDashboardStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: tile.id,
    disabled: !editorState.isOpen // Only enable drag when editor is open
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Always allow navigation when editor is closed
    if (!editorState.isOpen) {
      // Determine which URL to use based on health status
      let urlToOpen = tile.url;
      
      // If health checking is enabled and the service is offline and we have a fallback URL, use it instead
      if (healthCheckEnabled && healthStatus === 'offline' && tile.fallbackUrl) {
        urlToOpen = tile.fallbackUrl;
        console.log('Service is offline, using fallback URL:', tile.fallbackUrl);
      } else if (tile.url) {
        console.log('Using primary URL:', tile.url);
      }
      
      // Navigate to the determined URL
      if (urlToOpen) {
        console.log('Opening URL:', urlToOpen, 'openInNewTab:', tile.openInNewTab ?? true);
        
        const shouldOpenInNewTab = tile.openInNewTab ?? true; // Default to new tab if not specified
        
        if (shouldOpenInNewTab) {
          // Open in new tab ONLY
          console.log('Opening in new tab only');
          window.open(urlToOpen, '_blank', 'noopener,noreferrer');
          return; // Stop here - don't do anything else
        } else {
          // Open in current tab ONLY
          console.log('Opening in current tab only');
          window.location.href = urlToOpen;
          return; // Stop here - don't do anything else
        }
      }
    } else {
      // In edit mode (editor open), select the tile for editing
      console.log('Edit mode: selecting tile for editing');
      selectTile(tile.id);
    }
  };

  const getIconComponent = () => {
    // Handle different icon types
    if (tile.iconType === 'url' && tile.iconUrl) {
      return (
        <img 
          src={tile.iconUrl} 
          alt={tile.title}
          className="tile-icon"
          style={{ 
            width: '32px', 
            height: '32px', 
            objectFit: 'contain',
            borderRadius: '4px'
          }}
          onError={(e) => {
            // Fallback to default icon if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    if (tile.iconType === 'svg' && tile.iconSvg) {
      return (
        <div 
          className="tile-icon"
          style={{ 
            width: '32px', 
            height: '32px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          dangerouslySetInnerHTML={{ __html: tile.iconSvg }}
        />
      );
    }

    if (tile.iconType === 'upload' && tile.iconUrl) {
      return (
        <img 
          src={tile.iconUrl} 
          alt={tile.title}
          className="tile-icon"
          style={{ 
            width: '32px', 
            height: '32px', 
            objectFit: 'contain',
            borderRadius: '4px'
          }}
        />
      );
    }

    // Default to Lucide icons
    const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
      server: Server,
      home: Home,
      play: Play,
      monitor: Monitor,
      shield: Shield,
      database: Database,
      cloud: Cloud,
      wifi: Wifi,
      settings: Settings,
      'hard-drive': HardDrive,
      globe: Globe,
      folder: Folder,
      file: File,
      download: Download,
      upload: Upload,
      camera: Camera,
      music: Music,
      video: Video,
      image: Image,
      book: Book,
      mail: Mail,
      phone: Phone,
      calendar: Calendar,
      clock: Clock,
      search: Search,
    };

    const IconComponent = tile.icon ? iconMap[tile.icon.toLowerCase()] || Globe : Globe;
    return <IconComponent size={32} className="tile-icon" />;
  };

  const getStatusIcon = () => {
    const status = healthStatus || tile.status || 'checking';
    switch (status) {
      case 'online':
        return <Globe size={12} color="#10b981" />;
      case 'offline':
        return <AlertCircle size={12} color="#ef4444" />;
      case 'checking':
      default:
        return <AlertCircle size={12} color="#f59e0b" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(editorState.isOpen ? attributes : {})}
      {...(editorState.isOpen ? listeners : {})}
      className={`dashboard-tile ${editorState.selectedTile === tile.id ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div 
        className="tile-content"
        style={{
          backgroundColor: theme.cardBackground,
          borderRadius: theme.borderRadius,
          border: editorState.selectedTile === tile.id ? `2px solid ${theme.primaryColor}` : '1px solid #e2e8f0',
          color: theme.textColor,
          fontFamily: theme.fontFamily,
        }}
      >
        <div className="tile-header">
          <div className="tile-status">
            {tile.showStatusIndicator && healthCheckEnabled && getStatusIcon()}
          </div>
          {tile.isExternal && (
            <ExternalLink size={14} className="external-link-icon" />
          )}
        </div>
        
        <div className="tile-body">
          <div className="tile-icon-container">
            {getIconComponent()}
          </div>
          <h3 className="tile-title">{tile.title}</h3>
          {tile.description && (
            <p className="tile-description">{tile.description}</p>
          )}
          {healthCheckEnabled && healthStatus === 'offline' && tile.fallbackUrl && (
            <div 
              className="tile-fallback-indicator"
              style={{ 
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7rem', 
                opacity: 0.9, 
                color: '#f97316', // Orange color
                fontWeight: '500',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}
            >
              Using backup URL
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
