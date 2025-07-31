// src/components/ThemeToggle.jsx - ENHANCED WITH BETTER UX
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../hooks/useThemeContext';

const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { isDarkMode, toggleTheme, theme } = useThemeContext();

  const handleToggle = () => {
    console.log('Theme toggle clicked, current theme:', theme);
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative inline-flex items-center gap-2 p-2 rounded-lg 
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300 focus:ring-yellow-400' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 focus:ring-blue-500'
        } 
        ${className}
      `}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      type="button"
    >
      {/* Icon container with animation */}
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <Sun 
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out
            ${isDarkMode 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        
        {/* Moon icon */}
        <Moon 
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out
            ${isDarkMode 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>

      {/* Optional label */}
      {showLabel && (
        <span className="text-sm font-medium select-none">
          {isDarkMode ? 'Dark' : 'Light'}
        </span>
      )}

      {/* Hover overlay effect */}
      <div className={`
        absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200
        ${isDarkMode 
          ? 'bg-yellow-400/10 hover:opacity-100' 
          : 'bg-blue-500/10 hover:opacity-100'
        }
      `} />
    </button>
  );
};

export default ThemeToggle;