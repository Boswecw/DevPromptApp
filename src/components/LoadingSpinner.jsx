// src/components/LoadingSpinner.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'default', 
  text = 'Loading...', 
  color = 'text-blue-600',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin ${color}`} />
      {text && (
        <span className="text-gray-600 dark:text-gray-300 select-none">
          {text}
        </span>
      )}
    </div>
  );
};

// Alternative inline spinner for buttons
export const InlineSpinner = ({ size = 'small', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-5 h-5'
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin ${className}`} />
  );
};

// Full screen loading overlay
export const LoadingOverlay = ({ text = 'Loading...', blur = false }) => (
  <div 
    className={`fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 ${
      blur ? 'backdrop-blur-sm' : ''
    }`}
  >
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-48">
      <LoadingSpinner size="large" text={text} />
    </div>
  </div>
);

export default LoadingSpinner;