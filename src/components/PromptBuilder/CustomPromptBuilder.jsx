import React, { useState, useEffect, useCallback } from "react";
import { Code, Save, Copy, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useArrayStorage } from "../../hooks/useStorage";
import { ThemeToggle } from "../index";

const AI_MODELS = [
  { id: "chatgpt", name: "ChatGPT", active: true },
  { id: "claude", name: "Claude", active: false },
  { id: "gemini", name: "Gemini", active: false },
  { id: "copilot", name: "GitHub Copilot", active: false },
  { id: "custom", name: "Custom Builder", active: false, isCustom: true }
];

const CustomPromptBuilder = ({ onSwitchMode }) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("chatgpt"); // Back to chatgpt as default for other model functionality
  const [showPrompt, setShowPrompt] = useState(true);

  const {
    value: savedPrompts = [],
    addItem,
    limitSize,
  } = useArrayStorage("saved-prompts", []);

  const savePrompt = useCallback(() => {
    if (!customPrompt.trim()) return;
    const newPrompt = {
      id: Date.now(),
      model: selectedModel,
      prompt: customPrompt,
      createdAt: new Date().toISOString(),
    };
    const res = addItem(newPrompt);
    if (res?.success) limitSize(10);
  }, [customPrompt, selectedModel, addItem, limitSize]);

  // Persist last-used mode as "custom"
  useEffect(() => {
    localStorage.setItem("devprompt-last-mode", "custom");
  }, []);

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(customPrompt);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">DevPrompt Generator</span>
            
            {/* Back to Guided button */}
            <button
              onClick={() => onSwitchMode('guided')}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 border border-gray-300 dark:border-gray-600 rounded text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Guided
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  if (!model.isCustom) {
                    setSelectedModel(model.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-2xl text-sm border transition-all ${
                  model.isCustom
                    ? 'bg-purple-600 border-purple-600 text-white' // Always active for custom
                    : selectedModel === model.id
                    ? 'bg-green-500 border-green-500 text-black'
                    : 'bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Custom Builder Mode Indicator */}
      <div className="bg-gray-100 dark:bg-slate-950 border-b border-gray-200 dark:border-gray-700 px-5 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">Mode:</span>
          <span className="px-3 py-1 rounded-xl text-xs bg-purple-600 border-purple-600 text-white">
            Custom Builder
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Write your own prompts from scratch
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Target Model:</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded text-sm">
                {AI_MODELS.find(m => m.id === selectedModel)?.name}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowPrompt(!showPrompt)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 border border-gray-300 dark:border-gray-600 rounded text-sm transition-all"
                title={showPrompt ? 'Hide Prompt' : 'Show Prompt'}
              >
                {showPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPrompt ? 'Hide' : 'Show'}
              </button>
              <button 
                onClick={savePrompt}
                disabled={!customPrompt.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded text-sm transition-all"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button 
                onClick={copyToClipboard}
                disabled={!customPrompt.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded text-sm transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>

          {/* Custom Prompt Input */}
          <div className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">
              Custom Prompt Editor
            </div>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Write your custom AI prompt here...

Example:
Create a React component that displays a user profile card with the following features:
- Avatar image with fallback to initials
- User name, title, and bio
- Contact information (email, phone)
- Social media links
- Responsive design
- Dark mode support
- TypeScript interfaces
- Accessibility considerations"
              className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded p-4 text-sm resize-vertical min-h-96 focus:outline-none focus:border-purple-600 font-mono text-gray-900 dark:text-gray-100"
            />
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Ready
              </span>
              <span>{customPrompt.length} chars</span>
            </div>
          </div>

          {/* Prompt Preview */}
          {showPrompt && customPrompt.trim() && (
            <div className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">
                Prompt Preview
              </div>
              <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded p-4">
                <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {customPrompt}
                </pre>
              </div>
            </div>
          )}

          {/* Saved Prompts Summary */}
          {savedPrompts && savedPrompts.length > 0 && (
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  Saved Prompts ({savedPrompts.length})
                </div>
                <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  View All →
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Last saved: {new Date(savedPrompts[savedPrompts.length - 1]?.createdAt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomPromptBuilder;