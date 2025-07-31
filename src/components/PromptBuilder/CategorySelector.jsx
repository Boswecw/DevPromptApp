// src/components/PromptBuilder/CategorySelector.jsx
import React from 'react';
import { Layers, Check } from 'lucide-react';

const CATEGORIES = [
  { id: 'component', name: 'Component', icon: '🧩' },
  { id: 'function', name: 'Function', icon: '⚡' },
  { id: 'class', name: 'Class', icon: '🏗️' },
  { id: 'api', name: 'API', icon: '🌐' },
  { id: 'database', name: 'Database', icon: '🗄️' },
  { id: 'test', name: 'Test', icon: '🧪' },
  { id: 'algorithm', name: 'Algorithm', icon: '🔢' },
  { id: 'ui', name: 'UI/UX', icon: '🎨' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿' }
];

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Category
      </h2>
      <div className="space-y-2">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 border-2 transform hover:scale-105 ${
              selectedCategory === category.id
                ? (category.id === 'accessibility' 
                    ? 'bg-green-600 dark:bg-green-600 text-white border-green-600 dark:border-green-600 shadow-lg' 
                    : 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600 shadow-lg')
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
            {category.id === 'accessibility' && (
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                WCAG 2.1
              </span>
            )}
            {selectedCategory === category.id && (
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

export default CategorySelector;