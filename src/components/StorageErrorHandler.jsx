// src/components/StorageErrorHandler.jsx
import React from 'react';
import { AlertTriangle, RefreshCw, Trash2, HardDrive } from 'lucide-react';

const StorageErrorHandler = ({ 
  error, 
  onRetry, 
  onClearStorage, 
  storageKey,
  isSupported = true 
}) => {
  const handleClearStorage = () => {
    if (window.confirm('This will clear all your saved data. Are you sure?')) {
      onClearStorage();
    }
  };

  const getErrorType = (errorMessage) => {
    if (errorMessage.includes('QuotaExceededError') || errorMessage.includes('quota')) {
      return 'quota';
    }
    if (errorMessage.includes('not available') || errorMessage.includes('not supported')) {
      return 'unsupported';
    }
    if (errorMessage.includes('parse') || errorMessage.includes('JSON')) {
      return 'corruption';
    }
    return 'generic';
  };

  const errorType = getErrorType(error);

  const errorConfig = {
    quota: {
      icon: HardDrive,
      title: 'Storage Quota Exceeded',
      description: 'Your browser storage is full. Clear some data to continue.',
      suggestion: 'Try clearing old data or exporting your prompts to free up space.',
      showClearButton: true
    },
    unsupported: {
      icon: AlertTriangle,
      title: 'Storage Not Available',
      description: 'Your browser doesn\'t support local storage or it\'s disabled.',
      suggestion: 'Please enable localStorage in your browser settings or use a different browser.',
      showClearButton: false
    },
    corruption: {
      icon: AlertTriangle,
      title: 'Data Corruption Detected',
      description: 'Your saved data appears to be corrupted.',
      suggestion: 'We\'ll need to reset your data to continue. Consider exporting backups regularly.',
      showClearButton: true
    },
    generic: {
      icon: AlertTriangle,
      title: 'Storage Error',
      description: 'An error occurred while accessing storage.',
      suggestion: 'This might be a temporary issue. Try refreshing the page.',
      showClearButton: false
    }
  };

  const config = errorConfig[errorType];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <IconComponent className="w-16 h-16 text-red-500 mx-auto mb-4" />
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {config.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {config.description}
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Suggestion:</strong> {config.suggestion}
            </p>
          </div>

          {/* Error details */}
          <details className="text-left mb-6">
            <summary className="cursor-pointer text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300">
              Technical Details
            </summary>
            <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
              <div className="mb-2">
                <strong>Storage Key:</strong> {storageKey}
              </div>
              <div className="mb-2">
                <strong>Supported:</strong> {isSupported ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Error:</strong> {error}
              </div>
            </div>
          </details>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRetry}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            {config.showClearButton && (
              <button
                onClick={handleClearStorage}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Data
              </button>
            )}
          </div>

          {/* Additional help */}
          {errorType === 'unsupported' && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>The app will still work, but your data won't be saved between sessions.</p>
            </div>
          )}

          {errorType === 'quota' && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>
                Browser storage usage:{' '}
                <button 
                  onClick={() => {
                    if ('storage' in navigator && 'estimate' in navigator.storage) {
                      navigator.storage.estimate().then(estimate => {
                        const used = (estimate.usage / 1024 / 1024).toFixed(2);
                        const quota = (estimate.quota / 1024 / 1024).toFixed(2);
                        alert(`Used: ${used} MB / ${quota} MB`);
                      });
                    } else {
                      alert('Storage estimation not supported');
                    }
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Check Usage
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageErrorHandler;