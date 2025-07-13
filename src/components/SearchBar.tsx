import React from 'react';
import { Search, X } from 'lucide-react';
import type { ThemeConfig } from '../types/dashboard';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  theme: ThemeConfig;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  theme,
}) => {
  return (
    <div className="search-bar">
      <div 
        className="search-input-wrapper"
        style={{
          backgroundColor: theme.cardBackground,
          borderRadius: theme.borderRadius,
          border: `1px solid ${theme.primaryColor}20`,
        }}
      >
        <Search size={20} color={theme.textColor} />
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          style={{
            color: theme.textColor,
            backgroundColor: 'transparent',
            fontFamily: theme.fontFamily,
          }}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="clear-search"
            style={{ color: theme.textColor }}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
