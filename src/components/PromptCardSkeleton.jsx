// src/components/PromptCardSkeleton.jsx - Fixed implementation
import React from 'react';

const PromptCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    {/* Header with title and favorite button */}
    <div className="flex justify-between items-start mb-3">
      <div className="w-3/4 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
    
    {/* Description lines */}
    <div className="space-y-2 mb-4">
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
    
    {/* Tags */}
    <div className="flex gap-2 mb-4">
      <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="w-14 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
    
    {/* Action buttons */}
    <div className="grid grid-cols-2 gap-2">
      <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

export default PromptCardSkeleton;