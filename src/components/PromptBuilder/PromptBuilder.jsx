// src/components/PromptBuilder/PromptBuilder.jsx (UPDATED PAGE)
import React, { useState, useMemo, useCallback } from 'react';
import { 
  Code, Settings, Check, X, Copy, Save, History, Eye, EyeOff, Menu 
} from 'lucide-react';

// Hooks
import { useThemeContext } from '../../hooks/useThemeContext';
import { useArrayStorage } from '../../hooks/useStorage';

// Shared components
import { HelpModal, ThemeToggle, StorageErrorHandler } from '../index';

// Prompt Builder modules
import ModelSelector from './ModelSelector';
import LanguageSelector from './LanguageSelector';
import DifficultySelector from './DifficultySelector';
import CategorySelector from './CategorySelector';
import TechStackSelector from './TechStackSelector';
import FeatureTagsSelector from './FeatureTagsSelector';
import CustomRequirements from './CustomRequirements';
import SavedPrompts from './SavedPrompts';

// Logic & constants
import { generatePrompt } from './promptGenerator';
import {
  AI_MODELS,
  PROGRAMMING_LANGUAGES,
  CATEGORIES,
  DIFFICULTY_LEVELS,
  TECH_STACKS,
} from './constants';

const PromptBuilder = () => {
  // Theme (activates provider side effects like <html class="dark">)
  useThemeContext();

  // Core state
  const [selectedModel, setSelectedModel] = useState('chatgpt');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedCategory, setSelectedCategory] = useState('component');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [selectedTechStack, setSelectedTechStack] = useState('none');
  const [selectedTags, setSelectedTags] = useState(['TypeSafe', 'Error Handling']);
  const [customRequirements, setCustomRequirements] = useState('');

  // UI state
  const [showPrompt, setShowPrompt] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [notification, setNotification] = useState(null);

  // Storage
  const {
    value: savedPrompts,
    addItem: addPrompt,
    limitSize,
    isSupported: isStorageSupported,
    error: storageError,
    isCriticalError,
    retry: retryStorage,
    clearStorage,
  } = useArrayStorage('saved-prompts', []);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    const t = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(t);
  }, []);

  const toggleTag = useCallback((tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const generatedPrompt = useMemo(() => {
    return generatePrompt({
      selectedModel,
      selectedLanguage,
      selectedCategory,
      selectedDifficulty,
      selectedTechStack,
      selectedTags,
      customRequirements,
    });
  }, [
    selectedModel,
    selectedLanguage,
    selectedCategory,
    selectedDifficulty,
    selectedTechStack,
    selectedTags,
    customRequirements,
  ]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      showNotification('Prompt copied to clipboard!');
    } catch (err) {
      console.error(err);
      showNotification('Failed to copy prompt', 'error');
    }
  }, [generatedPrompt, showNotification]);

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
      createdAt: new Date().toISOString(),
    };

    const result = addPrompt(newPrompt);

    if (result.success) {
      limitSize(10);
      isStorageSupported
        ? showNotification('Prompt saved successfully!')
        : showNotification("Prompt saved to session (won't persist)", 'warning');
    } else {
      result.error?.includes('QuotaExceededError')
        ? showNotification('Storage full! Please clear some data.', 'error')
        : showNotification(`Failed to save: ${result.error}`, 'error');
    }
  }, [
    selectedModel,
    selectedLanguage,
    selectedCategory,
    selectedDifficulty,
    selectedTechStack,
    selectedTags,
    customRequirements,
    generatedPrompt,
    addPrompt,
    limitSize,
    isStorageSupported,
    showNotification,
  ]);

  const loadPrompt = useCallback(
    (p) => {
      setSelectedModel(p.model);
      setSelectedLanguage(p.language);
      setSelectedCategory(p.category);
      setSelectedDifficulty(p.difficulty);
      setSelectedTechStack(p.techStack);
      setSelectedTags(p.tags);
      setCustomRequirements(p.customRequirements || '');
      showNotification('Prompt loaded successfully!');
      setShowHistory(false);
      setShowMobileControls(false);
    },
    [showNotification]
  );

  const handleStorageRetry = useCallback(() => {
    const result = retryStorage();
    result.success
      ? showNotification('Storage reconnected successfully!')
      : showNotification(`Storage still unavailable: ${result.error}`, 'error');
  }, [retryStorage, showNotification]);

  const handleClearStorage = useCallback(() => {
    const result = clearStorage();
    result.success
      ? showNotification('Storage cleared successfully!')
      : showNotification(`Failed to clear storage: ${result.error}`, 'error');
  }, [clearStorage, showNotification]);

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
              <div className="bg-purple-600 p-2 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                DevPrompt Generator
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile drawer */}
              <button
                onClick={() => setShowMobileControls((v) => !v)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Toggle Controls"
                aria-label="Toggle Controls"
                aria-expanded={showMobileControls}
              >
                <Menu className="w-5 h-5" />
              </button>

              {!isStorageSupported && (
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded text-xs">
                  <span>⚠️</span>
                  <span>No Storage</span>
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

      {/* Slim model bar (sticky below header on mobile too) */}
      <div className="sticky top-16 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="lg:hidden">
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
          <div className="hidden lg:block">
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Responsive 3-column grid */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_minmax(640px,1fr)_minmax(0,260px)] items-start">
          {/* LEFT PANEL */}
          <aside
            className={`relative lg:static ${
              showMobileControls
                ? 'fixed inset-y-16 left-0 right-1/3 z-40 p-4 bg-white dark:bg-gray-800 shadow-lg'
                : 'hidden'
            } lg:block`}
          >
            <div className="space-y-4">
              <CategorySelector
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <FeatureTagsSelector selectedTags={selectedTags} onTagToggle={toggleTag} />
            </div>
          </aside>

          {/* CENTER */}
          <main className="min-w-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 lg:p-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-3">
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                  />
                  <DifficultySelector
                    selectedDifficulty={selectedDifficulty}
                    onDifficultyChange={setSelectedDifficulty}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPrompt((v) => !v)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title={showPrompt ? 'Hide Prompt' : 'Show Prompt'}
                    aria-label={showPrompt ? 'Hide Prompt' : 'Show Prompt'}
                  >
                    {showPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={savePrompt}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                </div>
              </div>

              {/* Prompt body */}
              <div className="p-4 lg:p-6 min-h-[220px]">
                {showPrompt ? (
                  <div
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap max-h-[60vh] overflow-y-auto"
                    aria-live="polite"
                  >
                    {generatedPrompt}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Prompt hidden. Use the eye icon to show it again.
                  </div>
                )}
              </div>

              {/* Footer status */}
              <div className="px-4 pb-4 lg:px-6 lg:pb-6">
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    <span>Ready</span>
                  </div>
                  <span>•</span>
                  <span>{generatedPrompt.length} chars</span>
                </div>
              </div>
            </div>

            {/* Saved items inline under prompt */}
            {savedPrompts && savedPrompts.length > 0 && (
              <div className="mt-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Saved Prompts ({savedPrompts.length})
                    </div>
                    <button
                      onClick={() => setShowHistory((v) => !v)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <History className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* RIGHT PANEL */}
          <aside
            className={`relative lg:static ${
              showMobileControls
                ? 'fixed inset-y-16 right-0 left-1/3 z-40 p-4 bg-white dark:bg-gray-800 shadow-lg'
                : 'hidden'
            } lg:block`}
          >
            <div className="space-y-4">
              <TechStackSelector
                selectedTechStack={selectedTechStack}
                onTechStackChange={setSelectedTechStack}
              />
              <CustomRequirements
                customRequirements={customRequirements}
                onRequirementsChange={setCustomRequirements}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile backdrop for drawers */}
      {showMobileControls && (
        <button
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          aria-label="Close controls overlay"
          onClick={() => setShowMobileControls(false)}
        />
      )}

      {/* History modal (reuses SavedPrompts) */}
      {showHistory && savedPrompts && savedPrompts.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Saved Prompts</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close saved prompts"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
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
      )}

      {/* Storage warning (non-critical) */}
      {storageError && !isCriticalError && (
        <div className="fixed bottom-4 left-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 max-w-sm z-40">
          <div className="flex items-center gap-3">
            <span className="text-orange-600 dark:text-orange-400">⚠️</span>
            <div className="flex-1">
              <h3 className="font-medium text-orange-800 dark:text-orange-200 text-sm">Storage Issue</h3>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Session-only mode</p>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
              notification.type === 'error'
                ? 'bg-red-600 text-white'
                : notification.type === 'warning'
                ? 'bg-yellow-600 text-white'
                : 'bg-green-600 text-white'
            }`}
          >
            {notification.type === 'error' ? '✖︎' : notification.type === 'warning' ? '⚠︎' : '✓'}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default PromptBuilder;
