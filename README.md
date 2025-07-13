# Dashman - Professional Homelab Dashboard

A next-generation homelab dashboard that takes service management to the next level. Built from the ground up with React 18, TypeScript, and modern web technologies, Dashman delivers the ultimate dashboard experience with real-time editing, advanced health monitoring, and enterprise-grade features in a sleek, customizable interface.

## Screenshot

<img width="2801" height="1477" alt="image" src="https://github.com/user-attachments/assets/71355c54-b360-4f2a-a5b5-329274df731a" style="object-fit: scale-down;" />


## Demo video

TO BE MADE

## ✨ Key Features

### �️ **Revolutionary Floating Editor**
- **Live Editing Experience** - Edit your dashboard while viewing it in real-time with zero page refreshes
- **Drag & Resize Interface** - Fully draggable editor panel with dual resize handles for precise control
- **Tabbed Organization** - Intuitive navigation across Page, Layout, Tiles, Theme, and Config management
- **Keyboard Shortcuts** - Quick toggle with Ctrl+E hotkey for power users
- **Non-Intrusive Design** - Overlay editing that never blocks your dashboard view

### 🎨 **Advanced Visual Customization**
- **Comprehensive Layout Engine** - Multiple grid types (Fixed, Auto-fit, Responsive) with aspect ratio controls
- **Professional Theme System** - Instant Dark/Light modes plus unlimited custom color schemes
- **Typography Excellence** - 23 premium Google Fonts with real-time switching and preview
- **Smart Spacing Controls** - Granular control over gaps, padding, and tile dimensions
- **Layout Presets** - One-click layouts (Spacious, Compact, Dense, Auto-fit) for different use cases

### 🔧 **Intelligent Tile Management**
- **Smart Service Detection** - Advanced URL handling with automatic fallback and health monitoring
- **Flexible Icon System** - 4 icon types: Lucide library, custom URLs, SVG code, or file uploads
- **Drag & Drop Reordering** - Effortless tile arrangement with visual feedback
- **Per-Tile Configuration** - Individual settings for icons, links, categories, and status monitoring
- **Category Organization** - Custom categories with color coding and smart filtering

### 📊 **Enterprise Health Monitoring**
- **Configurable Health Checks** - Customizable polling intervals (5s to 5min) with timeout controls
- **Smart Fallback Logic** - Automatic failover to backup URLs when primary services are offline
- **Visual Status Indicators** - Real-time color-coded status with orange fallback notifications
- **Global Controls** - Master enable/disable with per-tile override capabilities
- **CORS-Aware Monitoring** - Intelligent handling of cross-origin restrictions

### � **Production-Ready Architecture**
- **Docker Containerization** - Optimized multi-stage builds with Nginx serving
- **Security Hardened** - CSP headers, XSS protection, and security best practices
- **Mobile Responsive** - Flawless experience across desktop, tablet, and mobile devices
- **Performance Optimized** - Code splitting, lazy loading, and optimized bundle sizes
- **Health Check Endpoints** - Built-in container monitoring for production deployments

## 🚀 Quick Start

### 🖥️ Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dashman
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
   - Press **Ctrl+E** to open the editor and start customizing!

### 🐳 Docker Deployment

#### Using Docker Compose (Recommended)
```bash
# Build and start the container
docker-compose up -d

# Access your dashboard at http://localhost:3000
```

#### Manual Docker Build
```bash
# Build the production image
docker build -t dashman .

# Run the container
docker run -d -p 3000:80 --name dashman-dashboard dashman
```

#### Production Deployment with SSL
```bash
# Modify docker-compose.yml to uncomment nginx-proxy service
# Add your SSL certificates to ./ssl directory
# Update proxy.conf for your domain

docker-compose up -d
```

## 📖 Comprehensive Usage Guide

### � Getting Started with the Editor
- **Quick Access:** Click the **Edit** button (✏️) in the top-right corner or press **Ctrl+E**
- **Live Editing:** The floating editor appears without blocking your dashboard view
- **Full Control:** Drag, resize, and position the editor exactly where you want it

### 🎨 Dashboard Personalization (Page Tab)
Transform your dashboard's appearance and behavior:
- **Branding:** Set custom titles and subtitles that reflect your homelab identity
- **Typography:** Choose from 23 premium Google Fonts with instant preview
- **Layout Elements:** Control visibility of search bars, categories, and navigation
- **Favicon:** Add custom emojis, images, or uploaded files as your browser tab icon

### � Advanced Layout Engine (Layout Tab)
Professional layout control with multiple grid systems:
- **Grid Types:**
  - **Fixed Columns:** Traditional grid with set column count (1-12)
  - **Auto-fit:** Responsive tiles that automatically adjust to screen width
  - **Responsive:** Breakpoint-based layouts for different screen sizes
- **Tile Dimensions:** Set aspect ratios (Square, Portrait, Landscape, Wide, Tall)
- **Spacing Control:** Fine-tune gaps and padding for perfect visual balance
- **Quick Presets:** One-click layouts (Spacious, Compact, Dense, Auto-fit)

### 🧩 Service Management (Tiles Tab)
Comprehensive tile management with enterprise features:
- **Smart Service Addition:**
  - Primary URLs with intelligent fallback domains
  - Dedicated health check endpoints for accurate monitoring
  - Category assignment with custom color coding
- **Advanced Icon System:**
  - **Lucide Icons:** 1000+ professional SVG icons
  - **Custom URLs:** Link to any web-hosted image
  - **SVG Code:** Paste custom SVG markup for unique graphics
  - **File Upload:** Use your own image files
