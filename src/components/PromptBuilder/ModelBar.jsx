// src/components/PromptBuilder/ModelBar.jsx
import React from 'react';
import { Zap, Check } from 'lucide-react';
import { AI_MODELS } from './constants';

const ModelBar = ({ selectedModel, onModelChange }) => {
  return (
    <div className="sticky top-16 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 mr-3">
          <Zap className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium">AI Models</span>
        </div>

        {/* horizontally scrollable pill buttons */}
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {AI_MODELS.map(m => {
              const active = selectedModel === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onModelChange(m.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-3 h-8 rounded-full border
                    text-sm transition-all
                    ${active
                      ? 'bg-purple-600 text-white border-purple-600 shadow'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}
                  `}
                  title={m.name}
                >
                  <span className="text-base leading-none">{m.icon}</span>
                  <span className="hidden sm:inline">{m.name}</span>
                  {active && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelBar;
