import React from 'react';
import { useDashboardStore } from '../../store/dashboard';

export const LayoutEditor: React.FC = () => {
  const { config, updateConfig } = useDashboardStore();

  return (
    <div className="layout-editor">
      <h3 style={{ color: config.theme.textColor }}>Layout Settings</h3>
      
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
          }}
        />
      </div>
    </div>
  );
};
