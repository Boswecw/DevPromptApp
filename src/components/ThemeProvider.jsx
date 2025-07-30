// src/components/ThemeProvider.jsx - FIXED THEME PROVIDER
import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTheme } from '../hooks/useTheme';

const ThemeProvider = ({ children }) => {
  const { theme, isDarkMode, toggleTheme, setTheme } = useTheme();
  
  const contextValue = {
    theme,
    isDarkMode,
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