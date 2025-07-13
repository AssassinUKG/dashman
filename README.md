# Dashman - Homelab Dashboard

A modern, highly customizable dashboard for homelab services inspired by Dashy, built with React, TypeScript, and Vite. Features a powerful built-in editor with real-time editing capabilities, advanced customization options, and production-ready Docker deployment.

## Screenshot

<img width="2801" height="1477" alt="image" src="https://github.com/user-attachments/assets/71355c54-b360-4f2a-a5b5-329274df731a" style="object-fit: scale-down;" />


## Demo video

TO BE MADE

## ✨ Features

### 🎨 **Advanced Theming & Customization**
- **Theme Presets** - Quick Light/Dark mode switching with professional color schemes
- **Custom Color Schemes** - Full control over primary, background, text, and accent colors
- **Typography Control** - 23 Google Fonts available with real-time font switching:
  - Inter, Roboto, Open Sans, Lato, Source Sans Pro, Poppins, Montserrat
  - Nunito, Ubuntu, Raleway, Work Sans, Fira Sans, DM Sans, Plus Jakarta Sans
  - Manrope, Space Grotesk, IBM Plex Sans, Outfit, Lexend, Quicksand
  - Karla, Public Sans, Noto Sans
- **Visual Elements** - Customizable border radius, spacing, and layout options

### 🔧 **Floating Editor Interface**
- **Draggable & Resizable** - Move and resize editor panel with dual resize handles (corner + bottom)
- **Tabbed Navigation** - Organized interface: Page, Layout, Tiles, Theme, and Config tabs
- **Keyboard Shortcuts** - Toggle editor visibility with Ctrl+E hotkey
- **Non-blocking Design** - Edit while viewing your dashboard in real-time

### 📝 **Page & Content Management**
- **Dashboard Customization** - Control title, subtitle, and element visibility
- **Search Integration** - Built-in search bar with real-time filtering
- **Category System** - Organize services with custom categories and colors
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices

### 🧩 **Advanced Tile Management**
- **Drag & Drop Reordering** - Intuitive tile arrangement with visual feedback
- **Per-Tile Configuration** - Individual settings for each service including:
  - Link behavior (new tab/same tab)
  - Custom icons (4 types: Lucide, URL, SVG code, file upload)
  - Health check URLs for status monitoring
  - Individual status indicator controls
- **Smart Fallback** - Automatic failover to backup service URLs

### 📊 **Service Health Monitoring**
- **Real-time Health Checks** - Automatic service availability monitoring every 30 seconds
- **Per-Tile Status Control** - Enable/disable status indicators individually
- **Custom Health URLs** - Configure specific endpoints for health checks
- **Visual Indicators** - Color-coded status dots with proper CORS and timeout handling

### 🐳 **Production-Ready Deployment**
- **Docker Containerization** - Multi-stage builds with optimized production images
- **Nginx Serving** - High-performance static file serving with gzip compression
- **Health Checks** - Built-in container health monitoring
- **Security Headers** - Production-ready security configurations

## 🚀 Quick Start

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dashman_inprogress
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Docker Deployment

#### Using Docker Compose (Recommended)
```bash
# Build and start the container
docker-compose up -d

# Access the dashboard at http://localhost:3000
```

#### Manual Docker Build
```bash
# Build the image
docker build -t dashman .

# Run the container
docker run -d -p 3000:80 --name dashman dashman
```

#### Production Deployment with SSL
```bash
# Modify docker-compose.yml to uncomment nginx-proxy service
# Add your SSL certificates to ./ssl directory
# Update proxy.conf for your domain

docker-compose up -d
```

## 📖 Detailed Usage Guide

### 🔧 Opening the Editor
- **Method 1:** Click the **Edit** button (pencil icon) in the top-right corner
- **Method 2:** Press **Ctrl+E** keyboard shortcut
- The floating editor panel will appear with full drag and resize capabilities

