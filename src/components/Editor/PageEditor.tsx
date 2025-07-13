import React from 'react';
import { useDashboardStore } from '../../store/dashboard';

export const PageEditor: React.FC = () => {
  const { config, updateConfig } = useDashboardStore();

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateConfig({ 
          favicon: result,
          faviconType: 'upload'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-editor">
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Page Settings</h3>
        
        <div className="form-fields">
          <div className="field">
            <label style={{ color: config.theme.textColor }}>Dashboard Title</label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => updateConfig({ title: e.target.value })}
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
            <label style={{ color: config.theme.textColor }}>Subtitle (optional)</label>
            <input
              type="text"
              value={config.subtitle || ''}
              onChange={(e) => updateConfig({ subtitle: e.target.value || undefined })}
              placeholder="Your personal service hub"
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
            <label style={{ color: config.theme.textColor }}>Favicon</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <button
                onClick={() => updateConfig({ faviconType: 'emoji' })}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: config.theme.borderRadius,
                  backgroundColor: config.faviconType === 'emoji' ? config.theme.primaryColor : config.theme.cardBackground,
                  color: config.faviconType === 'emoji' ? 'white' : config.theme.textColor,
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Emoji
              </button>
              <button
                onClick={() => updateConfig({ faviconType: 'url' })}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: config.theme.borderRadius,
                  backgroundColor: config.faviconType === 'url' ? config.theme.primaryColor : config.theme.cardBackground,
                  color: config.faviconType === 'url' ? 'white' : config.theme.textColor,
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                URL
              </button>
              <button
                onClick={() => updateConfig({ faviconType: 'upload' })}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: config.theme.borderRadius,
                  backgroundColor: config.faviconType === 'upload' ? config.theme.primaryColor : config.theme.cardBackground,
                  color: config.faviconType === 'upload' ? 'white' : config.theme.textColor,
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Upload
              </button>
            </div>
            
            {config.faviconType === 'emoji' && (
              <input
                type="text"
                value={config.favicon || ''}
                onChange={(e) => updateConfig({ favicon: e.target.value })}
                placeholder="🏠"
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  padding: '8px 12px',
                  width: '100%',
                  fontSize: '18px',
                  textAlign: 'center'
                }}
              />
            )}
            
            {config.faviconType === 'url' && (
              <input
                type="url"
                value={config.favicon || ''}
                onChange={(e) => updateConfig({ favicon: e.target.value })}
                placeholder="https://example.com/favicon.ico"
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  padding: '8px 12px',
                  width: '100%',
                }}
              />
            )}
            
            {config.faviconType === 'upload' && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFaviconUpload}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                  padding: '8px 12px',
                  width: '100%',
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Typography</h3>
        
        <div className="form-fields">
          <div className="field">
            <label style={{ color: config.theme.textColor }}>Font Family</label>
            <select
              value={config.theme.fontFamily}
              onChange={(e) => updateConfig({ 
                theme: { ...config.theme, fontFamily: e.target.value }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 12px',
                width: '100%',
                fontFamily: config.theme.fontFamily,
              }}
            >
              <option value="Inter, system-ui, sans-serif" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Inter (Default)
              </option>
              <option value="system-ui, -apple-system, sans-serif" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                System Default
              </option>
              <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                Segoe UI
              </option>
              <option value="'Helvetica Neue', Helvetica, Arial, sans-serif" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Helvetica
              </option>
              <option value="'SF Pro Display', -apple-system, sans-serif" style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>
                SF Pro (Apple)
              </option>
              <option value="'Roboto', 'Noto Sans', sans-serif" style={{ fontFamily: "'Roboto', 'Noto Sans', sans-serif" }}>
                Roboto (Google)
              </option>
              <option value="'Poppins', sans-serif" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Poppins
              </option>
              <option value="'Montserrat', sans-serif" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Montserrat
              </option>
              <option value="'Open Sans', sans-serif" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Open Sans
              </option>
              <option value="'Source Sans Pro', sans-serif" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                Source Sans Pro
              </option>
              <option value="'Lato', sans-serif" style={{ fontFamily: "'Lato', sans-serif" }}>
                Lato
              </option>
              <option value="'Nunito', sans-serif" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Nunito
              </option>
              <option value="'Work Sans', sans-serif" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                Work Sans
              </option>
              <option value="'Raleway', sans-serif" style={{ fontFamily: "'Raleway', sans-serif" }}>
                Raleway
              </option>
              <option value="'DM Sans', sans-serif" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                DM Sans
              </option>
              <option value="'JetBrains Mono', 'Fira Code', monospace" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                JetBrains Mono
              </option>
              <option value="'Fira Code', 'Monaco', monospace" style={{ fontFamily: "'Fira Code', 'Monaco', monospace" }}>
                Fira Code
              </option>
              <option value="'Source Code Pro', 'Monaco', monospace" style={{ fontFamily: "'Source Code Pro', 'Monaco', monospace" }}>
                Source Code Pro
              </option>
              <option value="'Cascadia Code', 'Consolas', monospace" style={{ fontFamily: "'Cascadia Code', 'Consolas', monospace" }}>
                Cascadia Code
              </option>
              <option value="Georgia, 'Times New Roman', serif" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Georgia (Serif)
              </option>
              <option value="'Playfair Display', serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                Playfair Display
              </option>
              <option value="'Merriweather', serif" style={{ fontFamily: "'Merriweather', serif" }}>
                Merriweather
              </option>
              <option value="'Crimson Text', serif" style={{ fontFamily: "'Crimson Text', serif" }}>
                Crimson Text
              </option>
              <option value="'Libre Baskerville', serif" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Libre Baskerville
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Page Elements</h3>
        
        <div className="form-fields">
          <div className="field checkbox-field">
            <input
              type="checkbox"
              checked={config.layout.showTitle}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, showTitle: e.target.checked }
              })}
              id="showTitle"
            />
            <label htmlFor="showTitle" style={{ color: config.theme.textColor }}>
              Show Dashboard Title
            </label>
          </div>

          <div className="field checkbox-field">
            <input
              type="checkbox"
              checked={config.layout.showSearch}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, showSearch: e.target.checked }
              })}
              id="showSearch"
            />
            <label htmlFor="showSearch" style={{ color: config.theme.textColor }}>
              Show Search Bar
            </label>
          </div>

          <div className="field checkbox-field">
            <input
              type="checkbox"
              checked={config.layout.showCategories}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, showCategories: e.target.checked }
              })}
              id="showCategories"
            />
            <label htmlFor="showCategories" style={{ color: config.theme.textColor }}>
              Show Category Filters
            </label>
          </div>

          <div className="field checkbox-field">
            <input
              type="checkbox"
              checked={config.layout.showEditButton}
              onChange={(e) => updateConfig({ 
                layout: { ...config.layout, showEditButton: e.target.checked }
              })}
              id="showEditButton"
            />
            <label htmlFor="showEditButton" style={{ color: config.theme.textColor }}>
              Show Edit Button
            </label>
            <small style={{ color: config.theme.textColor, opacity: 0.7, display: 'block', marginTop: '4px', marginLeft: '24px' }}>
              Use Ctrl+E to access editor when hidden
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
