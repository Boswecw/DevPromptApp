import React, { useState, useEffect } from 'react';
import PromptBuilder from './components/PromptBuilder/PromptBuilder';
import CustomPromptBuilder from './components/PromptBuilder/CustomPromptBuilder';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components';
import './index.css';

function App() {
  const [currentMode, setCurrentMode] = useState('guided');

  // Load the last used mode from localStorage
  useEffect(() => {
    const lastMode = localStorage.getItem('devprompt-last-mode');
    if (lastMode && ['guided', 'custom'].includes(lastMode)) {
      setCurrentMode(lastMode);
    }
  }, []);

  // Switch between guided and custom modes
  const handleSwitchMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem('devprompt-last-mode', mode);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
          {currentMode === 'guided' ? (
            <PromptBuilder onSwitchMode={handleSwitchMode} />
          ) : (
            <CustomPromptBuilder onSwitchMode={handleSwitchMode} />
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;