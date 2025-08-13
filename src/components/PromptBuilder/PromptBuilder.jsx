import React, { useState, useEffect, useCallback } from "react";
import { Code, Copy, Save, Eye, EyeOff, Settings, Menu, X } from "lucide-react";
import { useArrayStorage } from "../../hooks/useStorage";
import { ThemeToggle } from "../index";

// Updated constants for the new design
const AI_MODELS = [
  { id: "chatgpt", name: "ChatGPT", active: true },
  { id: "claude", name: "Claude", active: false },
  { id: "gemini", name: "Gemini", active: false },
  { id: "copilot", name: "GitHub Copilot", active: false },
  { id: "custom", name: "Custom Builder", active: false, isCustom: true }
];

const FEATURE_TAGS = [
  "TypeSafe", "Error Handling", "Modern Patterns", "Responsive", 
  "Accessibility", "Performance", "Testing", "Documentation", 
  "Security", "SEO", "Mobile First", "Dark Mode"
];

const SIDEBAR_ITEMS = [
  { id: "component", name: "Component", icon: "</>" },
  { id: "function", name: "Function", icon: "ƒ" },
  { id: "class", name: "Class", icon: "🏷️" },
  { id: "api", name: "API", icon: "🔌" },
  { id: "database", name: "Database", icon: "🗄️" },
  { id: "test", name: "Test", icon: "🧪" },
  { id: "algorithm", name: "Algorithm", icon: "⚙️" },
  { id: "ui-ux", name: "UI/UX", icon: "</>" },
  { id: "accessibility", name: "Accessibility", icon: "♿" }
];

const TECH_STACKS = [
  {
    id: "none",
    name: "🔍 No Specific Stack",
    description: "Language-agnostic implementation"
  },
  {
    id: "chuck-power",
    name: "🔺 Chuck's Power Stack (2025-2026)",
    description: "The bleeding-edge full-stack with AI-first architecture",
    selected: true
  },
  {
    id: "mern",
    name: "🟨 MERN Stack",
    description: "MongoDB, Express, React, Node.js"
  },
  {
    id: "nextjs",
    name: "⚡ Next.js Full-Stack",
    description: "Next.js with integrated backend"
  },
  {
    id: "vue-nuxt",
    name: "💚 Vue + Nuxt",
    description: "Vue ecosystem with Nuxt framework"
  }
];

const PROGRAMMING_LANGUAGES = [
  "JavaScript", "TypeScript", "Python", "React"
];

const DIFFICULTY_LEVELS = [
  "Beginner", "Intermediate", "Advanced"
];

