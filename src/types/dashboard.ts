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
  theme: ThemeConfig;
  layout: LayoutConfig;
  tiles: DashboardTile[];
  categories?: Category[];
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  preset: 'default' | 'custom';
  primaryColor: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  accentColor: string;
  borderRadius: number;
  fontFamily: string;
  customCss?: string;
}

export interface LayoutConfig {
  columns: number;
  gap: number;
  padding: number;
  showTitle: boolean;
  showSearch: boolean;
  showCategories: boolean;
  showEditButton: boolean;
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
