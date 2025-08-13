import React, { useEffect, useState, useCallback } from 'react';
import { ErrorBoundary, ThemeProvider } from './components';
import { PromptBuilder, CustomPromptBuilder } from './components/PromptBuilder';
import { Code, Wand2 } from 'lucide-react';

const App = () => {
  const [mode, setMode] = useState('standard'); // 'standard' | 'custom'

  // Load last mode
  useEffect(() => {
    const last = localStorage.getItem('devprompt-last-mode');
    if (last === 'custom' || last === 'standard') {
      setMode(last);
    }
  }, []);

  // Persist on change
  const switchMode = useCallback((next) => {
    const normalized = next === 'custom' ? 'custom' : 'standard';
    setMode(normalized);
    localStorage.setItem('devprompt-last-mode', normalized);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        {/* Simple top bar to switch modes */}
        <div className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">DevPromptApp</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchMode('standard')}
                className={`px-3 py-1.5 rounded text-sm ${
                  mode === 'standard'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Standard Builder
              </button>
              <button
                onClick={() => switchMode('custom')}
                className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${
                  mode === 'custom'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                Custom Builder
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        {mode === 'custom' ? (
          <CustomPromptBuilder onSwitchMode={switchMode} />
        ) : (
          <PromptBuilder />
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
