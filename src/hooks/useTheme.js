// src/hooks/useTheme.js - FIXED THEME LOGIC
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      
      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      console.warn('Failed to access localStorage or matchMedia');
      return 'light';
    }
  });

  // Apply theme changes to document
  useEffect(() => {
    try {
      const root = document.documentElement;
      const body = document.body;
      
      if (theme === 'dark') {
        root.classList.add('dark');
        body.classList.add('dark');
      } else {
        root.classList.remove('dark');
        body.classList.remove('dark');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
    } catch {
      console.warn('Failed to apply theme');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if no theme is saved in localStorage
      try {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
          setThemeState(e.matches ? 'dark' : 'light');
        }
      } catch {
        // If localStorage fails, still respond to system changes
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme);
    } else {
      console.warn('Invalid theme. Use "dark" or "light".');
    }
  };

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    setTheme
  };
}