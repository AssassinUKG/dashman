# Contributing to Dashman

Thank you for your interest in contributing to Dashman! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dashman.git
   cd dashman
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use **TypeScript** for type safety
- Follow **React functional components** with hooks
- Use **CSS modules** for component styling
- Implement proper **accessibility** attributes
- Write **meaningful commit messages**

### Testing
- Test your changes across different screen sizes
- Ensure all existing functionality still works
- Verify Docker builds successfully: `docker build -t dashman .`

### Pull Request Process
1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes** and test thoroughly
3. **Commit with clear messages**: `git commit -m "Add: new tile management feature"`
4. **Push to your fork**: `git push origin feature/your-feature-name`
5. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Reference to any related issues

## 🐛 Bug Reports

When reporting bugs, please include:
- **Browser and version**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Console errors** if any

## 💡 Feature Requests

For new features:
- **Check existing issues** first
- **Describe the use case** clearly
- **Explain the benefit** to users
- **Consider implementation complexity**

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Editor/         # Floating editor components
│   └── ...
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## 📝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the best solution for users

## 🚢 Release Process

1. Features are merged to `develop` branch
2. Releases are tagged from `main` branch
3. Docker images are built automatically
4. Documentation is updated accordingly

## 🤝 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and ideas
- **Documentation** - Check the README for setup and usage

Thank you for making Dashman better! 🏠✨
