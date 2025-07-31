// src/components/PromptBuilder/FeatureTagsSelector.jsx
import React from 'react';
import { Shield } from 'lucide-react';

const FEATURE_TAGS = [
  'TypeSafe', 'Async', 'Error Handling', 'Validation', 'Testing', 
  'Performance', 'Security', 'Documentation', 'Responsive', 'Accessible',
  'WCAG 2.1', 'Screen Reader', 'Keyboard Nav', 'ARIA', 'Color Contrast'
];

const FeatureTagsSelector = ({ selectedTags, onTagToggle }) => {
  const isAccessibilityTag = (tag) => {
    return tag.includes('WCAG') || tag.includes('ARIA') || 
           tag.includes('Screen Reader') || tag.includes('Keyboard') || 
           tag.includes('Color Contrast');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Feature Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {FEATURE_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 transform hover:scale-105 ${
              selectedTags.includes(tag)
                ? (isAccessibilityTag(tag)
                    ? 'bg-green-600 dark:bg-green-600 text-white border-green-600 dark:border-green-600'
                    : 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600')
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureTagsSelector;