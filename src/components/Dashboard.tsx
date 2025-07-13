import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useDashboardStore } from '../store/dashboard';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { DashboardTile } from './DashboardTile';
import { DashboardHeader } from './DashboardHeader';
import { Editor } from './Editor/Editor';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { Edit3 } from 'lucide-react';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const {
    config,
    editorState,
    reorderTiles,
    toggleEditor,
  } = useDashboardStore();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  // Health check for tiles that have status indicators enabled
  const tilesWithStatus = React.useMemo(() => 
    config.tiles.filter(tile => tile.showStatusIndicator), 
    [config.tiles]
  );
  const { healthStatus } = useHealthCheck(tilesWithStatus, true);

  const filteredTiles = React.useMemo(() => {
    return config.tiles.filter((tile) => {
      const matchesSearch = tile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tile.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || tile.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [config.tiles, searchTerm, selectedCategory]);

  // Keyboard shortcut for Ctrl+E
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        toggleEditor();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleEditor]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = config.tiles.findIndex((tile) => tile.id === active.id);
      const newIndex = config.tiles.findIndex((tile) => tile.id === over?.id);
      
      const newTiles = [...config.tiles];
      const [movedTile] = newTiles.splice(oldIndex, 1);
      newTiles.splice(newIndex, 0, movedTile);
      
      reorderTiles(newTiles);
    }
  };

  return (
    <div 
      className="dashboard"
      style={{
        backgroundColor: config.theme.backgroundColor,
        color: config.theme.textColor,
        padding: config.layout.padding,
        fontFamily: config.theme.fontFamily,
      }}
    >
      {/* Fixed header with controls */}
      {config.layout.showEditButton && (
        <div className="dashboard-controls">
          <button
            onClick={toggleEditor}
            className={`control-btn ${editorState.isOpen ? 'active' : ''}`}
            title="Toggle Editor (Ctrl+E)"
          >
            <Edit3 size={18} />
            <span>Edit</span>
          </button>
        </div>
      )}

      {config.layout.showTitle && (
        <DashboardHeader 
          title={config.title}
          subtitle={config.subtitle}
          theme={config.theme}
        />
      )}

      {config.layout.showSearch && (
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          theme={config.theme}
        />
      )}

      {config.layout.showCategories && config.categories && (
        <CategoryFilter 
          categories={config.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          theme={config.theme}
        />
      )}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTiles.map(tile => tile.id)}
          strategy={rectSortingStrategy}
        >
          <div 
            className="tiles-grid"
            style={{
              gridTemplateColumns: `repeat(${config.layout.columns}, 1fr)`,
              gap: config.layout.gap,
            }}
          >
            {filteredTiles.map((tile) => (
              <DashboardTile
                key={tile.id}
                tile={tile}
                theme={config.theme}
                healthStatus={healthStatus[tile.id]}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {editorState.isOpen && <Editor />}
    </div>
  );
};
