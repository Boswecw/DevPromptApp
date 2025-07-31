// src/components/PromptBuilder/SavedPrompts.jsx
import React from 'react';
import { Star } from 'lucide-react';

const SavedPrompts = ({ 
  savedPrompts, 
  onLoadPrompt,
  AI_MODELS,
  PROGRAMMING_LANGUAGES,
  CATEGORIES,
  DIFFICULTY_LEVELS 
}) => {
  if (savedPrompts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Saved Prompts ({savedPrompts.length})
      </h2>
      <div className="space-y-3">
        {savedPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">
                  {AI_MODELS.find(m => m.id === prompt.model)?.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {PROGRAMMING_LANGUAGES.find(l => l.id === prompt.language)?.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {CATEGORIES.find(c => c.id === prompt.category)?.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {DIFFICULTY_LEVELS.find(d => d.id === prompt.difficulty)?.name}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(prompt.createdAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => onLoadPrompt(prompt)}
              className="ml-4 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
              Load
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPrompts;