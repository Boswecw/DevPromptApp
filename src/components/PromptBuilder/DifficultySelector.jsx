// src/components/PromptBuilder/DifficultySelector.jsx
import React from 'react';
import { Palette, Check } from 'lucide-react';

const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', description: 'Simple, well-commented code' },
  { id: 'intermediate', name: 'Intermediate', description: 'Moderate complexity with best practices' },
  { id: 'advanced', name: 'Advanced', description: 'Complex, optimized, production-ready' }
];

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Difficulty Level
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DIFFICULTY_LEVELS.map(difficulty => (
          <button
            key={difficulty.id}
            onClick={() => onDifficultyChange(difficulty.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left transform hover:scale-105 ${
              selectedDifficulty === difficulty.id
                ? 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600 shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <div className="font-medium">{difficulty.name}</div>
            <div className="text-xs opacity-75">{difficulty.description}</div>
            {selectedDifficulty === difficulty.id && (
              <div className="flex items-center gap-1 mt-2">
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

export default DifficultySelector;