- **Behavior Controls:** Configure link targets and individual health monitoring

### 🎨 Visual Customization (Theme Tab)
Create stunning visual experiences:
- **Professional Presets:** Instant Dark/Light themes with carefully selected colors
- **Custom Theme Creation:** Full control over every color aspect
- **Real-time Preview:** See changes instantly as you customize
- **Tile Border Radius:** Control the roundness of your service tiles

### ⚙️ System Configuration (Config Tab)
Advanced dashboard management and monitoring:
- **Health Check System:**
  - **Global Controls:** Master enable/disable for all health monitoring
  - **Polling Intervals:** Configurable check frequency (5 seconds to 5 minutes)
  - **Timeout Settings:** Adjust timeout values for different network conditions
- **Configuration Management:**
  - **Export/Import:** Save and share your dashboard configurations
  - **Category Management:** Create, edit, and organize service categories
  - **Reset Options:** Start fresh while preserving your customizations

### 🔍 Smart Search & Filtering
Efficiently navigate large service collections:
- **Global Search:** Real-time filtering by service name or description
- **Category Filtering:** Quick filtering with visual category buttons
- **Instant Results:** Lightning-fast search with zero delay
- **Clear Filters:** One-click return to full service view

### 📊 Intelligent Health Monitoring
Enterprise-grade service monitoring with smart features:
- **Configurable Monitoring:** Set custom polling intervals and timeout values
- **Smart Fallback System:** Automatic switching to backup URLs when services are offline
- **Visual Status Indicators:**
  - **Green:** Service is healthy and responding
  - **Red:** Service is unavailable or not responding
  - **Orange:** Using fallback URL due to primary service being offline
  - **Gray:** Health monitoring disabled for this tile
- **Per-Tile Control:** Individual enable/disable for granular monitoring control

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

## 🛠️ Modern Technology Stack

**Frontend Excellence:**
- **React 18** - Latest React with concurrent features and improved performance
- **TypeScript** - Full type safety with comprehensive interfaces and error prevention
- **Vite** - Lightning-fast build tool with HMR and optimized production builds
- **Zustand** - Lightweight state management with built-in persistence

**Advanced Features:**
- **@dnd-kit** - Smooth, accessible drag and drop for tiles and editor
- **Lucide React** - 1000+ beautiful, consistent SVG icons
- **Google Fonts** - Professional typography with 23 carefully selected font families
- **CSS Grid** - Modern layout system with responsive breakpoints

**Production Ready:**
- **Docker** - Multi-stage containerization with Alpine Linux
- **Nginx** - High-performance static file serving with compression
- **Security Headers** - CSP, XSS protection, and security best practices

## 🎯 What Makes Dashman Different

### 🚀 **Live Editing Revolution**
Unlike traditional dashboards that require page refreshes or separate admin panels, Dashman's floating editor lets you customize your dashboard while using it. See your changes instantly with zero interruption to your workflow.

### 🧠 **Intelligent Health Monitoring**
Advanced health checking system that goes beyond simple ping tests:
- **Smart Fallback Logic:** Automatically switches to backup URLs when primary services fail
- **Configurable Polling:** Adjust monitoring frequency based on your network and service requirements
- **Visual Feedback:** Color-coded status indicators with clear fallback notifications
- **CORS-Aware:** Intelligent handling of cross-origin restrictions

### 🎨 **Professional Visual System**
Enterprise-grade theming and layout capabilities:
- **Multiple Grid Types:** Fixed, auto-fit, and responsive layouts for any screen size
- **Aspect Ratio Control:** Square, portrait, landscape, wide, and tall tile options
- **Typography Excellence:** 23 premium Google Fonts with real-time switching
- **Layout Presets:** One-click professional layouts (Spacious, Compact, Dense)

### 🔧 **Flexible Icon System**
Four distinct icon types for maximum customization:
1. **Lucide Icons** - 1000+ professional SVG icons from the acclaimed Lucide library
2. **Custom URLs** - Link to any web-hosted image (PNG, JPG, SVG, WebP)
3. **SVG Code** - Paste custom SVG markup for unique graphics and logos
4. **File Upload** - Upload and use your own image files directly

### 📱 **Mobile-First Responsive Design**
Built for modern multi-device usage:
- **Touch-Optimized** - Perfect touch targets and gesture support
- **Responsive Breakpoints** - Intelligent layout adaptation across screen sizes
- **Mobile Editor** - Full editing capabilities on tablets and mobile devices
- **Performance Optimized** - Fast loading and smooth interactions on all devices

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

- **Original Inspiration:** [Dashy](https://github.com/Lissy93/dashy) for pioneering the homelab dashboard concept
- **Modern Architecture:** Built with cutting-edge React 18 and TypeScript best practices  
- **Open Source Excellence:** Powered by exceptional libraries from the React ecosystem
- **Design System:** Icons by [Lucide React](https://lucide.dev/) and typography by [Google Fonts](https://fonts.google.com/)
- **Community Driven:** Enhanced through feedback and contributions from the homelab community

---

**Dashman** - Elevating homelab service management to professional standards! 🏠✨

## Created by 

ac1d - richard jones pcsp 13/07/2025

### Quick Links
- 🚀 [Quick Start](#-quick-start) - Get running in minutes
- 🐳 [Docker Deployment](#docker-deployment) - Production-ready containers
- 📖 [Usage Guide](#-detailed-usage-guide) - Complete feature walkthrough
- 🛠️ [Technology Stack](#️-technology-stack) - Built with modern tools
- 🤝 [Contributing](#-contributing) - Join the development
