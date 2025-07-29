// src/App.jsx - Fixed with proper imports and structure
import React from 'react';
import { ErrorBoundary, ThemeProvider } from './components';
import DevPromptApp from './DevPromptApp';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DevPromptApp />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;