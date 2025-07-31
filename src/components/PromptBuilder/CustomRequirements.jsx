// src/components/PromptBuilder/CustomRequirements.jsx
import React from 'react';
import { Keyboard } from 'lucide-react';

const CustomRequirements = ({ customRequirements, onRequirementsChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Keyboard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Custom Requirements
      </h2>
      <textarea
        value={customRequirements}
        onChange={(e) => onRequirementsChange(e.target.value)}
        placeholder="Add any specific requirements, constraints, or preferences..."
        className="w-full h-24 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
};

export default CustomRequirements;