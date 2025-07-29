// src/hooks/useTheme.js
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

// Custom hook for theme management
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return false;
    
    try {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      
      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      console.warn('Failed to access localStorage or matchMedia');
      return false;
    }
  });

  // Apply theme changes to document
  useEffect(() => {
    try {
      const root = document.documentElement;
      
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {
      console.warn('Failed to apply theme');
    }
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if no theme is saved in localStorage
      try {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
          setIsDarkMode(e.matches);
        }
      } catch {
        // If localStorage fails, still respond to system changes
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const setTheme = (theme) => {
    if (theme === 'dark' || theme === 'light') {
      setIsDarkMode(theme === 'dark');
    } else {
      console.warn('Invalid theme. Use "dark" or "light".');
    }
  };

  return {
    isDarkMode,
    toggleTheme,
    setTheme
  };
}

// Hook to use theme context (for consuming components)
export function useThemeContext() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
}