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
  backgroundType?: 'color' | 'image' | 'pattern';
  backgroundBlur?: number;
  cardOpacity?: number;
  cardBlur?: number;
  cardBorderWidth?: number;
  cardBorderColor?: string;
  cardShadow?: string;
  pattern?: 'dots' | 'grid' | 'waves' | 'circuit' | 'hexagon' | 'diagonal' | 'triangles' | 'none';
  patternOpacity?: number;
  patternSize?: number;
  animation?: 'none' | 'subtle' | 'floating' | 'pulse' | 'glow' | 'fade' | 'slide' | 'scale' | 'bounce';
  headerStyle?: 'default' | 'glass' | 'solid' | 'gradient' | 'hidden' | 'minimal' | 'centered' | 'floating';
  tileStyle?: 'default' | 'glass' | 'neumorphism' | 'flat' | 'elevated' | 'neon' | 'minimal' | 'outlined';
  compactMode?: boolean;
  reduceMotion?: boolean;
  particleEffects?: boolean;
  
  // Effect customization options
  glowColor?: string; // Custom glow color
  glowIntensity?: number; // 0-100, intensity of glow effects
  glowSpeed?: number; // 0.1-5.0, animation speed multiplier
  pulseColor?: string; // Custom pulse color
  pulseSpeed?: number; // 0.1-5.0, pulse speed
  floatDistance?: number; // 1-50, floating distance in pixels
  floatSpeed?: number; // 0.1-5.0, floating speed
  particleColor?: string; // Custom particle color
  particleCount?: number; // 10-200, number of particles
  particleSpeed?: number; // 0.1-3.0, particle movement speed
  particleSize?: number; // 1-10, particle size in pixels
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
