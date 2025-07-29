// src/components/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../hooks/useThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${className}`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;