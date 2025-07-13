export interface DashboardTile {
  id: string;
  title: string;
  description?: string;
  url: string;
  fallbackUrl?: string;
  aliveCheckUrl?: string; // URL to check if service is alive
  icon?: string;
  iconType?: 'lucide' | 'url' | 'svg' | 'upload';
  iconUrl?: string;
  iconSvg?: string;
  color?: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  category?: string;
  tags?: string[];
  isExternal?: boolean;
  status?: 'online' | 'offline' | 'checking';
  openInNewTab?: boolean;
  showStatusIndicator?: boolean; // Per-tile status indicator control
}

export interface DashboardConfig {
  title: string;
  subtitle?: string;
  favicon?: string;
  faviconType?: 'emoji' | 'url' | 'upload';
  theme: ThemeConfig;
  layout: LayoutConfig;
  tiles: DashboardTile[];
  categories?: Category[];
  healthCheck?: HealthCheckConfig;
}

export interface HealthCheckConfig {
  enabled: boolean;
  interval: number; // in seconds
  timeout: number; // in seconds
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  preset: 'default' | 'custom' | 'ocean' | 'forest' | 'sunset' | 'midnight' | 'lavender' | 'mint' | 'coral' | 'amber' | 'cyberpunk' | 'matrix';
  primaryColor: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  accentColor: string;
  borderRadius: string;
  fontFamily: string;
  customCss?: string;
  
  // New theming options
  backgroundImage?: string;
  backgroundType?: 'color' | 'gradient' | 'image' | 'pattern';
  backgroundOpacity?: number;
  backgroundBlur?: number;
  cardOpacity?: number;
  cardBlur?: number;
  cardBorderWidth?: number;
  cardBorderColor?: string;
  cardShadow?: string;
  gradientDirection?: number; // degrees for gradient
  gradientColors?: string[]; // array of colors for gradient
  pattern?: 'dots' | 'grid' | 'waves' | 'circuit' | 'hexagon' | 'none';
  patternOpacity?: number;
  patternSize?: number;
  animation?: 'none' | 'subtle' | 'floating' | 'pulse' | 'glow' | 'fade' | 'slide' | 'scale' | 'bounce';
  headerStyle?: 'default' | 'glass' | 'solid' | 'gradient' | 'hidden' | 'minimal' | 'centered' | 'floating';
  tileStyle?: 'default' | 'glass' | 'neumorphism' | 'flat' | 'elevated' | 'neon' | 'minimal' | 'outlined';
  compactMode?: boolean;
  reduceMotion?: boolean;
  particleEffects?: boolean;
}

export interface LayoutConfig {
  columns: number;
  gap: number;
  padding: number;
  showTitle: boolean;
  showSearch: boolean;
  showCategories: boolean;
  showEditButton: boolean;
  gridType?: 'fixed' | 'auto-fit' | 'responsive';
  minTileWidth?: number;
  maxTileWidth?: number;
  tileAspectRatio?: number;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface EditorState {
  isOpen: boolean;
  activeTab: 'tiles' | 'page' | 'theme' | 'layout' | 'config';
  selectedTile?: string;
}
