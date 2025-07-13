import React from 'react';
import type { ThemeConfig } from '../types/dashboard';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  theme: ThemeConfig;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  theme,
}) => {
  return (
    <header className="dashboard-header">
      <h1 
        className="dashboard-title"
        style={{ 
          color: theme.textColor,
          fontFamily: theme.fontFamily,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p 
          className="dashboard-subtitle"
          style={{ 
            color: theme.textColor,
            opacity: 0.7,
            fontFamily: theme.fontFamily,
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
};
