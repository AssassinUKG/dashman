import React, { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboard';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { config } = useDashboardStore();
  const theme = config.theme;

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply basic CSS custom properties for dynamic theming
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--card-background', theme.cardBackground);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--border-radius', String(theme.borderRadius || '8px'));
    root.style.setProperty('--font-family', theme.fontFamily || 'Inter, system-ui, sans-serif');
    
    // Apply basic background color
    document.body.style.background = theme.backgroundColor;
    document.body.style.color = theme.textColor;
    document.body.style.fontFamily = theme.fontFamily || 'Inter, system-ui, sans-serif';
    
    // Apply theme mode class
    document.body.className = `theme-${theme.mode || 'dark'}`;
    
  }, [theme]);

  return <>{children}</>;
};
