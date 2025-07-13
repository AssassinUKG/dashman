import React, { useState } from 'react';
import { Download, Upload, RotateCcw, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboard';
import type { Category } from '../../types/dashboard';

export const ConfigEditor: React.FC = () => {
  const { config, exportConfig, importConfig, resetConfig, updateConfig } = useDashboardStore();
  const [configText, setConfigText] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleExport = () => {
    const exported = exportConfig();
    setConfigText(exported);
    
    // Download as file
    const blob = new Blob([exported], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (configText.trim()) {
      try {
        importConfig(configText);
        setConfigText('');
        alert('Configuration imported successfully!');
      } catch (error) {
        alert('Invalid configuration format');
      }
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default configuration?')) {
      resetConfig();
    }
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: 'New Category',
      color: '#3b82f6',
      icon: 'folder',
    };
    const updatedCategories = [...(config.categories || []), newCategory];
    updateConfig({ categories: updatedCategories });
    setEditingCategory(newCategory);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory({ ...category });
  };

  const handleSaveCategory = () => {
    if (editingCategory && config.categories) {
      const updatedCategories = config.categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      );
      updateConfig({ categories: updatedCategories });
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = config.categories?.filter(cat => cat.id !== id) || [];
      updateConfig({ categories: updatedCategories });
      if (editingCategory?.id === id) {
        setEditingCategory(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <div className="config-editor">
      <div className="editor-section">
        <h3 style={{ color: config.theme.textColor }}>Configuration Management</h3>
        
        <div className="form-fields">
          <div className="config-actions">
            <button
              onClick={handleExport}
              className="config-button"
              style={{
                backgroundColor: config.theme.primaryColor,
                color: 'white',
                borderRadius: config.theme.borderRadius,
              }}
            >
              <Download size={16} />
              Export Config
            </button>
            
            <button
              onClick={handleReset}
              className="config-button"
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: config.theme.borderRadius,
              }}
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>Import Configuration</label>
            <textarea
              value={configText}
              onChange={(e) => setConfigText(e.target.value)}
              placeholder="Paste configuration JSON here..."
              rows={8}
              style={{
                backgroundColor: config.theme.cardBackground,
                color: config.theme.textColor,
                border: `1px solid ${config.theme.primaryColor}30`,
                borderRadius: config.theme.borderRadius,
                padding: '8px 12px',
                width: '100%',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                resize: 'vertical',
              }}
            />
            {configText.trim() && (
              <button
                onClick={handleImport}
                className="config-button"
                style={{
                  backgroundColor: config.theme.accentColor,
                  color: 'white',
                  borderRadius: config.theme.borderRadius,
                  marginTop: '8px',
                }}
              >
                <Upload size={16} />
                Import
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Health Check Settings Section */}
      <div className="editor-section">
        <div className="section-header">
          <h3 style={{ color: config.theme.textColor }}>Health Check Settings</h3>
        </div>
        
        <div className="form-fields">
          <div className="checkbox-field">
            <input
              type="checkbox"
              id="healthCheckEnabled"
              checked={config.healthCheck?.enabled ?? true}
              onChange={(e) => updateConfig({
                healthCheck: {
                  ...config.healthCheck,
                  enabled: e.target.checked,
                  interval: config.healthCheck?.interval ?? 30,
                  timeout: config.healthCheck?.timeout ?? 5,
                }
              })}
              style={{
                accentColor: config.theme.primaryColor,
              }}
            />
            <label 
              htmlFor="healthCheckEnabled" 
              style={{ color: config.theme.textColor }}
            >
              Enable health checking
            </label>
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>
              Check Interval (seconds)
            </label>
            <input
              type="number"
              min="5"
              max="300"
              value={config.healthCheck?.interval ?? 30}
              onChange={(e) => updateConfig({
                healthCheck: {
                  ...config.healthCheck,
                  enabled: config.healthCheck?.enabled ?? true,
                  interval: parseInt(e.target.value) || 30,
                  timeout: config.healthCheck?.timeout ?? 5,
                }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                borderColor: config.theme.mode === 'dark' ? '#374151' : '#e2e8f0',
                color: config.theme.textColor,
                borderRadius: config.theme.borderRadius,
              }}
            />
            <small style={{ color: config.theme.textColor, opacity: 0.7 }}>
              How often to check service health (5-300 seconds)
            </small>
          </div>

          <div className="field">
            <label style={{ color: config.theme.textColor }}>
              Request Timeout (seconds)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={config.healthCheck?.timeout ?? 5}
              onChange={(e) => updateConfig({
                healthCheck: {
                  ...config.healthCheck,
                  enabled: config.healthCheck?.enabled ?? true,
                  interval: config.healthCheck?.interval ?? 30,
                  timeout: parseInt(e.target.value) || 5,
                }
              })}
              style={{
                backgroundColor: config.theme.cardBackground,
                borderColor: config.theme.mode === 'dark' ? '#374151' : '#e2e8f0',
                color: config.theme.textColor,
                borderRadius: config.theme.borderRadius,
              }}
            />
            <small style={{ color: config.theme.textColor, opacity: 0.7 }}>
              How long to wait for a response (1-30 seconds)
            </small>
          </div>
        </div>
      </div>
      
      {/* Category Management Section */}
      <div className="editor-section">
        <div className="section-header">
          <h3 style={{ color: config.theme.textColor }}>Categories</h3>
          <button
            onClick={handleAddCategory}
            className="add-button"
            style={{
              backgroundColor: config.theme.primaryColor,
              color: 'white',
              borderRadius: config.theme.borderRadius,
            }}
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>

        <div className="categories-list">
          {config.categories?.map((category) => (
            <div
              key={category.id}
              className="category-item"
              style={{
                backgroundColor: config.theme.cardBackground,
                border: `1px solid ${config.theme.primaryColor}20`,
                borderRadius: config.theme.borderRadius,
              }}
            >
              <div className="category-info">
                <div 
                  className="category-color-preview"
                  style={{ 
                    backgroundColor: category.color,
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                  }}
                />
                <div>
                  <h5 style={{ color: config.theme.textColor, margin: 0 }}>
                    {category.name}
                  </h5>
                  <small style={{ color: config.theme.textColor, opacity: 0.7 }}>
                    {category.color}
                  </small>
                </div>
              </div>
              <div className="category-actions">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="action-button"
                  style={{ color: config.theme.primaryColor }}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="action-button"
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingCategory && (
          <div className="category-form">
            <div className="form-header">
              <h4 style={{ color: config.theme.textColor }}>Edit Category</h4>
              <div className="form-actions">
                <button
                  onClick={handleSaveCategory}
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
                    color: config.theme.textColor,
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
                <label style={{ color: config.theme.textColor }}>Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  style={{
                    backgroundColor: config.theme.cardBackground,
                    color: config.theme.textColor,
                    border: `1px solid ${config.theme.primaryColor}30`,
                    borderRadius: config.theme.borderRadius,
                  }}
                />
              </div>

              <div className="field">
                <label style={{ color: config.theme.textColor }}>Color</label>
                <input
                  type="color"
                  value={editingCategory.color || '#3b82f6'}
                  onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: 'none',
                    borderRadius: config.theme.borderRadius,
                    cursor: 'pointer',
                  }}
                />
              </div>

              <div className="field">
                <label style={{ color: config.theme.textColor }}>Icon</label>
                <input
                  type="text"
                  value={editingCategory.icon || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                  placeholder="e.g., folder, tag, star"
                  style={{
                    backgroundColor: config.theme.cardBackground,
                    color: config.theme.textColor,
                    border: `1px solid ${config.theme.primaryColor}30`,
                    borderRadius: config.theme.borderRadius,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
