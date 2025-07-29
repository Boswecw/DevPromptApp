// src/components/index.js
// ✅ Updated with ThemeProvider and ThemeToggle exports

// Error handling components
export { default as ErrorBoundary } from './ErrorBoundary';

// Theme components
export { default as ThemeProvider } from './ThemeProvider';
export { default as ThemeToggle } from './ThemeToggle';

// Help component
export { default as HelpModal } from './HelpModal';

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