const PromptBuilder = ({ onSwitchMode }) => {
  // State management
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [selectedTags, setSelectedTags] = useState(["TypeSafe"]);
  const [selectedCategory, setSelectedCategory] = useState("component");
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Intermediate");
  const [selectedTechStack, setSelectedTechStack] = useState("chuck-power");
  const [customRequirements, setCustomRequirements] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);

  // Storage for saved prompts
  const {
    value: savedPrompts = [],
    addItem,
    limitSize,
  } = useArrayStorage("saved-prompts", []);

  // Generate the prompt based on current selections
  const generatePrompt = useCallback(() => {
    const category = SIDEBAR_ITEMS.find(item => item.id === selectedCategory);
    const techStack = TECH_STACKS.find(stack => stack.id === selectedTechStack);
    
    let prompt = `Create a ${selectedLanguage} ${category?.name.toLowerCase() || 'component'} with:\n`;
    prompt += `- ${selectedDifficulty} level functionality\n`;
    
    if (selectedTags.length > 0) {
      prompt += `- Features: ${selectedTags.map(tag => tag.toLowerCase()).join(', ')}\n`;
    }
    
    prompt += `- Modern ${selectedLanguage} ${category?.name.toLowerCase() || 'component'} patterns\n\n`;
    
    if (techStack && techStack.id !== 'none') {
      prompt += `Tech Stack: ${techStack.name}\n`;
      prompt += `${techStack.description}\n\n`;
    }
    
    prompt += `Deliver:\n`;
    prompt += `- Complete ${category?.name.toLowerCase() || 'component'} code\n`;
    prompt += `- Styling (CSS/styled-components)\n`;
    
    if (selectedCategory === 'component') {
      prompt += `- Props interface/type definitions\n`;
      prompt += `- Usage examples\n`;
    }
    
    if (selectedTags.includes('Accessibility')) {
      prompt += `- Accessibility considerations\n`;
    }
    
    if (customRequirements.trim()) {
      prompt += `\nCustom Requirements:\n${customRequirements}`;
    }
    
    return prompt;
  }, [selectedCategory, selectedLanguage, selectedDifficulty, selectedTags, selectedTechStack, customRequirements]);

  const generatedPrompt = generatePrompt();

  // Handle tag toggle
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Save prompt function
  const savePrompt = useCallback(() => {
    if (!generatedPrompt.trim()) return;
    const newPrompt = {
      id: Date.now(),
      model: selectedModel,
      prompt: generatedPrompt,
      createdAt: new Date().toISOString(),
    };
    const res = addItem(newPrompt);
    if (res?.success) limitSize(10);
  }, [generatedPrompt, selectedModel, addItem, limitSize]);

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">DevPrompt Generator</span>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  if (model.isCustom) {
                    onSwitchMode('custom');
                  } else {
                    setSelectedModel(model.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-2xl text-sm border transition-all ${
                  selectedModel === model.id && !model.isCustom
                    ? 'bg-green-500 border-green-500 text-black'
                    : model.isCustom
                    ? 'bg-purple-600 border-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Feature Tags Bar */}
      <div className="bg-gray-100 dark:bg-slate-950 border-b border-gray-200 dark:border-gray-700 px-5 py-2">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">Feature Tags:</span>
          {FEATURE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-xl text-xs border transition-all flex-shrink-0 ${
                selectedTags.includes(tag)
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-60 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 p-5 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 border transition-all text-left ${
                selectedCategory === item.id
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-600'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </aside>

        {/* Center Content */}
        <main className="flex-1 p-5 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {/* Prompt Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm">Language:</label>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded text-sm text-gray-900 dark:text-gray-100"
                >
                  {PROGRAMMING_LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm">Difficulty:</label>
                <select 
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded text-sm text-gray-900 dark:text-gray-100"
                >
                  {DIFFICULTY_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div className="ml-auto flex gap-2">
                <button 
                  onClick={savePrompt}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-all"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>

            {/* Main Prompt Output */}
            {showPrompt && (
              <div className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-700 rounded-lg p-5 min-h-48">
                <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {generatedPrompt}
                </pre>
              </div>
            )}

            {/* Custom Requirements Section */}
            <div className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Custom Requirements</div>
              <textarea 
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                placeholder="Add specific requirements, constraints, or additional details for your component here..."
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded p-3 text-sm resize-vertical min-h-20 focus:outline-none focus:border-purple-600 text-gray-900 dark:text-gray-100"
              />
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Ready
                </span>
                <span>{customRequirements.length} chars</span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-70 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-gray-700 p-5 overflow-y-auto">
          <div className="flex items-center gap-2 text-base font-semibold mb-4">
            <span>🏗️</span>
            <span>Tech Stack</span>
          </div>
          
          {TECH_STACKS.map((stack) => (
            <button
              key={stack.id}
              onClick={() => setSelectedTechStack(stack.id)}
              className={`w-full p-3 rounded-lg mb-3 border transition-all text-left ${
                selectedTechStack === stack.id
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-600'
              }`}
            >
              <div className="font-semibold text-sm mb-1">{stack.name}</div>
              <div className={`text-xs ${selectedTechStack === stack.id ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                {stack.description}
              </div>
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default PromptBuilder;