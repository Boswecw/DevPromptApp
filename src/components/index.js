// src/components/index.js
// ✅ SIMPLIFIED - Removed missing dependencies

// Error handling components
export { default as ErrorBoundary } from './ErrorBoundary';

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
