import React, { useState, useRef, useEffect } from 'react';
import { X, Grid, Palette, Settings, FileText, Move, Layout } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboard';
import { TileEditor } from './TileEditor';
import { PageEditor } from './PageEditor';
import { ThemeEditor } from './ThemeEditor';
import { LayoutEditor } from './LayoutEditor';
import { ConfigEditor } from './ConfigEditor';

export const Editor: React.FC = () => {
  const { editorState, config, toggleEditor, setActiveTab } = useDashboardStore();
  
  // State for draggable and resizable panel
  const [position, setPosition] = useState({ x: window.innerWidth - 520, y: 80 });
  const [size, setSize] = useState({ width: 500, height: 650 }); // Larger default size
  const [isDragging, setIsDragging] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStartRight, setResizeStartRight] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeStartLeft, setResizeStartLeft] = useState({ x: 0, y: 0, width: 0, height: 0, posX: 0 });
  
  const editorRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'tiles' as const, label: 'Tiles', icon: Grid },
    { id: 'page' as const, label: 'Page', icon: Layout },
    { id: 'theme' as const, label: 'Theme', icon: Palette },
    { id: 'layout' as const, label: 'Layout', icon: Settings },
    { id: 'config' as const, label: 'Config', icon: FileText },
  ];

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle resizing from bottom-right
  const handleResizeRightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizingRight(true);
    setResizeStartRight({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  // Handle resizing from bottom-left
  const handleResizeLeftMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizingLeft(true);
    setResizeStartLeft({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Simple drag calculation - no restrictive constraints
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
      }
      
      // Handle right resize (bottom-right corner)
      if (isResizingRight) {
        const deltaX = e.clientX - resizeStartRight.x;
        const deltaY = e.clientY - resizeStartRight.y;
        
        const newWidth = Math.max(300, resizeStartRight.width + deltaX);
        const newHeight = Math.max(400, resizeStartRight.height + deltaY);
        
        setSize({ width: newWidth, height: newHeight });
      }
      
      // Handle left resize (bottom-left corner)
      if (isResizingLeft) {
        const deltaX = e.clientX - resizeStartLeft.x;
        const deltaY = e.clientY - resizeStartLeft.y;
        
        const newWidth = Math.max(300, resizeStartLeft.width - deltaX);
        const newHeight = Math.max(400, resizeStartLeft.height + deltaY);
        
        // Calculate new X position to keep right edge fixed
        const newX = resizeStartLeft.posX + (resizeStartLeft.width - newWidth);
        
        setPosition(prev => ({ ...prev, x: newX }));
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizingRight(false);
      setIsResizingLeft(false);
    };

    if (isDragging || isResizingRight || isResizingLeft) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizingRight, isResizingLeft, dragStart, position, size, resizeStartRight, resizeStartLeft]);

  const renderActiveTab = () => {
    switch (editorState.activeTab) {
      case 'tiles':
        return <TileEditor />;
      case 'page':
        return <PageEditor />;
      case 'theme':
        return <ThemeEditor />;
      case 'layout':
        return <LayoutEditor />;
      case 'config':
        return <ConfigEditor />;
      default:
        return <TileEditor />;
    }
  };

  return (
    <div 
      ref={editorRef}
      className="floating-editor-panel"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        backgroundColor: config.theme.cardBackground,
        border: `1px solid ${config.theme.primaryColor}40`,
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'default',
        fontFamily: config.theme.fontFamily,
      }}
    >
      <div 
        className="editor-header"
        onMouseDown={handleMouseDown}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          padding: '12px 16px',
          borderBottom: `1px solid ${config.theme.primaryColor}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: config.theme.primaryColor + '10',
          userSelect: 'none', // Prevent text selection
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Move size={16} style={{ color: config.theme.textColor, opacity: 0.7 }} />
          <h2 style={{ color: config.theme.textColor, margin: 0, fontSize: '16px' }}>Dashboard Editor</h2>
        </div>
        <button 
          onClick={toggleEditor}
          className="close-editor"
          style={{ 
            color: config.theme.textColor,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = config.theme.primaryColor + '20';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={18} />
        </button>
      </div>

      <div 
        className="editor-tabs"
        style={{
          display: 'flex',
          borderBottom: `1px solid ${config.theme.primaryColor}20`,
          backgroundColor: config.theme.backgroundColor,
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${editorState.activeTab === tab.id ? 'active' : ''}`}
              style={{
                flex: 1,
                padding: '12px 8px',
                border: 'none',
                backgroundColor: editorState.activeTab === tab.id 
                  ? config.theme.primaryColor 
                  : 'transparent',
                color: editorState.activeTab === tab.id 
                  ? 'white' 
                  : config.theme.textColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '12px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (editorState.activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = config.theme.primaryColor + '20';
                }
              }}
              onMouseLeave={(e) => {
                if (editorState.activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div 
        className="editor-content"
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
        }}
      >
        {renderActiveTab()}
      </div>

      {/* Resize handles */}
      {/* Bottom-right resize handle */}
      <div
        className="resize-handle"
        onMouseDown={handleResizeRightMouseDown}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '16px',
          height: '16px',
          cursor: 'se-resize',
          backgroundColor: isResizingRight ? config.theme.primaryColor + '60' : config.theme.primaryColor + '30',
          borderLeft: `2px solid ${config.theme.primaryColor}`,
          borderTop: `2px solid ${config.theme.primaryColor}`,
          borderBottomRightRadius: '12px',
          transition: isResizingRight ? 'none' : 'background-color 0.2s ease',
        }}
        title="Drag to resize width and height"
        onMouseEnter={(e) => {
          if (!isResizingRight) {
            e.currentTarget.style.backgroundColor = config.theme.primaryColor + '50';
          }
        }}
        onMouseLeave={(e) => {
          if (!isResizingRight) {
            e.currentTarget.style.backgroundColor = config.theme.primaryColor + '30';
          }
        }}
      />

      {/* Bottom-left resize handle */}
      <div
        className="resize-handle-left"
        onMouseDown={handleResizeLeftMouseDown}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '16px',
          height: '16px',
          cursor: 'sw-resize',
          backgroundColor: isResizingLeft ? config.theme.primaryColor + '60' : config.theme.primaryColor + '30',
          borderRight: `2px solid ${config.theme.primaryColor}`,
          borderTop: `2px solid ${config.theme.primaryColor}`,
          borderBottomLeftRadius: '12px',
          transition: isResizingLeft ? 'none' : 'background-color 0.2s ease',
        }}
        title="Drag to resize width and height"
        onMouseEnter={(e) => {
          if (!isResizingLeft) {
            e.currentTarget.style.backgroundColor = config.theme.primaryColor + '50';
          }
        }}
        onMouseLeave={(e) => {
          if (!isResizingLeft) {
            e.currentTarget.style.backgroundColor = config.theme.primaryColor + '30';
          }
        }}
      />
    </div>
  );
};
