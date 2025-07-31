// src/hooks/useTheme.js - FIXED VERSION: Removed duplicate useEffect
import { useState, useEffect } from 'react';

export function useTheme() {
  // Initialize theme state with proper fallback chain
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      // 1. Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      
      // 2. Fall back to system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      
      return 'light';
    } catch {
      console.warn('Failed to determine initial theme');
      return 'light';
    }
  });

  // Apply theme changes to document immediately and handle side effects
  useEffect(() => {
    const applyTheme = (themeToApply) => {
      try {
        const root = document.documentElement;
        const body = document.body;
        
        // Remove both theme classes first to prevent conflicts
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        
        // Add the new theme class
        if (themeToApply === 'dark') {
          root.classList.add('dark');
          body.classList.add('dark');
          // Set color-scheme for better browser integration
          root.style.colorScheme = 'dark';
        } else {
          root.classList.add('light');
          body.classList.add('light');
          root.style.colorScheme = 'light';
        }
        
        // Save to localStorage
        localStorage.setItem('theme', themeToApply);
        
        console.log(`Theme applied: ${themeToApply}`);
      } catch {
        console.error('Failed to apply theme');
      }
    };

    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes, only if no saved preference exists
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      try {
        // Only respond to system changes if user hasn't explicitly set a theme
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
          console.log('System theme changed:', e.matches ? 'dark' : 'light');
          setThemeState(e.matches ? 'dark' : 'light');
        }
      } catch {
        // If localStorage fails, still respond to system changes
        console.log('System theme changed (localStorage unavailable):', e.matches ? 'dark' : 'light');
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    // Use the newer addEventListener if available, otherwise use deprecated addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, []);

  // REMOVED THE DUPLICATE useEffect THAT WAS CAUSING ISSUES

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log(`Toggling theme from ${theme} to ${newTheme}`);
    setThemeState(newTheme);
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      console.log(`Setting theme to: ${newTheme}`);
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