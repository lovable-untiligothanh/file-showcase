# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **File Showcase Application** - a web-based file browser that dynamically scans and displays files from the `public/files/` directory. Built with React, TypeScript, Vite, and Tailwind CSS, it provides a modern file browsing interface with folder navigation and file downloads.

## Core Architecture

### File System Scanning
- **Custom Vite Plugin**: `src/plugins/fileSystemScanner.ts` automatically scans `public/files/` directory during build and development
- **Generated Data**: Creates `src/data/fileSystem.generated.ts` with the complete file tree structure
- **Auto-reload**: Watches for file changes in development mode and regenerates the file system data
- **File Structure**: Maintains folder hierarchy with file sizes and download URLs

### Application Structure
- **Single Page App**: React Router with Index (main browser) and NotFound pages
- **State Management**: React Query for server state, URL search params for navigation state
- **Component Architecture**:
  - `FileList`: Renders files and folders with icons and metadata
  - `Breadcrumbs`: Navigation path display
  - Custom UI components from shadcn-ui library

### Key Data Flow
1. Vite plugin scans `public/files/` → generates TypeScript file with file system structure
2. Main page imports generated data and renders file browser interface
3. Navigation updates URL search params, components derive state from URL
4. Files are served statically from `public/files/` via their generated URLs

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with file watching
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Development Workflow

### Adding Files to Showcase
1. Place files in `public/files/` directory (supports nested folders)
2. File system scanner automatically detects changes in development
3. Restart dev server or rebuild to update the file listing

### Component Development
- UI components use shadcn-ui library with Tailwind CSS
- All components should be responsive and follow the existing design system
- Import paths use `@/` alias pointing to `src/` directory

### Key Configuration Files
- `vite.config.ts`: Includes custom file system scanner plugin
- `src/types/files.ts`: Core type definitions for file system items
- `tailwind.config.ts`: Theme and styling configuration

## Important Development Notes

- **Do not edit** `src/data/fileSystem.generated.ts` - it's auto-generated
- The application relies on files being placed in `public/files/` for the file browser to work
- File URLs are generated relative to `/files/` and served statically by Vite
- Navigation state is managed via URL search parameters, not internal React state
- The file system scanner runs on both build start and during development file watching

## Lovable.dev Integration

This project is integrated with Lovable.dev platform:
- Changes made via Lovable are automatically committed to the repository
- The project can be deployed via Lovable's Share → Publish feature
- Component tagging is enabled in development mode for Lovable integration