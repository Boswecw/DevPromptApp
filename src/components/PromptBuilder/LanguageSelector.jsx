// src/components/PromptBuilder/LanguageSelector.jsx
import React from 'react';
import { Code } from 'lucide-react';

const PROGRAMMING_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨', extension: '.js' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', extension: '.ts' },
  { id: 'python', name: 'Python', icon: '🐍', extension: '.py' },
  { id: 'java', name: 'Java', icon: '☕', extension: '.java' },
  { id: 'csharp', name: 'C#', icon: '🔶', extension: '.cs' },
  { id: 'cpp', name: 'C++', icon: '⚡', extension: '.cpp' },
  { id: 'rust', name: 'Rust', icon: '🦀', extension: '.rs' },
  { id: 'go', name: 'Go', icon: '🐹', extension: '.go' },
  { id: 'php', name: 'PHP', icon: '🐘', extension: '.php' },
  { id: 'ruby', name: 'Ruby', icon: '💎', extension: '.rb' },
  { id: 'html', name: 'HTML', icon: '🌐', extension: '.html' },      // ✅ Added
  { id: 'css', name: 'CSS', icon: '🎨', extension: '.css' }          // ✅ Added
];

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Language
      </h2>
      <div className="grid grid-cols-1 gap-2">
        {PROGRAMMING_LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => onLanguageChange(lang.id)}
            className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              selectedLanguage === lang.id
                ? 'bg-purple-600 dark:bg-purple-600 text-white shadow-md'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
            }`}
          >
            <span className="mr-2">{lang.icon}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
