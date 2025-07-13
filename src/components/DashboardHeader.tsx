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
  // Get dynamic header classes based on theme
  const getHeaderClasses = () => {
    const classes = ['dashboard-header'];
    
    if (theme.headerStyle && theme.headerStyle !== 'default') {
      classes.push(`header-${theme.headerStyle}`);
    } else {
      classes.push('header-default');
    }
    
    return classes.join(' ');
  };

  return (
    <header className={getHeaderClasses()}>
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
