import React from 'react';
import { useDashboardStore } from '../../store/dashboard';

export const LayoutEditor: React.FC = () => {
  const { config, updateConfig } = useDashboardStore();

  return (
    <div className="layout-editor">
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Layout Settings</h3>
        
        <div className="form-fields">
          <div className="field">
            <label style={{ color: config.theme.textColor }}>Columns</label>
            <input
              type="number"
              min="1"
              max="12"
              value={config.layout.columns}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, columns: parseInt(e.target.value) }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 12px',
                width: '100%',
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Gap (px)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={config.layout.gap}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, gap: parseInt(e.target.value) }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 12px',
                width: '100%',
              }}
            />
            <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
              {[2, 6, 12, 20].map(gap => (
                <button
                  key={gap}
                  onClick={() => updateConfig({ 
                    layout: { ...config.layout, gap }
                  })}
                  style={{
                    backgroundColor: config.layout.gap === gap ? config.theme.primaryColor : config.theme.cardBackground,
                    color: config.layout.gap === gap ? 'white' : config.theme.textColor,
                    border: `1px solid ${config.theme.primaryColor}50`,
                    borderRadius: config.theme.borderRadius,
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  {gap}px
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Grid Type</label>
            <select
              value={config.layout.gridType || 'fixed'}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, gridType: e.target.value as 'fixed' | 'auto-fit' | 'responsive' }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 12px',
                width: '100%',
              }}
            >
              <option value="fixed">Fixed Columns</option>
              <option value="auto-fit">Auto-fit Screen</option>
              <option value="responsive">Responsive Breakpoints</option>
            </select>
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Tile Aspect Ratio</label>
            <select
              value={config.layout.tileAspectRatio || 1}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, tileAspectRatio: parseFloat(e.target.value) }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 12px',
                width: '100%',
              }}
            >
              <option value={1}>Square (1:1)</option>
              <option value={1.25}>Portrait (4:5)</option>
              <option value={0.75}>Landscape (4:3)</option>
              <option value={0.5}>Wide (2:1)</option>
              <option value={2}>Tall (1:2)</option>
            </select>
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>
              Min Tile Width (px)
            </label>
            <input
              type="number"
              min="150"
              max="500"
              value={config.layout.minTileWidth || 250}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, minTileWidth: parseInt(e.target.value) }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 12px',
                width: '100%',
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Layout Presets</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              <button
                onClick={() => updateConfig({ 
                  layout: { ...config.layout, columns: 4, gap: 16, gridType: 'fixed' }
                })}
                style={{
                  backgroundColor: config.theme.primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: config.theme.borderRadius,
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Spacious (4 cols)
              </button>
              
              <button
                onClick={() => updateConfig({ 
                  layout: { ...config.layout, columns: 6, gap: 6, gridType: 'fixed' }
                })}
                style={{
                  backgroundColor: config.theme.accentColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: config.theme.borderRadius,
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Compact (6 cols)
              </button>
              
              <button
                onClick={() => updateConfig({ 
                  layout: { ...config.layout, columns: 8, gap: 4, gridType: 'fixed' }
                })}
                style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: config.theme.borderRadius,
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Dense (8 cols)
              </button>
              
              <button
                onClick={() => updateConfig({ 
                  layout: { ...config.layout, gridType: 'auto-fit', minTileWidth: 280 }
                })}
                style={{
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: config.theme.borderRadius,
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Auto-fit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
