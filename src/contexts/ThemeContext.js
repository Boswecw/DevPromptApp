// src/contexts/ThemeContext.js
import { createContext } from 'react';

export const ThemeContext = createContext({
  isDarkMode: false,
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {}
});