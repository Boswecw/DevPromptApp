import React from 'react';
import { Code, Database, TestTube, Palette, Shield, Globe, Cpu, FileCode, Accessibility } from 'lucide-react';
import { CATEGORIES } from './constants';

// Icon mapping for categories
const categoryIcons = {
  component: Code,
  function: FileCode,
  class: Cpu,
  api: Globe,
  database: Database,
  test: TestTube,
  algorithm: Cpu,
  'ui-ux': Palette,
  accessibility: Accessibility,
  security: Shield
};

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="space-y-3">
      {CATEGORIES.map((category) => {
        const IconComponent = categoryIcons[category.id] || Code;
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
              isSelected
                ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 shadow-sm'
                : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${
                isSelected 
                  ? 'bg-purple-100 dark:bg-purple-800/50' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                <IconComponent className={`w-4 h-4 ${
                  isSelected 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${
                  isSelected 
                    ? 'text-purple-900 dark:text-purple-100' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {category.name}
                </div>
                <div className={`text-xs mt-1 ${
                  isSelected 
                    ? 'text-purple-700 dark:text-purple-300' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {category.description}
                </div>
              </div>
            </div>
            
            {/* Recommended models indicator */}
            {category.recommendedModels && category.recommendedModels.length > 0 && (
              <div className="mt-2 flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  isSelected 
                    ? 'bg-purple-400 dark:bg-purple-500' 
                    : 'bg-green-400 dark:bg-green-500'
                }`} />
                <span className={`text-xs ${
                  isSelected 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  AI optimized
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategorySelector;