// src/components/PromptBuilder/PromptPreview.jsx
import React from 'react';
import { Eye, EyeOff, Copy, Save } from 'lucide-react';

const PromptPreview = ({ 
  showPreview, 
  onTogglePreview, 
  generatedPrompt,
  onCopyPrompt,
  onSavePrompt 
}) => {
  if (!showPreview) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center">
          <button
            onClick={onTogglePreview}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Show Preview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Generated Prompt
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePreview}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Hide Preview"
          >
            <EyeOff className="w-4 h-4" />
          </button>
          <button
            onClick={onSavePrompt}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={onCopyPrompt}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 dark:bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 dark:hover:bg-purple-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap max-h-96 overflow-y-auto">
        {generatedPrompt}
      </div>
    </div>
  );
};

export default PromptPreview;