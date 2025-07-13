import React from 'react';
import { useDashboardStore } from '../../store/dashboard';

export const ThemeEditor: React.FC = () => {
  const { config, updateTheme } = useDashboardStore();

  const lightTheme = {
    primaryColor: '#3b82f6',
    backgroundColor: '#f8fafc',
    cardBackground: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#10b981',
  };

  const darkTheme = {
    primaryColor: '#60a5fa',
    backgroundColor: '#0f172a',
    cardBackground: '#1e293b',
    textColor: '#f1f5f9',
    accentColor: '#34d399',
  };

  const applyPreset = (preset: 'light' | 'dark') => {
    const colors = preset === 'light' ? lightTheme : darkTheme;
    updateTheme({
      mode: preset,
      preset: 'default',
      ...colors,
    });
  };

  const toggleCustomMode = () => {
    updateTheme({ preset: config.theme.preset === 'custom' ? 'default' : 'custom' });
  };
  return (
    <div className="theme-editor">
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Theme Settings</h3>
        
        <div className="form-fields">
          {/* Theme Presets */}
          <div className="field">
            <label style={{ color: config.theme.textColor }}>Quick Themes</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                onClick={() => applyPreset('light')}
                style={{
                  padding: '12px 20px',
                  backgroundColor: config.theme.mode === 'light' && config.theme.preset === 'default' 
                    ? config.theme.primaryColor : 'transparent',
                  color: config.theme.mode === 'light' && config.theme.preset === 'default' 
                    ? 'white' : config.theme.textColor,
                  border: `2px solid ${config.theme.primaryColor}`,
                  borderRadius: config.theme.borderRadius,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  flex: 1,
                }}
              >
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #3b82f6 100%)',
                  borderRadius: '50%',
                  border: '1px solid #e2e8f0'
                }} />
                <span style={{ fontSize: '12px' }}>Light</span>
              </button>
              
              <button
                onClick={() => applyPreset('dark')}
                style={{
                  padding: '12px 20px',
                  backgroundColor: config.theme.mode === 'dark' && config.theme.preset === 'default' 
                    ? config.theme.primaryColor : 'transparent',
                  color: config.theme.mode === 'dark' && config.theme.preset === 'default' 
                    ? 'white' : config.theme.textColor,
                  border: `2px solid ${config.theme.primaryColor}`,
                  borderRadius: config.theme.borderRadius,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  flex: 1,
                }}
              >
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #60a5fa 100%)',
                  borderRadius: '50%',
                  border: '1px solid #334155'
                }} />
                <span style={{ fontSize: '12px' }}>Dark</span>
              </button>
            </div>
          </div>

          {/* Theme Mode */}
          <div className="field">
            <label style={{ color: config.theme.textColor }}>Theme Mode</label>
            <select
              value={config.theme.mode}
              onChange={(e) => updateTheme({ mode: e.target.value as 'light' | 'dark' | 'auto' })}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                width: '100%',
                padding: '8px 12px',
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          {/* Custom Colors Toggle */}
          <div className="field checkbox-field">
            <input
              type="checkbox"
              checked={config.theme.preset === 'custom'}
              onChange={toggleCustomMode}
              id="customColors"
            />
            <label htmlFor="customColors" style={{ color: config.theme.textColor }}>
              Custom Colors
            </label>
          </div>
        </div>
      </div>

      {/* Custom Color Controls */}
      {config.theme.preset === 'custom' && (
        <div className="editor-section">
          <h3 style={{ color: config.theme.textColor }}>Custom Colors</h3>
          
          <div className="form-fields">
            <div className="field">
              <label style={{ color: config.theme.textColor }}>Primary Color</label>
              <input
                type="color"
                value={config.theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  width: '100%',
                  height: '40px',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Background Color</label>
              <input
                type="color"
                value={config.theme.backgroundColor}
                onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  width: '100%',
                  height: '40px',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Card Background</label>
              <input
                type="color"
                value={config.theme.cardBackground}
                onChange={(e) => updateTheme({ cardBackground: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  width: '100%',
                  height: '40px',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Text Color</label>
              <input
                type="color"
                value={config.theme.textColor}
                onChange={(e) => updateTheme({ textColor: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  width: '100%',
                  height: '40px',
                  cursor: 'pointer',
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Accent Color</label>
              <input
                type="color"
                value={config.theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  width: '100%',
                  height: '40px',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Visual Settings</h3>
        
        <div className="form-fields">
          {/* Border Radius */}
          <div className="field">
            <label style={{ color: config.theme.textColor }}>
              Border Radius: {config.theme.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={config.theme.borderRadius}
              onChange={(e) => updateTheme({ borderRadius: parseInt(e.target.value) })}
              style={{
                width: '100%',
                marginTop: '8px',
                accentColor: config.theme.primaryColor,
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: config.theme.textColor,
              opacity: 0.6,
              marginTop: '4px'
            }}>
              <span>0px</span>
              <span>20px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
