import React, { useState, useEffect, useCallback } from "react";
import { Code, Save, Settings, ArrowLeft } from "lucide-react";
import { useArrayStorage } from "../../hooks/useStorage";
import { HelpModal, ThemeToggle } from "../index";
import PromptPreview from "./PromptPreview";
import SavedPrompts from "./SavedPrompts";
import { AI_MODELS } from "./constants";

const CustomPromptBuilder = ({ onSwitchMode }) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [showHelp, setShowHelp] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header (same layout as Guided builder) */}
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

              {/* This mirrors the “Switch to Custom” button spot — but on Custom page it goes back */}
              <button
                onClick={() => onSwitchMode?.("standard")}
                className="ml-3 px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
                title="Switch to Guided Builder"
                type="button"
              >
                Back to Guided
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Help & Theme toggle, same as Guided header */}
              <button
                onClick={() => setShowHelp(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Help & Tips"
                type="button"
              >
                <Settings className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {AI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <button
            onClick={savePrompt}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm flex items-center gap-2"
            type="button"
          >
            <Save className="w-4 h-4" /> Save Prompt
          </button>
        </div>

        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          rows={10}
          placeholder="Write your custom prompt here…"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {customPrompt && (
          <PromptPreview
            showPreview
            generatedPrompt={customPrompt}
            selectedModel={selectedModel}
            onCopyPrompt={() => navigator.clipboard.writeText(customPrompt)}
            onSavePrompt={savePrompt}
            onTogglePreview={() => {}}
            aiModels={AI_MODELS}
          />
        )}

        {savedPrompts?.length > 0 && (
          <SavedPrompts
            savedPrompts={savedPrompts}
            onLoadPrompt={(p) => setCustomPrompt(p.prompt)}
            AI_MODELS={AI_MODELS}
          />
        )}
      </div>

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default CustomPromptBuilder;
