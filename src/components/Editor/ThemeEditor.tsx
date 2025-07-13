import React from 'react';
import { useDashboardStore } from '../../store/dashboard';

export const ThemeEditor: React.FC = () => {
  const { config, updateTheme } = useDashboardStore();

  // Enhanced theme presets with new features
  const themePresets = {
    light: {
      mode: 'light' as const,
      preset: 'default' as const,
      primaryColor: '#3b82f6',
      backgroundColor: '#f8fafc',
      cardBackground: '#ffffff',
      textColor: '#1e293b',
      accentColor: '#10b981',
      backgroundType: 'color' as const,
      animation: 'none' as const,
      particleEffects: false,
      tileStyle: 'default' as const,
      headerStyle: 'default' as const,
    },
    dark: {
      mode: 'dark' as const,
      preset: 'default' as const,
      primaryColor: '#60a5fa',
      backgroundColor: '#0f172a',
      cardBackground: '#1e293b',
      textColor: '#f1f5f9',
      accentColor: '#34d399',
      backgroundType: 'color' as const,
      animation: 'none' as const,
      particleEffects: false,
      tileStyle: 'default' as const,
      headerStyle: 'default' as const,
    },
    ocean: {
      mode: 'dark' as const,
      preset: 'ocean' as const,
      primaryColor: '#0ea5e9',
      backgroundColor: '#0c4a6e',
      cardBackground: '#1e293b',
      textColor: '#e0f2fe',
      accentColor: '#06b6d4',
      backgroundType: 'pattern' as const,
      pattern: 'waves' as const,
      patternOpacity: 25,
      animation: 'floating' as const,
      floatDistance: 8,
      floatSpeed: 6,
      particleEffects: false,
      tileStyle: 'glass' as const,
      headerStyle: 'glass' as const,
    },
    cyberpunk: {
      mode: 'dark' as const,
      preset: 'cyberpunk' as const,
      primaryColor: '#e879f9',
      backgroundColor: '#0a0a0a',
      cardBackground: '#1a1a2e',
      textColor: '#f0abfc',
      accentColor: '#06ffa5',
      backgroundType: 'pattern' as const,
      pattern: 'circuit' as const,
      patternOpacity: 15,
      particleEffects: true,
      animation: 'glow' as const,
      glowColor: '#06ffa5',
      glowIntensity: 75,
      glowSpeed: 1.5,
      particleColor: '#e879f9',
      particleCount: 60,
      particleSpeed: 0.8,
      particleSize: 4,
      tileStyle: 'neon' as const,
      headerStyle: 'floating' as const,
    },
    matrix: {
      mode: 'dark' as const,
      preset: 'matrix' as const,
      primaryColor: '#00ff41',
      backgroundColor: '#000000',
      cardBackground: '#001100',
      textColor: '#00ff41',
      accentColor: '#00cc33',
      backgroundType: 'pattern' as const,
      pattern: 'dots' as const,
      patternOpacity: 10,
      particleEffects: true,
      animation: 'pulse' as const,
      pulseColor: '#00ff41',
      pulseSpeed: 1.8,
      particleColor: '#00ff41',
      particleCount: 80,
      particleSpeed: 1.2,
      particleSize: 3,
      tileStyle: 'flat' as const,
      headerStyle: 'minimal' as const,
    },
    sunset: {
      mode: 'dark' as const,
      preset: 'sunset' as const,
      primaryColor: '#f97316',
      backgroundColor: '#7c2d12',
      cardBackground: '#92400e',
      textColor: '#fed7aa',
      accentColor: '#fb923c',
      backgroundType: 'color' as const,
      animation: 'floating' as const,
      floatDistance: 12,
      floatSpeed: 4,
      particleEffects: false,
      tileStyle: 'elevated' as const,
      headerStyle: 'default' as const,
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
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '12px', 
          marginTop: '12px' 
        }}>
          {Object.entries(themePresets).map(([key, preset]) => (
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Theme preview */}
              <div style={{ 
                width: '100%', 
                height: '24px', 
                background: preset.backgroundColor,
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                marginBottom: '4px',
              }}>
                {/* Mini tile preview */}
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '12px',
                  height: '8px',
                  backgroundColor: preset.cardBackground,
                  borderRadius: '2px',
                  border: `1px solid ${preset.primaryColor}`,
                  opacity: 0.8,
                }} />
                {/* Effects indicator */}
                {(preset as any).particleEffects && (
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    width: '4px',
                    height: '4px',
                    backgroundColor: preset.accentColor,
                    borderRadius: '50%',
                    animation: 'pulse 1s infinite',
                  }} />
                )}
              </div>
              <span style={{ 
                fontSize: '11px', 
                textAlign: 'center', 
                textTransform: 'capitalize',
                fontWeight: config.theme.preset === key ? 'bold' : 'normal',
              }}>
                {key === 'cyberpunk' ? '🚀 Cyber' : 
                 key === 'matrix' ? '💚 Matrix' :
                 key === 'sunset' ? '🌅 Sunset' : 
                 key === 'ocean' ? '🌊 Ocean' : key}
              </span>
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

      {/* Background Type Selection */}
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>🌈 Background Style</h3>
        
        <div className="form-fields">
          <div className="field">
            <label style={{ color: config.theme.textColor }}>Background Type</label>
            <select
              value={config.theme.backgroundType || 'color'}
              onChange={(e) => updateTheme({ backgroundType: e.target.value as any })}
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
              <option value="color">🎨 Solid Color</option>
              <option value="pattern">🔷 Pattern</option>
            </select>
          </div>

          {config.theme.backgroundType === 'pattern' && (
            <>
              <div className="field">
                <label style={{ color: config.theme.textColor }}>Pattern Style</label>
                <select
                  value={config.theme.pattern || 'dots'}
                  onChange={(e) => updateTheme({ pattern: e.target.value as any })}
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
                  <option value="dots">• Dots</option>
                  <option value="grid">⚏ Grid</option>
                  <option value="waves">〜 Waves</option>
                  <option value="circuit">⚡ Circuit</option>
                  <option value="hexagon">⬡ Hexagon</option>
                </select>
              </div>
              
              <div className="field">
                <label style={{ color: config.theme.textColor }}>
                  Pattern Opacity: {config.theme.patternOpacity || 20}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={config.theme.patternOpacity || 20}
                  onChange={(e) => updateTheme({ patternOpacity: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    accentColor: config.theme.primaryColor,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Visual Effects */}
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>✨ Visual Effects</h3>
        
        <div className="form-fields">
          <div className="field checkbox-field">
            <input
              type="checkbox"
              checked={config.theme.particleEffects || false}
              onChange={(e) => updateTheme({ particleEffects: e.target.checked })}
              id="particleEffects"
            />
            <label htmlFor="particleEffects" style={{ color: config.theme.textColor }}>
              ✨ Floating Particles
            </label>
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Animation Style</label>
            <select
              value={config.theme.animation || 'none'}
              onChange={(e) => updateTheme({ animation: e.target.value as any })}
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
              <option value="none">⏸️ None</option>
              <option value="fade">🌅 Fade In</option>
              <option value="slide">📱 Slide In</option>
              <option value="scale">🔍 Scale In</option>
              <option value="glow">💫 Glow Effect</option>
              <option value="pulse">💓 Pulse</option>
              <option value="floating">🎈 Float</option>
            </select>
          </div>
        </div>
      </div>

      {/* Effect Customization */}
      {(config.theme.animation === 'glow' || config.theme.animation === 'pulse' || config.theme.animation === 'floating' || config.theme.particleEffects) && (
        <div className="editor-section">
          <h3 style={{ color: config.theme.textColor }}>🎨 Effect Customization</h3>
          
          <div className="form-fields">
            {config.theme.animation === 'glow' && (
              <>
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>Glow Color</label>
                  <input
                    type="color"
                    value={config.theme.glowColor || config.theme.accentColor}
                    onChange={(e) => updateTheme({ glowColor: e.target.value })}
                    style={{ width: '100%', marginTop: '4px', height: '40px' }}
                  />
                </div>
                
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Glow Intensity: {config.theme.glowIntensity || 50}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={config.theme.glowIntensity || 50}
                    onChange={(e) => updateTheme({ glowIntensity: parseInt(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
                
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Glow Speed: {config.theme.glowSpeed || 2}s
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={config.theme.glowSpeed || 2}
                    onChange={(e) => updateTheme({ glowSpeed: parseFloat(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
              </>
            )}
            
            {config.theme.animation === 'pulse' && (
              <>
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>Pulse Color</label>
                  <input
                    type="color"
                    value={config.theme.pulseColor || config.theme.primaryColor}
                    onChange={(e) => updateTheme({ pulseColor: e.target.value })}
                    style={{ width: '100%', marginTop: '4px', height: '40px' }}
                  />
                </div>
                
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Pulse Speed: {config.theme.pulseSpeed || 2}s
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={config.theme.pulseSpeed || 2}
                    onChange={(e) => updateTheme({ pulseSpeed: parseFloat(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
              </>
            )}
            
            {config.theme.animation === 'floating' && (
              <>
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Float Distance: {config.theme.floatDistance || 10}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={config.theme.floatDistance || 10}
                    onChange={(e) => updateTheme({ floatDistance: parseInt(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
                
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Float Speed: {config.theme.floatSpeed || 4}s
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={config.theme.floatSpeed || 4}
                    onChange={(e) => updateTheme({ floatSpeed: parseFloat(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
              </>
            )}
            
            {config.theme.particleEffects && (
              <>
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>Particle Color</label>
                  <input
                    type="color"
                    value={config.theme.particleColor || config.theme.accentColor}
                    onChange={(e) => updateTheme({ particleColor: e.target.value })}
                    style={{ width: '100%', marginTop: '4px', height: '40px' }}
                  />
                </div>
                
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Particle Count: {config.theme.particleCount || 50}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={config.theme.particleCount || 50}
                    onChange={(e) => updateTheme({ particleCount: parseInt(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
                
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Particle Speed: {config.theme.particleSpeed || 1}x
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={config.theme.particleSpeed || 1}
                    onChange={(e) => updateTheme({ particleSpeed: parseFloat(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
                
                <div className="field">
                  <label style={{ color: config.theme.textColor }}>
                    Particle Size: {config.theme.particleSize || 4}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={config.theme.particleSize || 4}
                    onChange={(e) => updateTheme({ particleSize: parseInt(e.target.value) })}
                    style={{ width: '100%', marginTop: '4px', accentColor: config.theme.primaryColor }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

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
