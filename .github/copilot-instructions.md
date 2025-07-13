# Copilot Instructions for Dashman

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a homelab dashboard application similar to Dashy with the following key features:

## Project Overview
- **Framework**: React 18 with TypeScript and Vite
- **Purpose**: Dashboard editor for homelab services with real-time editing capabilities
- **Key Features**: 
  - Tile-based layout like Dashy
  - Built-in UI editor with real-time preview
  - Theming support with multiple color schemes
  - Fallback domain functionality
  - Responsive design for desktop and mobile

## Code Style Guidelines
- Use TypeScript for type safety
- Prefer functional components with hooks
- Use CSS modules or styled-components for styling
- Follow React best practices for state management
- Implement proper error boundaries
- Use proper accessibility attributes

## Architecture
- **Components**: Modular, reusable UI components
- **Hooks**: Custom hooks for data management and side effects
- **Context**: Theme and configuration context providers
- **Utils**: Helper functions for configuration parsing and validation
- **Types**: Comprehensive TypeScript interfaces and types

## Key Components to Implement
- Dashboard layout with drag-and-drop tiles
- Theme switcher with dark/light modes
- Real-time configuration editor
- Service tile components with status indicators
- Settings panel for customization
- Backup and restore functionality
