import React from 'react';
import { useDashboardStore } from '../../store/dashboard';

export const ThemeEditor: React.FC = () => {
  const { config, updateTheme } = useDashboardStore();

  // Simple theme presets that work
  const themePresets = {
    light: {
      mode: 'light' as const,
      preset: 'default' as const,
      primaryColor: '#3b82f6',
      backgroundColor: '#f8fafc',
      cardBackground: '#ffffff',
      textColor: '#1e293b',
      accentColor: '#10b981',
    },
    dark: {
      mode: 'dark' as const,
      preset: 'default' as const,
      primaryColor: '#60a5fa',
      backgroundColor: '#0f172a',
      cardBackground: '#1e293b',
      textColor: '#f1f5f9',
      accentColor: '#34d399',
    },
    ocean: {
      mode: 'dark' as const,
      preset: 'ocean' as const,
      primaryColor: '#0ea5e9',
      backgroundColor: '#0c4a6e',
      cardBackground: '#1e293b',
      textColor: '#e0f2fe',
      accentColor: '#06b6d4',
    },
    cyberpunk: {
      mode: 'dark' as const,
      preset: 'cyberpunk' as const,
      primaryColor: '#e879f9',
      backgroundColor: '#0a0a0a',
      cardBackground: '#1a1a2e',
      textColor: '#f0abfc',
      accentColor: '#06ffa5',
    },
  };

  const applyPreset = (presetName: keyof typeof themePresets) => {
    const preset = themePresets[presetName];
    updateTheme(preset);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTheme({ mode: e.target.value as any });
  };

  const handleColorChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTheme({ [field]: e.target.value });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTheme({ borderRadius: `${e.target.value}px` });
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTheme({ fontFamily: e.target.value });
  };

  const resetTheme = () => {
    updateTheme({
      mode: 'dark',
      preset: 'default',
      primaryColor: '#60a5fa',
      backgroundColor: '#0f172a',
      cardBackground: '#1e293b',
      textColor: '#f1f5f9',
      accentColor: '#34d399',
      borderRadius: '8px',
      fontFamily: 'Inter, system-ui, sans-serif',
    });
  };

  return (
    <div className="theme-editor">
      {/* Quick Theme Presets */}
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Quick Themes</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '12px', 
          marginTop: '12px' 
        }}>
          {Object.entries(themePresets).map(([key]) => (
            <button
              key={key}
              onClick={() => applyPreset(key as keyof typeof themePresets)}
              style={{
                padding: '12px 8px',
                backgroundColor: config.theme.preset === key 
                  ? config.theme.primaryColor : 'transparent',
                color: config.theme.preset === key 
                  ? 'white' : config.theme.textColor,
                border: `2px solid ${config.theme.primaryColor}`,
                borderRadius: config.theme.borderRadius,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Mode */}
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Theme Mode</h3>
        
        <div className="form-fields">
          <div className="field">
            <select
              value={config.theme.mode}
              onChange={handleModeChange}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                width: '100%',
                padding: '8px 12px',
              }}
            >
              <option value="light">☀️ Light Mode</option>
              <option value="dark">🌙 Dark Mode</option>
              <option value="auto">🔄 Auto (System)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Color Customization */}
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Colors</h3>
        
        <div className="form-fields">
          <div className="field">
            <label style={{ color: config.theme.textColor }}>Primary Color</label>
            <input
              type="color"
              value={config.theme.primaryColor}
              onChange={handleColorChange('primaryColor')}
              style={{
                width: '100%',
                height: '40px',
                border: 'none',
                borderRadius: config.theme.borderRadius,
                cursor: 'pointer',
                marginTop: '8px',
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Background Color</label>
            <input
              type="color"
              value={config.theme.backgroundColor}
              onChange={handleColorChange('backgroundColor')}
              style={{
                width: '100%',
                height: '40px',
                border: 'none',
                borderRadius: config.theme.borderRadius,
                cursor: 'pointer',
                marginTop: '8px',
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Card Background</label>
            <input
              type="color"
              value={config.theme.cardBackground}
              onChange={handleColorChange('cardBackground')}
              style={{
                width: '100%',
                height: '40px',
                border: 'none',
                borderRadius: config.theme.borderRadius,
                cursor: 'pointer',
                marginTop: '8px',
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Text Color</label>
            <input
              type="color"
              value={config.theme.textColor}
              onChange={handleColorChange('textColor')}
              style={{
                width: '100%',
                height: '40px',
                border: 'none',
                borderRadius: config.theme.borderRadius,
                cursor: 'pointer',
                marginTop: '8px',
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Accent Color</label>
            <input
              type="color"
              value={config.theme.accentColor}
              onChange={handleColorChange('accentColor')}
              style={{
                width: '100%',
                height: '40px',
                border: 'none',
                borderRadius: config.theme.borderRadius,
                cursor: 'pointer',
                marginTop: '8px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Layout</h3>
        
        <div className="form-fields">
          <div className="field">
            <label style={{ color: config.theme.textColor }}>
              Border Radius: {parseInt(String(config.theme.borderRadius || '8px').replace('px', ''))}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={parseInt(String(config.theme.borderRadius || '8px').replace('px', ''))}
              onChange={handleRangeChange}
              style={{
                width: '100%',
                marginTop: '8px',
                accentColor: config.theme.primaryColor,
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Font Family</label>
            <select
              value={config.theme.fontFamily || 'Inter'}
              onChange={handleFontChange}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                width: '100%',
                padding: '8px 12px',
                marginTop: '8px',
              }}
            >
              <option value="Inter">Inter (Default)</option>
              <option value="SF Pro Display">SF Pro Display</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
              <option value="JetBrains Mono">JetBrains Mono</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="editor-section">
        <div className="form-fields">
          <div className="field">
            <button
              onClick={resetTheme}
              style={{
                backgroundColor: 'transparent',
                color: config.theme.textColor,
                border: `2px solid ${config.theme.primaryColor}`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 16px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '8px',
              }}
            >
              🔄 Reset to Default Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
