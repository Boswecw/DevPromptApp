// src/components/PromptBuilder/ModelSelector.jsx
import React from 'react';
import { Zap, Check } from 'lucide-react';

const AI_MODELS = [
  { id: 'chatgpt', name: 'ChatGPT', color: 'bg-green-600 hover:bg-green-700', darkColor: 'dark:bg-green-600 dark:hover:bg-green-700', icon: '🤖' },
  { id: 'claude', name: 'Claude', color: 'bg-purple-600 hover:bg-purple-700', darkColor: 'dark:bg-purple-600 dark:hover:bg-purple-700', icon: '🎭' },
  { id: 'gemini', name: 'Gemini', color: 'bg-blue-600 hover:bg-blue-700', darkColor: 'dark:bg-blue-600 dark:hover:bg-blue-700', icon: '💎' },
  { id: 'copilot', name: 'GitHub Copilot', color: 'bg-gray-700 hover:bg-gray-800', darkColor: 'dark:bg-gray-600 dark:hover:bg-gray-700', icon: '🚁' }
];

const ModelSelector = ({ selectedModel, onModelChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        AI Model
      </h2>
      <div className="space-y-2">
        {AI_MODELS.map(model => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 transform hover:scale-105 ${
              selectedModel === model.id
                ? 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600 shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <span className="mr-2">{model.icon}</span>
            {model.name}
            {selectedModel === model.id && (
              <div className="flex items-center gap-1 mt-1">
                <Check className="w-3 h-3" />
                <span className="text-xs font-medium">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;