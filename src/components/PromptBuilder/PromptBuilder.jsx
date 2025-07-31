// src/components/PromptBuilder/PromptBuilder.jsx - SIMPLIFIED WITH useStorage HOOK
import React, { useState, useMemo, useCallback } from 'react';
import { Code, Settings, Check, X } from 'lucide-react';

// Import hooks
import { useThemeContext } from '../../hooks/useThemeContext';
import { useArrayStorage } from '../../hooks/useStorage';

// Import components
import { HelpModal, ThemeToggle, StorageErrorHandler } from '../index';
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
  // Connect to theme context
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
  
  // Storage management with the custom hook
  const {
    value: savedPrompts,
    addItem: addPrompt,
    limitSize,
    isSupported: isStorageSupported,
    error: storageError,
    isCriticalError,
    retry: retryStorage,
    clearStorage
  } = useArrayStorage('saved-prompts', []);

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

  // Save current prompt with enhanced error handling
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

    // Add the new prompt
    const result = addPrompt(newPrompt);
    
    if (result.success) {
      // Limit to 10 most recent prompts
      limitSize(10);
      
      if (isStorageSupported) {
        showNotification('Prompt saved successfully!');
      } else {
        showNotification('Prompt saved to session (won\'t persist)', 'warning');
      }
    } else {
      if (result.error.includes('QuotaExceededError')) {
        showNotification('Storage full! Please clear some data.', 'error');
      } else {
        showNotification(`Failed to save: ${result.error}`, 'error');
      }
    }
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements, generatedPrompt, addPrompt, limitSize, isStorageSupported, showNotification]);

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

  // Storage error handlers
  const handleStorageRetry = useCallback(() => {
    const result = retryStorage();
    if (result.success) {
      showNotification('Storage reconnected successfully!');
    } else {
      showNotification(`Storage still unavailable: ${result.error}`, 'error');
    }
  }, [retryStorage, showNotification]);

  const handleClearStorage = useCallback(() => {
    const result = clearStorage();
    if (result.success) {
      showNotification('Storage cleared successfully!');
    } else {
      showNotification(`Failed to clear storage: ${result.error}`, 'error');
    }
  }, [clearStorage, showNotification]);

  // Show storage error handler for critical errors
  if (isCriticalError) {
    return (
      <StorageErrorHandler
        error={storageError}
        onRetry={handleStorageRetry}
        onClearStorage={handleClearStorage}
        storageKey="saved-prompts"
        isSupported={isStorageSupported}
      />
    );
  }

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
              {/* Storage status indicators */}
              {!isStorageSupported && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded text-xs">
                  <span>⚠️</span>
                  <span>No Storage</span>
                </div>
              )}
              {storageError && !isCriticalError && (
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded text-xs">
                  <span>🔥</span>
                  <span>Storage Issue</span>
                </div>
              )}
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

            {/* Show saved prompts only if we have any */}
            {savedPrompts && savedPrompts.length > 0 && (
              <SavedPrompts 
                savedPrompts={savedPrompts}
                onLoadPrompt={loadPrompt}
                AI_MODELS={AI_MODELS}
                PROGRAMMING_LANGUAGES={PROGRAMMING_LANGUAGES}
                CATEGORIES={CATEGORIES}
                DIFFICULTY_LEVELS={DIFFICULTY_LEVELS}
              />
            )}

            {/* Storage warning for non-critical errors */}
            {storageError && !isCriticalError && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="text-orange-600 dark:text-orange-400">⚠️</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-orange-800 dark:text-orange-200">
                      Storage Issue Detected
                    </h3>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      {storageError}. Your prompts are saved for this session but won't persist.
                    </p>
                  </div>
                  <button
                    onClick={handleStorageRetry}
                    className="px-3 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded text-sm hover:bg-orange-200 dark:hover:bg-orange-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
            notification.type === 'error' 
              ? 'bg-red-600 text-white' 
              : notification.type === 'warning'
              ? 'bg-yellow-600 text-white'
              : 'bg-green-600 text-white'
          }`}>
            {notification.type === 'error' ? (
              <X className="w-5 h-5" />
            ) : notification.type === 'warning' ? (
              <span className="text-sm">⚠️</span>
            ) : (
              <Check className="w-5 h-5" />
            )}
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