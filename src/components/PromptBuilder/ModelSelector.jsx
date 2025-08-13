// src/components/PromptBuilder/ModelSelector.jsx
import React from 'react';
import { Zap, Check } from 'lucide-react';

export const AI_MODELS = [
  { id: 'chatgpt', name: 'ChatGPT', chip: 'bg-green-600', icon: '🤖' },
  { id: 'claude', name: 'Claude', chip: 'bg-purple-600', icon: '🎭' },
  { id: 'gemini', name: 'Gemini', chip: 'bg-blue-600', icon: '💎' },
  { id: 'copilot', name: 'GitHub Copilot', chip: 'bg-gray-700', icon: '🚁' }
];

const ModelSelector = ({ selectedModel, onModelChange, className = '' }) => {
  return (
    <nav
      className={`sticky top-16 z-30 bg-white/85 dark:bg-gray-900/85 backdrop-blur border-b border-gray-200 dark:border-gray-800 ${className}`}
      aria-label="AI model selection"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            AI Models
          </span>

          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-2 min-w-max py-1">
              {AI_MODELS.map((m) => {
                const active = selectedModel === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => onModelChange(m.id)}
                    className={`
                      group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm 
                      border transition-all
                      ${active
                        ? `${m.chip} text-white border-transparent shadow-sm`
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}
                    `}
                    title={m.name}
                  >
                    <span className="text-base leading-none">{m.icon}</span>
                    <span className="whitespace-nowrap">{m.name}</span>
                    {active && <Check className="w-3.5 h-3.5 opacity-90" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModelSelector;
