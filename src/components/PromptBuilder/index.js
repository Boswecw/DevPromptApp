// src/components/index.js - Updated with PWA support
// Error handling components
export { default as ErrorBoundary } from './ErrorBoundary';

// Theme components
export { default as ThemeProvider } from './ThemeProvider';
export { default as ThemeToggle } from './ThemeToggle';

// Help component
export { default as HelpModal } from './HelpModal';

// PWA component
export { default as PWAInstall } from './PWAInstall';

// Loading components
export { default as LoadingSpinner, InlineSpinner, LoadingOverlay } from './LoadingSpinner';

// Skeleton components
export { 
  default as SkeletonElement,
  PromptCardSkeleton,
  SearchBarSkeleton,
  CategoryFilterSkeleton,
  AnalyticsCardSkeleton,
  PageSkeleton,
  TableRowSkeleton,
  ListItemSkeleton
} from './SkeletonComponents';

// Storage error handler
export { default as StorageErrorHandler } from './StorageErrorHandler';

// Export hooks and contexts from their proper locations
export { useThemeContext } from '../hooks/useThemeContext';
export { ThemeContext } from '../contexts/ThemeContext';