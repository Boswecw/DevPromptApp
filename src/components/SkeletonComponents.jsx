// src/components/SkeletonComponents.jsx
import React from 'react';

// Basic skeleton element
const SkeletonElement = ({ className = '', width = 'w-full', height = 'h-4' }) => (
  <div className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
);

// Prompt card skeleton
export const PromptCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    {/* Header with title and favorite button */}
    <div className="flex justify-between items-start mb-3">
      <SkeletonElement width="w-3/4" height="h-5" />
      <SkeletonElement width="w-4" height="h-4" />
    </div>
    
    {/* Description lines */}
    <div className="space-y-2 mb-4">
      <SkeletonElement width="w-full" height="h-3" />
      <SkeletonElement width="w-2/3" height="h-3" />
    </div>
    
    {/* Tags */}
    <div className="flex gap-2 mb-4">
      <SkeletonElement width="w-16" height="h-6" />
      <SkeletonElement width="w-20" height="h-6" />
      <SkeletonElement width="w-14" height="h-6" />
    </div>
    
    {/* Action buttons */}
    <div className="grid grid-cols-2 gap-2">
      <SkeletonElement width="w-full" height="h-8" />
      <SkeletonElement width="w-full" height="h-8" />
    </div>
  </div>
);

// Search bar skeleton
export const SearchBarSkeleton = () => (
  <div className="mb-6">
    <SkeletonElement width="w-full" height="h-10" className="rounded-lg" />
  </div>
);

// Category filter skeleton
export const CategoryFilterSkeleton = () => (
  <div className="mb-6">
    <div className="flex flex-wrap gap-2">
      {[...Array(5)].map((_, i) => (
        <SkeletonElement 
          key={i} 
          width="w-20" 
          height="h-8" 
          className="rounded-full" 
        />
      ))}
    </div>
  </div>
);

// Analytics card skeleton
export const AnalyticsCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    <SkeletonElement width="w-2/3" height="h-5" className="mb-3" />
    <SkeletonElement width="w-16" height="h-8" className="mb-2" />
    <SkeletonElement width="w-3/4" height="h-3" />
  </div>
);

// Full page skeleton for initial load
export const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <SkeletonElement width="w-64" height="h-8" className="mb-8" />
      
      {/* Search bar */}
      <SearchBarSkeleton />
      
      {/* Category filters */}
      <CategoryFilterSkeleton />
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <AnalyticsCardSkeleton key={i} />
        ))}
      </div>
      
      {/* Prompt cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <PromptCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

// Table row skeleton
export const TableRowSkeleton = ({ columns = 4 }) => (
  <tr className="animate-pulse">
    {[...Array(columns)].map((_, i) => (
      <td key={i} className="px-6 py-4">
        <SkeletonElement height="h-4" width={i === 0 ? 'w-3/4' : 'w-1/2'} />
      </td>
    ))}
  </tr>
);

// List item skeleton
export const ListItemSkeleton = () => (
  <div className="flex items-center space-x-3 p-4 animate-pulse">
    <SkeletonElement width="w-10" height="h-10" className="rounded-full" />
    <div className="flex-1 space-y-2">
      <SkeletonElement width="w-3/4" height="h-4" />
      <SkeletonElement width="w-1/2" height="h-3" />
    </div>
  </div>
);

export default SkeletonElement;