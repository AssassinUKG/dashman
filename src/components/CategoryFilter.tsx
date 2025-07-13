import React from 'react';
import type { Category, ThemeConfig } from '../types/dashboard';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  theme: ThemeConfig;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  theme,
}) => {
  return (
    <div className="category-filter">
      <button
        onClick={() => onCategoryChange('')}
        className={`category-button ${selectedCategory === '' ? 'active' : ''}`}
        style={{
          backgroundColor: selectedCategory === '' ? theme.primaryColor : theme.cardBackground,
          color: selectedCategory === '' ? 'white' : theme.textColor,
          borderRadius: theme.borderRadius,
          fontFamily: theme.fontFamily,
        }}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.name)}
          className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
          style={{
            backgroundColor: selectedCategory === category.name 
              ? (category.color || theme.primaryColor)
              : theme.cardBackground,
            color: selectedCategory === category.name ? 'white' : theme.textColor,
            borderRadius: theme.borderRadius,
            border: `1px solid ${category.color || theme.primaryColor}30`,
            fontFamily: theme.fontFamily,
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
