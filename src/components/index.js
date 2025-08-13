// src/components/index.js - keep this focused on app-level components

// Error handling
export { default as ErrorBoundary } from './ErrorBoundary';

// Theme
export { default as ThemeProvider } from './ThemeProvider';
export { default as ThemeToggle } from './ThemeToggle';

// Help
export { default as HelpModal } from './HelpModal';

// Loading
export { default as LoadingSpinner, InlineSpinner, LoadingOverlay } from './LoadingSpinner';

// Storage error handler
export { default as StorageErrorHandler } from './StorageErrorHandler';

// Hooks/contexts passthroughs
export { useThemeContext } from '../hooks/useThemeContext';
export { ThemeContext } from '../contexts/ThemeContext';
