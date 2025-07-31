// src/components/PromptBuilder/PromptBuilder.jsx - REFACTORED DevPromptApp
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Code, Settings, Check, X } from 'lucide-react';

// Import theme context - FIXES THE MISSING THEME CONNECTION
// Note: Theme switching is handled automatically by Tailwind dark: classes
// The useTheme hook applies 'dark' class to HTML element, enabling dark: classes
import { useThemeContext } from '../../hooks/useThemeContext';

// Import components
import { HelpModal, ThemeToggle } from '../index';
import ModelSelector from './ModelSelector';
import LanguageSelector from './LanguageSelector';
import CategorySelector from './CategorySelector';
import DifficultySelector from './DifficultySelector';
import TechStackSelector from './TechStackSelector';
import FeatureTagsSelector from './FeatureTagsSelector';
import CustomRequirements from './CustomRequirements';
import PromptPreview from './PromptPreview';
import SavedPrompts from './SavedPrompts';

// Import prompt generation logic
import { generatePrompt } from './promptGenerator';
import { 
  AI_MODELS, 
  PROGRAMMING_LANGUAGES, 
  CATEGORIES, 
  DIFFICULTY_LEVELS, 
  TECH_STACKS 
} from './constants';

const PromptBuilder = () => {
  // FIXED: Connect to theme context to ensure theme system is initialized
  // Theme switching is handled automatically by Tailwind dark: classes
  useThemeContext();

  // Prompt builder state
  const [selectedModel, setSelectedModel] = useState('chatgpt');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedCategory, setSelectedCategory] = useState('component');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [selectedTechStack, setSelectedTechStack] = useState('none');
  const [selectedTags, setSelectedTags] = useState(['TypeSafe', 'Error Handling']);
  const [customRequirements, setCustomRequirements] = useState('');
  
  // UI state
  const [showPreview, setShowPreview] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [notification, setNotification] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);

  // Load saved prompts with error handling
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saved-prompts');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedPrompts(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load saved prompts:', error);
      setSavedPrompts([]);
    }
  }, []);

  // Save prompts to localStorage whenever savedPrompts changes
  useEffect(() => {
    try {
      localStorage.setItem('saved-prompts', JSON.stringify(savedPrompts));
    } catch (error) {
      console.error('Failed to save prompts:', error);
    }
  }, [savedPrompts]);

  // Show notification helper
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Toggle feature tags
  const toggleTag = useCallback((tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // Generate prompt using the extracted logic
  const generatedPrompt = useMemo(() => {
    return generatePrompt({
      selectedModel,
      selectedLanguage,
      selectedCategory,
      selectedDifficulty,
      selectedTechStack,
      selectedTags,
      customRequirements
    });
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      showNotification('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      showNotification('Failed to copy prompt', 'error');
    }
  }, [generatedPrompt, showNotification]);

  // Save current prompt
  const savePrompt = useCallback(() => {
    const newPrompt = {
      id: Date.now(),
      model: selectedModel,
      language: selectedLanguage,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      techStack: selectedTechStack,
      tags: selectedTags,
      customRequirements,
      prompt: generatedPrompt,
      createdAt: new Date().toISOString()
    };

    setSavedPrompts(prev => [newPrompt, ...prev.slice(0, 9)]); // Keep only 10 most recent
    showNotification('Prompt saved successfully!');
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements, generatedPrompt, showNotification]);

  // Load saved prompt
  const loadPrompt = useCallback((prompt) => {
    setSelectedModel(prompt.model);
    setSelectedLanguage(prompt.language);
    setSelectedCategory(prompt.category);
    setSelectedDifficulty(prompt.difficulty);
    setSelectedTechStack(prompt.techStack);
    setSelectedTags(prompt.tags);
    setCustomRequirements(prompt.customRequirements || '');
    showNotification('Prompt loaded successfully!');
  }, [showNotification]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 dark:bg-purple-600 p-2 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                DevPrompt Generator
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowHelp(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Help & Tips"
              >
                <Settings className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <ModelSelector 
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
            
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            
            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <DifficultySelector 
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
            />

            <TechStackSelector 
              selectedTechStack={selectedTechStack}
              onTechStackChange={setSelectedTechStack}
            />

            <FeatureTagsSelector 
              selectedTags={selectedTags}
              onTagToggle={toggleTag}
            />

            <CustomRequirements 
              customRequirements={customRequirements}
              onRequirementsChange={setCustomRequirements}
            />

            <PromptPreview 
              showPreview={showPreview}
              onTogglePreview={() => setShowPreview(!showPreview)}
              generatedPrompt={generatedPrompt}
              onCopyPrompt={copyToClipboard}
              onSavePrompt={savePrompt}
            />

            <SavedPrompts 
              savedPrompts={savedPrompts}
              onLoadPrompt={loadPrompt}
              AI_MODELS={AI_MODELS}
              PROGRAMMING_LANGUAGES={PROGRAMMING_LANGUAGES}
              CATEGORIES={CATEGORIES}
              DIFFICULTY_LEVELS={DIFFICULTY_LEVELS}
            />
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
            notification.type === 'error' 
              ? 'bg-red-600 text-white' 
              : 'bg-green-600 text-white'
          }`}>
            {notification.type === 'error' ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Help Modal */}
      <HelpModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
      />
    </div>
  );
};

export default PromptBuilder;