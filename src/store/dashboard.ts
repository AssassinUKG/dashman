import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DashboardConfig, DashboardTile, EditorState, ThemeConfig } from '../types/dashboard';

interface DashboardStore {
  config: DashboardConfig;
  editorState: EditorState;
  
  // Actions
  updateConfig: (config: Partial<DashboardConfig>) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  addTile: (tile: DashboardTile) => void;
  updateTile: (id: string, updates: Partial<DashboardTile>) => void;
  removeTile: (id: string) => void;
  reorderTiles: (tiles: DashboardTile[]) => void;
  
  // Editor actions
  toggleEditor: () => void;
  setActiveTab: (tab: EditorState['activeTab']) => void;
  selectTile: (id?: string) => void;
  
  // Config management
  exportConfig: () => string;
  importConfig: (configJson: string) => void;
  resetConfig: () => void;
}

const defaultTheme: ThemeConfig = {
  mode: 'auto',
  preset: 'default',
  primaryColor: '#3b82f6',
  backgroundColor: '#f8fafc',
  cardBackground: '#ffffff',
  textColor: '#1e293b',
  accentColor: '#10b981',
  borderRadius: 8,
  fontFamily: 'Inter, system-ui, sans-serif',
};

const defaultConfig: DashboardConfig = {
  title: 'Homelab Dashboard',
  subtitle: 'Your personal service hub',
  theme: defaultTheme,
  layout: {
    columns: 4,
    gap: 16,
    padding: 24,
    showTitle: true,
    showSearch: true,
    showCategories: true,
    showEditButton: true,
  },
  tiles: [
    {
      id: '1',
      title: 'Proxmox',
      description: 'Virtualization Management',
      url: 'https://proxmox.local:8006',
      aliveCheckUrl: 'https://proxmox.local:8006/api2/json/version',
      icon: 'server',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      category: 'Infrastructure',
      status: 'checking',
      showStatusIndicator: true,
    },
    {
      id: '2',
      title: 'Home Assistant',
      description: 'Home Automation',
      url: 'http://homeassistant.local:8123',
      aliveCheckUrl: 'http://homeassistant.local:8123/api/',
      icon: 'home',
      position: { x: 1, y: 0 },
      size: { width: 1, height: 1 },
      category: 'Automation',
      status: 'checking',
      showStatusIndicator: true,
    },
    {
      id: '3',
      title: 'Plex',
      description: 'Media Server',
      url: 'http://plex.local:32400',
      aliveCheckUrl: 'http://plex.local:32400/web/index.html',
      icon: 'play',
      position: { x: 2, y: 0 },
      size: { width: 1, height: 1 },
      category: 'Media',
      status: 'checking',
      showStatusIndicator: true,
    },
  ],
  categories: [
    { id: '1', name: 'Infrastructure', color: '#ef4444', icon: 'server' },
    { id: '2', name: 'Automation', color: '#10b981', icon: 'home' },
    { id: '3', name: 'Media', color: '#8b5cf6', icon: 'play' },
    { id: '4', name: 'Monitoring', color: '#f59e0b', icon: 'activity' },
  ],
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      editorState: {
        isOpen: false,
        activeTab: 'tiles',
        selectedTile: undefined,
      },

      updateConfig: (updates) =>
        set((state) => ({
          config: { ...state.config, ...updates },
        })),

      updateTheme: (themeUpdates) =>
        set((state) => ({
          config: {
            ...state.config,
            theme: { ...state.config.theme, ...themeUpdates },
          },
        })),

      addTile: (tile) =>
        set((state) => ({
          config: {
            ...state.config,
            tiles: [...state.config.tiles, tile],
          },
        })),

      updateTile: (id, updates) =>
        set((state) => ({
          config: {
            ...state.config,
            tiles: state.config.tiles.map((tile) =>
              tile.id === id ? { ...tile, ...updates } : tile
            ),
          },
        })),

      removeTile: (id) =>
        set((state) => ({
          config: {
            ...state.config,
            tiles: state.config.tiles.filter((tile) => tile.id !== id),
          },
        })),

      reorderTiles: (tiles) =>
        set((state) => ({
          config: { ...state.config, tiles },
        })),

      toggleEditor: () =>
        set((state) => ({
          editorState: { ...state.editorState, isOpen: !state.editorState.isOpen },
        })),

      setActiveTab: (tab) =>
        set((state) => ({
          editorState: { ...state.editorState, activeTab: tab },
        })),

      selectTile: (id) =>
        set((state) => ({
          editorState: { ...state.editorState, selectedTile: id },
        })),

      exportConfig: () => {
        const { config } = get();
        return JSON.stringify(config, null, 2);
      },

      importConfig: (configJson) => {
        try {
          const config = JSON.parse(configJson);
          set({ config });
        } catch (error) {
          console.error('Failed to import config:', error);
        }
      },

      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: 'dashman-storage',
      partialize: (state) => ({ config: state.config }),
    }
  )
);
