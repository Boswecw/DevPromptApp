// src/components/PromptBuilder/CustomPromptBuilder.jsx - Complete with wired buttons
import React, { useState, useEffect, useCallback } from "react";
import { 
  Code, 
  Save, 
  ArrowLeft, 
  Copy, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  Trash2,
  Download,
  History
} from "lucide-react";

// Hooks
import { useThemeContext } from "../../hooks/useThemeContext";
import { useArrayStorage } from "../../hooks/useStorage";

// Shared components
import { HelpModal, ThemeToggle } from "../index";

// PromptBuilder components
import ModelSelector from "./ModelSelector";
import SavedPrompts from "./SavedPrompts";
import { AI_MODELS } from "./constants";

const CustomPromptBuilder = ({ onSwitchMode }) => {
  // Theme context
  useThemeContext();

  // Core state
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [showHelp, setShowHelp] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  
  // UI feedback state
  const [notification, setNotification] = useState(null);
  const [isClearing, setIsClearing] = useState(false);

  // Storage
  const {
    value: savedPrompts = [],
    addItem,
    limitSize,
    clearAll,
    removeItem,
  } = useArrayStorage("saved-prompts", []);

  // Show notification helper
  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), duration);
  }, []);

  // Copy to clipboard function
  const copyToClipboard = useCallback(async (text, label = "Prompt") => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification(`${label} copied to clipboard!`, 'success');
    } catch (err) {
      console.error('Failed to copy:', err);
      showNotification('Failed to copy to clipboard', 'error');
    }
  }, [showNotification]);

  // Save current prompt
  const saveCurrentPrompt = useCallback(() => {
    if (!customPrompt.trim()) {
      showNotification('Cannot save empty prompt', 'error');
      return;
    }

    const newPrompt = {
      id: Date.now(),
      type: 'custom',
      model: selectedModel,
      prompt: customPrompt.trim(),
      title: customPrompt.slice(0, 50) + (customPrompt.length > 50 ? '...' : ''),
      createdAt: new Date().toISOString(),
    };

    const result = addItem(newPrompt);
    if (result?.success) {
      limitSize(50); // Increase limit for custom prompts
      showNotification('Prompt saved successfully!', 'success');
    } else {
      showNotification('Failed to save prompt', 'error');
    }
  }, [customPrompt, selectedModel, addItem, limitSize, showNotification]);

  // Copy current prompt
  const copyCurrentPrompt = useCallback(() => {
    if (!customPrompt.trim()) {
      showNotification('No prompt to copy', 'error');
      return;
    }

    const modelName = AI_MODELS.find(m => m.id === selectedModel)?.name || selectedModel;
    copyToClipboard(customPrompt, `${modelName} prompt`);
  }, [customPrompt, selectedModel, copyToClipboard, showNotification]);

  // Clear current prompt
  const clearCurrentPrompt = useCallback(() => {
    if (!customPrompt.trim()) return;
    
    setIsClearing(true);
    setTimeout(() => {
      setCustomPrompt("");
      setIsClearing(false);
      showNotification('Prompt cleared', 'success');
    }, 100);
  }, [customPrompt, showNotification]);

  // Load saved prompt
  const loadSavedPrompt = useCallback((prompt) => {
    setCustomPrompt(prompt.prompt);
    setSelectedModel(prompt.model || 'chatgpt');
    setShowHistory(false);
    showNotification('Prompt loaded successfully!', 'success');
  }, [showNotification]);

  // Delete saved prompt
  const deleteSavedPrompt = useCallback((promptId) => {
    removeItem(promptId);
    showNotification('Prompt deleted', 'success');
  }, [removeItem, showNotification]);

  // Export prompts
  const exportPrompts = useCallback(() => {
    if (savedPrompts.length === 0) {
      showNotification('No prompts to export', 'error');
      return;
    }

    const exportData = {
      exported: new Date().toISOString(),
      prompts: savedPrompts,
      count: savedPrompts.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devprompt-custom-prompts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Exported ${savedPrompts.length} prompts`, 'success');
  }, [savedPrompts, showNotification]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveCurrentPrompt();
            break;
          case 'Enter':
            e.preventDefault();
            copyCurrentPrompt();
            break;
          case 'Backspace':
            if (e.shiftKey) {
              e.preventDefault();
              clearCurrentPrompt();
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveCurrentPrompt, copyCurrentPrompt, clearCurrentPrompt]);

  // Persist last-used mode
  useEffect(() => {
    localStorage.setItem("devprompt-last-mode", "custom");
  }, []);

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
                Custom Prompt Builder
              </h1>

              {/* Switch Mode Button */}
              <button
                onClick={() => onSwitchMode?.('guided')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Switch to Guided
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Export Button */}
              {savedPrompts.length > 0 && (
                <button
                  onClick={exportPrompts}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  title="Export all prompts"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              )}

              {/* History Button */}
              {savedPrompts.length > 0 && (
                <button
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  title="View saved prompts"
                >
                  <History className="w-4 h-4" />
                  History ({savedPrompts.length})
                </button>
              )}

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Model Selector Bar */}
      <div className="sticky top-16 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          
          {/* Left: Prompt Editor */}
          <div className="space-y-6">
            
            {/* Prompt Input Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Write Your Custom Prompt
                </h2>
                
                <div className="flex items-center gap-2">
                  {/* Show/Hide Preview Toggle */}
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title={showPreview ? 'Hide Preview' : 'Show Preview'}
                  >
                    {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                  {/* Clear Button */}
                  <button
                    onClick={clearCurrentPrompt}
                    disabled={!customPrompt.trim() || isClearing}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Clear prompt (Ctrl+Shift+Backspace)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Save Button */}
                  <button
                    onClick={saveCurrentPrompt}
                    disabled={!customPrompt.trim()}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Save prompt (Ctrl+S)"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={copyCurrentPrompt}
                    disabled={!customPrompt.trim()}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Copy prompt (Ctrl+Enter)"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>

              {/* Prompt Textarea */}
              <div className="p-4">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={`Write your custom prompt for ${AI_MODELS.find(m => m.id === selectedModel)?.name || selectedModel}...

Examples:
• Create a React component that...
• Write a Python function to...
• Design an API endpoint that...
• Build a responsive navigation menu...

Tip: Be specific about requirements, constraints, and desired output format.`}
                  className="w-full h-64 p-4 border border-gray-200 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  spellCheck="false"
                />
                
                {/* Character Count */}
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    {customPrompt.length} characters
                    {customPrompt.length > 1000 && (
                      <span className="text-orange-500 ml-2">
                        • Long prompt (consider breaking into sections)
                      </span>
                    )}
                  </span>
                  <span>
                    Ctrl+S to save • Ctrl+Enter to copy
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            {showPreview && customPrompt.trim() && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Preview for {AI_MODELS.find(m => m.id === selectedModel)?.name}
                  </h3>
                </div>
                <div className="p-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-600">
                    {customPrompt}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tips & Info */}
          <div className="space-y-4">
            
            {/* Model Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Current Model: {AI_MODELS.find(m => m.id === selectedModel)?.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {AI_MODELS.find(m => m.id === selectedModel)?.description}
              </p>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                💡 Switch models above to see how prompts differ
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                ✨ Prompt Writing Tips
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>• <strong>Be specific</strong> about requirements</div>
                <div>• <strong>Mention the tech stack</strong> you're using</div>
                <div>• <strong>Ask for explanations</strong> when learning</div>
                <div>• <strong>Request error handling</strong> for production code</div>
                <div>• <strong>Specify output format</strong> (comments, tests, etc.)</div>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                ⌨️ Keyboard Shortcuts
              </h3>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Save prompt</span>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+S</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Copy prompt</span>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Enter</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Clear prompt</span>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Shift+⌫</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
            {notification.message}
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Saved Custom Prompts ({savedPrompts.length})
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {savedPrompts.length > 0 ? (
                <div className="space-y-4">
                  {savedPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {prompt.title || `Custom Prompt ${prompt.id}`}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {AI_MODELS.find(m => m.id === prompt.model)?.name} • {new Date(prompt.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => loadSavedPrompt(prompt)}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => copyToClipboard(prompt.prompt, 'Saved prompt')}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            Copy
                          </button>
                          <button
                            onClick={() => deleteSavedPrompt(prompt.id)}
                            className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded p-2 max-h-20 overflow-y-auto">
                        {prompt.prompt.slice(0, 200)}
                        {prompt.prompt.length > 200 && '...'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No saved prompts yet. Create and save your first custom prompt!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default CustomPromptBuilder;