### 📄 Page Settings Tab
Control your dashboard's main content and appearance:
- **Dashboard Title** - Set your main dashboard heading
- **Subtitle** - Add an optional description or tagline
- **Font Selection** - Choose from 23 Google Fonts with real-time preview
- **Visibility Controls:**
  - Show/hide dashboard title
  - Enable/disable search bar
  - Control category filter visibility

### 🔲 Layout Configuration Tab
Customize the visual layout of your dashboard:
- **Grid Columns** - Set the number of tile columns (1-12)
- **Gap Size** - Control spacing between tiles (0-100px)
- **Visual Elements** - Adjust border radius and styling

### 🧩 Tile Management Tab
Comprehensive service tile management:
- **Add New Tiles** - Click "Add Tile" and configure:
  - Service name and description
  - Primary URL and fallback domain
  - Category assignment
  - Icon selection (Lucide, URL, SVG, or file upload)
  - Link behavior (new tab/same tab)
  - Health check URL configuration
  - Individual status indicator control
- **Edit Existing** - Select any tile from the list to modify
- **Drag to Reorder** - Drag tiles in the dashboard to rearrange
- **Delete Tiles** - Remove unwanted services

### 🎨 Theme Customization Tab
Complete visual control with professional presets:
- **Quick Presets:**
  - Light Theme: Clean, bright interface
  - Dark Theme: Modern dark interface
- **Custom Theme Creation:**
  - Primary colors for accents and highlights
  - Background colors for main areas
  - Text colors for optimal readability
  - Border radius for visual consistency
- **Real-time Preview** - See changes instantly as you adjust settings

### ⚙️ Configuration Management Tab
Advanced dashboard management:
- **Export Configuration** - Download your complete dashboard settings as JSON
- **Import Configuration** - Load settings from a JSON file
- **Category Management:**
  - Create new service categories
  - Assign custom colors to categories
  - Edit or delete existing categories
- **Reset Options** - Start fresh with default settings

### 🔍 Search and Filtering
- **Global Search** - Type to find services by name or description
- **Category Filters** - Click category buttons to filter tiles by category
- **Real-time Results** - Filtering happens instantly as you type
- **Clear Filters** - Click "All" to show all services

### 📊 Health Monitoring System
- **Automatic Checks** - Services are checked every 30 seconds
- **Visual Indicators** - Green dots for healthy, red for unavailable, gray for disabled
- **Per-Tile Control** - Enable/disable monitoring for individual services
- **Custom Endpoints** - Set specific health check URLs different from service URLs
- **Error Handling** - Graceful handling of CORS restrictions and timeouts

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── Editor/             # Editor panel components
│   │   ├── Editor.tsx      # Main floating editor with drag/resize
│   │   ├── PageEditor.tsx  # Page settings and font selection
│   │   ├── TileEditor.tsx  # Service tile management with per-tile controls
│   │   ├── ThemeEditor.tsx # Theme presets and customization
│   │   ├── LayoutEditor.tsx# Grid layout controls
│   │   └── ConfigEditor.tsx# Import/export and category management
│   ├── Dashboard.tsx       # Main dashboard orchestration
│   ├── DashboardHeader.tsx # Title and subtitle display
│   ├── DashboardTile.tsx   # Individual service tiles with status indicators
│   ├── SearchBar.tsx       # Service search functionality
│   └── CategoryFilter.tsx  # Category filtering buttons
├── hooks/                  # Custom React hooks
│   └── useHealthCheck.ts   # Health monitoring system
├── store/                  # Zustand state management
│   └── dashboard.ts        # Main application state with persistence
├── types/                  # TypeScript type definitions
│   └── dashboard.ts        # Comprehensive interface definitions
└── utils/                  # Utility functions and helpers
```

## 🛠️ Technology Stack

- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Enhanced JavaScript with comprehensive type safety
- **Vite** - Lightning-fast build tool and development server
- **Zustand** - Lightweight state management with localStorage persistence
- **@dnd-kit** - Smooth drag and drop functionality for tiles and editor
- **Lucide React** - Beautiful, consistent icon library with 1000+ icons
- **CSS Modules** - Scoped styling system for component isolation
- **Google Fonts** - Web typography with 23 carefully selected font families
- **Docker** - Containerization with multi-stage builds and nginx serving

## 🎯 Key Features in Detail

### Advanced Icon System
Four flexible icon types for maximum customization:
1. **Lucide Icons** - 1000+ professional SVG icons from the Lucide library
2. **Custom URLs** - Link to any image file (PNG, JPG, SVG, etc.)
3. **SVG Code** - Paste raw SVG markup for custom graphics
4. **File Upload** - Upload and use your own image files

### Dual Resize Handles
Enhanced editor usability with two resize options:
- **Corner Handle** - Resize both width and height simultaneously
- **Bottom Handle** - Resize height only for precise control

### Professional Theme Presets
Ready-to-use theme configurations:
- **Light Theme** - Clean, bright interface with blue accents
- **Dark Theme** - Modern dark interface with purple accents
- **Custom Themes** - Complete control over all colors and styling

### Per-Tile Health Monitoring
Granular control over service monitoring:
- Individual enable/disable for each service
- Custom health check endpoints
- Fallback to main URL if no health URL specified
- Real-time status updates with visual feedback

### Font System Integration
Typography management with Google Fonts:
- 23 carefully curated font families
- Real-time font switching without page reload
- Automatic font loading and caching
- Fallback font handling for reliability

## 🐳 Docker Configuration

### Multi-Stage Build Process
1. **Build Stage** - Node.js 18 Alpine for building the React application
2. **Production Stage** - Nginx Alpine for serving static files

### Production Optimizations
- Gzip compression for all static assets
- Security headers for enhanced protection
- Health check endpoint at `/health`
- Optimized caching for static resources
- Minimal attack surface with Alpine Linux

### Environment Configuration
- Port 3000 exposed for external access
- Health checks with 30-second intervals
- Automatic restart unless stopped
- Network isolation with custom bridge network

## 🔒 Security Features

- **Content Security Policy** - Prevents XSS attacks
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing
- **Referrer Policy** - Controls referrer information
- **CORS Handling** - Proper cross-origin request management

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository** on GitHub
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request** with a clear description

### Development Guidelines
- Follow the existing TypeScript and React patterns
- Ensure all components are properly typed with comprehensive interfaces
- Test your changes across different screen sizes and browsers
- Maintain the existing code style and formatting
- Add appropriate error handling and loading states
- Update documentation for new features

### Code Style
- Use functional components with React hooks
- Implement proper TypeScript typing for all props and state
- Follow the established component structure and naming conventions
- Use CSS modules for component styling
- Implement proper accessibility attributes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Dashy](https://github.com/Lissy93/dashy) for the original homelab dashboard concept
- Built with modern React and TypeScript best practices
- Uses excellent open-source libraries from the React ecosystem
- Typography powered by Google Fonts
- Icons provided by Lucide React
- Containerization with Docker for production deployment

## 📊 Performance & Browser Support

- **Modern Browsers** - Chrome 88+, Firefox 78+, Safari 14+, Edge 88+
- **Mobile Support** - iOS Safari 14+, Chrome Mobile 88+
- **Performance** - Optimized bundle size with code splitting
- **Accessibility** - WCAG 2.1 AA compliance for inclusive design

---

**Dashman** - Making homelab service management beautiful, efficient, and production-ready! 🏠✨

## Created by 

ac1d - richard jones pcsp 13/07/2025

### Quick Links
- 🚀 [Quick Start](#-quick-start) - Get running in minutes
- 🐳 [Docker Deployment](#docker-deployment) - Production-ready containers
- 📖 [Usage Guide](#-detailed-usage-guide) - Complete feature walkthrough
- 🛠️ [Technology Stack](#️-technology-stack) - Built with modern tools
- 🤝 [Contributing](#-contributing) - Join the development
