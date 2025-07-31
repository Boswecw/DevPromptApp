// src/App.jsx - Updated to use new PromptBuilder component
import React from 'react';
import { ErrorBoundary, ThemeProvider } from './components';
import { PromptBuilder } from './components/PromptBuilder';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <PromptBuilder />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;