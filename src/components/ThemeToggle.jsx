// src/components/ThemeToggle.jsx - FIXED ICON SWITCHING
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../hooks/useThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700'
      } ${className}`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;