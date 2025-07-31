// ✅ FINAL FIXED useTheme.js — ensures dark mode applies via <html class="dark">
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light';

    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }

      return 'light';
    } catch {
      console.warn('Failed to determine initial theme');
      return 'light';
    }
  });

  // Apply theme to <html> tag and persist it
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;

    if (localStorage.getItem('theme') !== theme) {
      localStorage.setItem('theme', theme);
    }

    console.log(`Theme applied: ${theme}`);
  }, [theme]);

  // Listen to system preference only if no saved preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme);
    }
  };

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}
