// src/components/ThemeProvider.jsx - ONLY exports component (no context, no hooks)
import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTheme } from '../hooks/useTheme';

const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  const contextValue = {
    isDarkMode: theme === 'dark',
    theme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;