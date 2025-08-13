import React, { useState, useEffect, useCallback } from "react";
import { Code, Save, ArrowLeft } from "lucide-react";
import { useArrayStorage } from "../../hooks/useStorage";
import PromptPreview from "./PromptPreview";
import SavedPrompts from "./SavedPrompts";
import { AI_MODELS } from "./constants";

const CustomPromptBuilder = ({ onSwitchMode }) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("chatgpt");

  const { value: savedPrompts, addItem, limitSize } = useArrayStorage("saved-prompts", []);

  const savePrompt = useCallback(() => {
    if (!customPrompt.trim()) return;
    const newPrompt = {
      id: Date.now(),
      model: selectedModel,
      prompt: customPrompt,
      createdAt: new Date().toISOString(),
    };
    addItem(newPrompt);
    limitSize(10);
    setCustomPrompt("");
  }, [customPrompt, selectedModel, addItem, limitSize]);

  useEffect(() => {
    localStorage.setItem("devprompt-last-mode", "custom");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => onSwitchMode("standard")}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Code className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Custom Prompt Builder</h1>
      </div>

      <textarea
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="Write your custom prompt here..."
        className="w-full h-32 p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
      />

      <div className="flex gap-2 mb-6">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="border p-2 rounded"
        >
          {AI_MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <button
          onClick={savePrompt}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          <Save className="w-4 h-4" /> Save Prompt
        </button>
      </div>

      {customPrompt && (
        <PromptPreview
          generatedPrompt={customPrompt}
          selectedModel={selectedModel}
          onCopyPrompt={() => navigator.clipboard.writeText(customPrompt)}
          showPreview
        />
      )}

      {savedPrompts.length > 0 && (
        <SavedPrompts savedPrompts={savedPrompts} AI_MODELS={AI_MODELS} />
      )}
    </div>
  );
};

export default CustomPromptBuilder;
