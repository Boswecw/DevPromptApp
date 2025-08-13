// src/components/PromptBuilder/DifficultySelector.jsx
import React from 'react';
import { Palette } from 'lucide-react';

export const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' }
];

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
      <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
      <span className="whitespace-nowrap">Difficulty</span>
      <select
        value={selectedDifficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="ml-1 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm px-2 py-1 focus:ring-purple-500 focus:border-purple-500"
      >
        {DIFFICULTY_LEVELS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DifficultySelector;
