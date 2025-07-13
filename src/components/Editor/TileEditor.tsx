import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboard';
import type { DashboardTile } from '../../types/dashboard';

export const TileEditor: React.FC = () => {
  const { 
    config, 
    editorState, 
    addTile, 
    updateTile, 
    removeTile, 
    selectTile 
  } = useDashboardStore();
  
  const [editingTile, setEditingTile] = useState<DashboardTile | null>(null);
  const [iconTab, setIconTab] = useState<'lucide' | 'url' | 'svg' | 'upload'>('lucide');

  const handleAddTile = () => {
    const newTile: DashboardTile = {
      id: Date.now().toString(),
      title: 'New Service',
      description: 'Description',
      url: 'http://localhost:3000',
      icon: 'globe',
      iconType: 'lucide',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      status: 'checking',
      showStatusIndicator: true,
    };
    addTile(newTile);
    setEditingTile(newTile);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingTile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditingTile({
          ...editingTile,
          iconType: 'upload',
          iconUrl: result,
          icon: undefined
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditTile = (tile: DashboardTile) => {
    setEditingTile({ ...tile });
    setIconTab(tile.iconType || 'lucide');
    selectTile(tile.id);
  };

  const handleSaveTile = () => {
    if (editingTile) {
      updateTile(editingTile.id, editingTile);
      setEditingTile(null);
      selectTile(undefined);
    }
  };

  const handleCancelEdit = () => {
    setEditingTile(null);
    selectTile(undefined);
  };

  const handleDeleteTile = (id: string) => {
    if (confirm('Are you sure you want to delete this tile?')) {
      removeTile(id);
      if (editingTile?.id === id) {
        setEditingTile(null);
      }
    }
  };

  return (
    <div className="tile-editor">
      <div className="editor-section">
        <div className="section-header">
          <h3 style={{ color: config.theme.textColor }}>Service Tiles</h3>
          <button
            onClick={handleAddTile}
            className="add-button"
            style={{
              backgroundColor: config.theme.primaryColor,
              color: 'white',
              borderRadius: config.theme.borderRadius,
            }}
          >
            <Plus size={16} />
            Add Tile
          </button>
        </div>

        <div className="tiles-list">
          {config.tiles.map((tile) => (
            <div
              key={tile.id}
              className={`tile-item ${editorState.selectedTile === tile.id ? 'selected' : ''}`}
              style={{
                backgroundColor: editorState.selectedTile === tile.id 
                  ? `${config.theme.primaryColor}10`
                  : config.theme.cardBackground,
                border: `1px solid ${config.theme.primaryColor}20`,
                borderRadius: config.theme.borderRadius,
              }}
            >
              <div className="tile-info">
                <h4 style={{ color: config.theme.textColor }}>{tile.title}</h4>
                <p style={{ color: config.theme.textColor, opacity: 0.7 }}>
                  {tile.description}
                </p>
                <small style={{ color: config.theme.textColor, opacity: 0.5 }}>
                  {tile.url}
                </small>
              </div>
              <div className="tile-actions">
                <button
                  onClick={() => handleEditTile(tile)}
                  className="action-button"
                  style={{ color: config.theme.primaryColor }}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTile(tile.id)}
                  className="action-button"
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingTile && (
        <div className="tile-form">
          <div className="form-header">
            <h3 style={{ color: config.theme.textColor }}>Edit Tile</h3>
            <div className="form-actions">
              <button
                onClick={handleSaveTile}
                className="save-button"
                style={{
                  backgroundColor: config.theme.accentColor,
                  color: 'white',
                  borderRadius: config.theme.borderRadius,
                }}
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="cancel-button"
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: config.theme.borderRadius,
                }}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>

          <div className="form-fields">
            <div className="field">
              <label style={{ color: config.theme.textColor }}>Title</label>
              <input
                type="text"
                value={editingTile.title}
                onChange={(e) => setEditingTile({ ...editingTile, title: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Description</label>
              <input
                type="text"
                value={editingTile.description || ''}
                onChange={(e) => setEditingTile({ ...editingTile, description: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>URL</label>
              <input
                type="url"
                value={editingTile.url}
                onChange={(e) => setEditingTile({ ...editingTile, url: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Fallback URL</label>
              <input
                type="url"
                value={editingTile.fallbackUrl || ''}
                onChange={(e) => setEditingTile({ ...editingTile, fallbackUrl: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                }}
              />
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Alive Check URL</label>
              <input
                type="url"
                value={editingTile.aliveCheckUrl || ''}
                onChange={(e) => setEditingTile({ ...editingTile, aliveCheckUrl: e.target.value })}
                placeholder="URL to ping for health check (optional)"
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                }}
              />
              <small style={{ color: config.theme.textColor, opacity: 0.7, display: 'block', marginTop: '4px' }}>
                If empty, will use main URL for health checks
              </small>
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Icon</label>
              
              {/* Icon type tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {[
                  { id: 'lucide', label: 'Icons' },
                  { id: 'url', label: 'URL' },
                  { id: 'svg', label: 'SVG' },
                  { id: 'upload', label: 'Upload' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setIconTab(tab.id as typeof iconTab);
                      setEditingTile({
                        ...editingTile,
                        iconType: tab.id as typeof iconTab,
                        icon: tab.id === 'lucide' ? (editingTile.icon || 'globe') : undefined,
                        iconUrl: tab.id === 'url' ? editingTile.iconUrl : undefined,
                        iconSvg: tab.id === 'svg' ? editingTile.iconSvg : undefined,
                      });
                    }}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      backgroundColor: iconTab === tab.id ? config.theme.primaryColor : 'transparent',
                      color: iconTab === tab.id ? 'white' : config.theme.textColor,
                      border: `1px solid ${config.theme.primaryColor}`,
                      borderRadius: config.theme.borderRadius,
                      cursor: 'pointer',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Icon content based on selected tab */}
              {iconTab === 'lucide' && (
                <select
                  value={editingTile.icon || ''}
                  onChange={(e) => setEditingTile({ ...editingTile, icon: e.target.value })}
                  style={{
                    backgroundColor: config.theme.cardBackground,
                    color: config.theme.textColor,
                    border: `1px solid ${config.theme.primaryColor}30`,
                    borderRadius: config.theme.borderRadius,
                    width: '100%',
                    padding: '8px 12px',
                  }}
                >
                  <option value="">No icon</option>
                  <option value="server">Server</option>
                  <option value="home">Home</option>
                  <option value="play">Play</option>
                  <option value="monitor">Monitor</option>
                  <option value="shield">Shield</option>
                  <option value="database">Database</option>
                  <option value="cloud">Cloud</option>
                  <option value="wifi">Wifi</option>
                  <option value="settings">Settings</option>
                  <option value="hard-drive">Hard Drive</option>
                  <option value="globe">Globe</option>
                  <option value="folder">Folder</option>
                  <option value="file">File</option>
                  <option value="download">Download</option>
                  <option value="upload">Upload</option>
                  <option value="camera">Camera</option>
                  <option value="music">Music</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                  <option value="book">Book</option>
                  <option value="mail">Mail</option>
                  <option value="phone">Phone</option>
                  <option value="calendar">Calendar</option>
                  <option value="clock">Clock</option>
                  <option value="search">Search</option>
                </select>
              )}

              {iconTab === 'url' && (
                <div>
                  <input
                    type="url"
                    placeholder="https://example.com/icon.png"
                    value={editingTile.iconUrl || ''}
                    onChange={(e) => setEditingTile({ ...editingTile, iconUrl: e.target.value })}
                    style={{
                      backgroundColor: config.theme.cardBackground,
                      color: config.theme.textColor,
                      border: `1px solid ${config.theme.primaryColor}30`,
                      borderRadius: config.theme.borderRadius,
                      width: '100%',
                      padding: '8px 12px',
                    }}
                  />
                  <small style={{ color: config.theme.textColor, opacity: 0.7, display: 'block', marginTop: '4px' }}>
                    Enter a URL to an image file (PNG, JPG, SVG, etc.)
                  </small>
                </div>
              )}

              {iconTab === 'svg' && (
                <div>
                  <textarea
                    placeholder="<svg>...</svg>"
                    value={editingTile.iconSvg || ''}
                    onChange={(e) => setEditingTile({ ...editingTile, iconSvg: e.target.value })}
                    rows={4}
                    style={{
                      backgroundColor: config.theme.cardBackground,
                      color: config.theme.textColor,
                      border: `1px solid ${config.theme.primaryColor}30`,
                      borderRadius: config.theme.borderRadius,
                      width: '100%',
                      padding: '8px 12px',
                      resize: 'vertical',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  />
                  <small style={{ color: config.theme.textColor, opacity: 0.7, display: 'block', marginTop: '4px' }}>
                    Paste SVG code directly
                  </small>
                </div>
              )}

              {iconTab === 'upload' && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      backgroundColor: config.theme.cardBackground,
                      color: config.theme.textColor,
                      border: `1px solid ${config.theme.primaryColor}30`,
                      borderRadius: config.theme.borderRadius,
                      width: '100%',
                      padding: '8px 12px',
                    }}
                  />
                  <small style={{ color: config.theme.textColor, opacity: 0.7, display: 'block', marginTop: '4px' }}>
                    Upload an image file from your computer
                  </small>
                  {editingTile.iconUrl && editingTile.iconType === 'upload' && (
                    <div style={{ marginTop: '8px' }}>
                      <img 
                        src={editingTile.iconUrl} 
                        alt="Preview" 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          objectFit: 'contain',
                          border: `1px solid ${config.theme.primaryColor}30`,
                          borderRadius: '4px'
                        }} 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>
                <input
                  type="checkbox"
                  checked={editingTile.openInNewTab ?? true}
                  onChange={(e) => setEditingTile({ ...editingTile, openInNewTab: e.target.checked })}
                />
                Open in New Tab
              </label>
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>
                <input
                  type="checkbox"
                  checked={editingTile.showStatusIndicator ?? true}
                  onChange={(e) => setEditingTile({ ...editingTile, showStatusIndicator: e.target.checked })}
                />
                Show Status Indicator
              </label>
              <small style={{ color: config.theme.textColor, opacity: 0.7, display: 'block', marginTop: '4px' }}>
                Enable health check monitoring for this service
              </small>
            </div>

            <div className="field">
              <label style={{ color: config.theme.textColor }}>Category</label>
              <select
                value={editingTile.category || ''}
                onChange={(e) => setEditingTile({ ...editingTile, category: e.target.value })}
                style={{
                  backgroundColor: config.theme.cardBackground,
                  color: config.theme.textColor,
                  border: `1px solid ${config.theme.primaryColor}30`,
                  borderRadius: config.theme.borderRadius,
                }}
              >
                <option value="">No category</option>
                {config.categories?.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
