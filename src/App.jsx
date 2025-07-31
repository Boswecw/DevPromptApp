// src/App.jsx - CORRECT for your index.js
import React from 'react';
import { ErrorBoundary, ThemeProvider } from './components';
import { PromptBuilder } from './components/PromptBuilder';  // ← Named import

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