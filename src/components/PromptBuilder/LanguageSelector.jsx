// src/components/PromptBuilder/LanguageSelector.jsx
import React from 'react';
import { Code } from 'lucide-react';

export const PROGRAMMING_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'csharp', name: 'C#', icon: '🔶' },
  { id: 'cpp', name: 'C++', icon: '⚡' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'php', name: 'PHP', icon: '🐘' },
  { id: 'ruby', name: 'Ruby', icon: '💎' }
];

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
      <Code className="w-4 h-4 text-purple-600 dark:text-purple-400" />
      <span className="whitespace-nowrap">Language</span>
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="ml-1 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm px-2 py-1 focus:ring-purple-500 focus:border-purple-500"
      >
        {PROGRAMMING_LANGUAGES.map((l) => (
          <option key={l.id} value={l.id}>
            {l.icon} {l.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;
