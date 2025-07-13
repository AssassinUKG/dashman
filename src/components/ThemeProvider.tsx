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
    
    // Apply CSS custom properties for dynamic theming
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--card-background', theme.cardBackground);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--border-radius', String(theme.borderRadius || '8px'));
    root.style.setProperty('--font-family', theme.fontFamily || 'Inter, system-ui, sans-serif');
    
    // Advanced background styling
    if (theme.backgroundType === 'pattern') {
      // Set background color
      document.body.style.background = theme.backgroundColor;
      document.body.style.backgroundAttachment = 'fixed';
      // Add pattern class for overlay
      document.body.classList.remove('pattern-dots', 'pattern-grid', 'pattern-waves', 'pattern-circuit', 'pattern-hexagon', 'pattern-diagonal', 'pattern-triangles');
      if (theme.pattern && theme.pattern !== 'none') {
        document.body.classList.add(`pattern-${theme.pattern}`);
      }
      root.style.setProperty('--pattern-opacity', `${(theme.patternOpacity || 20) / 100}`);
      root.style.setProperty('--pattern-size', `${theme.patternSize || 20}px`);
      // Use accent color for better visibility, fallback to text color
      root.style.setProperty('--pattern-color', theme.accentColor || theme.textColor);
    } else {
      // Basic background color
      document.body.style.background = theme.backgroundColor;
      document.body.style.backgroundAttachment = 'initial';
      document.body.classList.remove('pattern-dots', 'pattern-grid', 'pattern-waves', 'pattern-circuit', 'pattern-hexagon', 'pattern-diagonal', 'pattern-triangles');
    }
    
    document.body.style.color = theme.textColor;
    document.body.style.fontFamily = theme.fontFamily || 'Inter, system-ui, sans-serif';
    
    // Apply theme classes - preserve existing classes instead of replacing them
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    document.body.classList.add(`theme-${theme.mode || 'dark'}`);
    
    // Add background type class
    document.body.classList.remove('background-color', 'background-gradient', 'background-image', 'background-pattern');
    if (theme.backgroundType) {
      document.body.classList.add(`background-${theme.backgroundType}`);
    }
    
    // Add animation class if set
    document.body.classList.remove('animate-none', 'animate-subtle', 'animate-floating', 'animate-pulse', 'animate-glow', 'animate-fade', 'animate-slide', 'animate-scale', 'animate-bounce');
    if (theme.animation && theme.animation !== 'none') {
      document.body.classList.add(`animate-${theme.animation}`);
    }
    
    // Set custom effect properties with proper defaults/resets
    root.style.setProperty('--glow-color', theme.glowColor || theme.accentColor);
    root.style.setProperty('--glow-intensity', `${theme.glowIntensity || 50}`);
    root.style.setProperty('--glow-speed', `${theme.glowSpeed || 2}s`);
    root.style.setProperty('--pulse-color', theme.pulseColor || theme.primaryColor);
    root.style.setProperty('--pulse-speed', `${theme.pulseSpeed || 2}s`);
    root.style.setProperty('--float-distance', `${theme.floatDistance || 10}px`);
    root.style.setProperty('--float-speed', `${theme.floatSpeed || 4}s`);
    root.style.setProperty('--particle-color', theme.particleColor || theme.accentColor);
    root.style.setProperty('--particle-size', `${theme.particleSize || 4}px`);
    
    // Handle particles - only create if explicitly enabled
    if (theme.particleEffects === true) {
      createParticles();
    } else {
      removeParticles();
    }
    
  }, [theme]);

  const createParticles = () => {
    // Remove existing particles
    removeParticles();
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.id = 'particles-container';
    
    // Get particle count from theme or default to 50
    const particleCount = theme.particleCount || 50;
    const baseSpeed = theme.particleSpeed || 1;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) / baseSpeed + 's';
      particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
  };

  const removeParticles = () => {
    const existing = document.getElementById('particles-container');
    if (existing) {
      existing.remove();
    }
  };

  return <>{children}</>;
};
