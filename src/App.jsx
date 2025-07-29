// src/App.jsx - Updated with ThemeProvider
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeProvider from './components/ThemeProvider';
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