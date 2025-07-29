// src/DevPromptApp.jsx - Fixed imports and structure
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Copy, 
  Download, 
  Upload, 
  Star, 
  Heart,
  Settings,
  Code,
  Palette,
  Layers,
  Zap,
  Check,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  Keyboard
} from 'lucide-react';

// Fixed imports - use from components index
import { HelpModal, ThemeToggle } from './components';

// Programming languages configuration
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
  { id: 'ruby', name: 'Ruby', icon: '💎', extension: '.rb' }
];

// AI Models configuration
const AI_MODELS = [
  { id: 'chatgpt', name: 'ChatGPT', color: 'bg-green-600', icon: '🤖' },
  { id: 'claude', name: 'Claude', color: 'bg-purple-600', icon: '🎭' },
  { id: 'gemini', name: 'Gemini', color: 'bg-blue-600', icon: '💎' },
  { id: 'copilot', name: 'GitHub Copilot', color: 'bg-gray-700', icon: '🚁' }
];

// Prompt categories
const CATEGORIES = [
  { id: 'component', name: 'Component', icon: '🧩' },
  { id: 'function', name: 'Function', icon: '⚙️' },
  { id: 'class', name: 'Class', icon: '🏗️' },
  { id: 'api', name: 'API', icon: '🌐' },
  { id: 'database', name: 'Database', icon: '💾' },
  { id: 'test', name: 'Test', icon: '🧪' },
  { id: 'algorithm', name: 'Algorithm', icon: '📊' },
  { id: 'ui', name: 'UI/UX', icon: '🎨' }
];

// Difficulty levels
const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
  { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
  { id: 'advanced', name: 'Advanced', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' }
];

// Feature tags
const FEATURE_TAGS = [
  'TypeSafe', 'Async', 'Error Handling', 'Validation', 'Testing', 
  'Performance', 'Security', 'Documentation', 'Responsive', 'Accessible'
];

const DevPromptApp = () => {
  // Prompt builder state
  const [selectedModel, setSelectedModel] = useState('chatgpt');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedCategory, setSelectedCategory] = useState('component');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
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
      console.warn('Failed to load saved prompts:', error);
      setSavedPrompts([]);
    }
  }, []);

  // Save prompts to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('saved-prompts', JSON.stringify(savedPrompts));
    } catch (error) {
      console.warn('Failed to save prompts:', error);
    }
  }, [savedPrompts]);

  // Show notification
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Generate prompt based on current selections
  const generatedPrompt = useMemo(() => {
    const language = PROGRAMMING_LANGUAGES.find(l => l.id === selectedLanguage);
    const category = CATEGORIES.find(c => c.id === selectedCategory);
    const difficulty = DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty);

    if (!language || !category || !difficulty) {
      return 'Please select language, category, and difficulty level.';
    }

    const basePrompts = {
      chatgpt: {
        component: `Create a ${language.name} ${category.name.toLowerCase()} with the following requirements:
- ${difficulty.name} level implementation
- Include proper ${selectedTags.join(', ').toLowerCase()}
- Follow ${language.name} best practices and conventions
- Add comprehensive comments and documentation
${customRequirements ? `- ${customRequirements}` : ''}

Please provide:
1. Complete, working code
2. Usage examples
3. Brief explanation of key features
4. Any necessary dependencies or setup instructions`,

        function: `Write a ${language.name} function that:
- Implements ${difficulty.name} level logic
- Includes ${selectedTags.join(', ').toLowerCase()}
- Follows ${language.name} coding standards
${customRequirements ? `- ${customRequirements}` : ''}

Requirements:
- Well-documented with JSDoc/docstrings
- Include error handling
- Provide usage examples
- Optimize for readability and performance`,

        class: `Design a ${language.name} class with:
- ${difficulty.name} level architecture
- Incorporates ${selectedTags.join(', ').toLowerCase()}
- Follows OOP principles for ${language.name}
${customRequirements ? `- ${customRequirements}` : ''}

Include:
- Constructor with proper parameter validation
- Public and private methods
- Properties with appropriate access modifiers
- Documentation for all public members
- Usage example with instantiation`,

        api: `Create a ${language.name} API ${category.name.toLowerCase()} featuring:
- ${difficulty.name} level implementation
- Includes ${selectedTags.join(', ').toLowerCase()}
- RESTful design principles
${customRequirements ? `- ${customRequirements}` : ''}

Provide:
- Complete endpoint implementation
- Request/response schemas
- Error handling middleware
- Authentication/authorization if needed
- API documentation`,

        database: `Build a ${language.name} database integration that:
- ${difficulty.name} level complexity
- Implements ${selectedTags.join(', ').toLowerCase()}
- Uses modern ${language.name} database libraries
${customRequirements ? `- ${customRequirements}` : ''}

Include:
- Connection management
- Query builders or ORM usage
- Migration scripts
- Error handling and logging
- Performance optimizations`,

        test: `Generate ${language.name} test suite with:
- ${difficulty.name} level test coverage
- Incorporates ${selectedTags.join(', ').toLowerCase()}
- Uses popular ${language.name} testing frameworks
${customRequirements ? `- ${customRequirements}` : ''}

Provide:
- Unit tests with multiple scenarios
- Integration tests if applicable
- Mock data and fixtures
- Test utilities and helpers
- Coverage configuration`,

        algorithm: `Implement a ${language.name} algorithm that:
- ${difficulty.name} complexity level
- Optimized for ${selectedTags.join(', ').toLowerCase()}
- Follows ${language.name} performance best practices
${customRequirements ? `- ${customRequirements}` : ''}

Include:
- Time and space complexity analysis
- Multiple solution approaches
- Edge case handling
- Performance benchmarks
- Clear step-by-step comments`,

        ui: `Create a ${language.name} UI component with:
- ${difficulty.name} level functionality
- Features ${selectedTags.join(', ').toLowerCase()}
- Modern ${language.name} UI patterns
${customRequirements ? `- ${customRequirements}` : ''}

Deliver:
- Complete component code
- Styling (CSS/styled-components)
- Props interface/type definitions
- Usage examples
- Accessibility considerations`
      }
    };

    // Use the same structure for other AI models with slight variations
    const variations = {
      claude: (prompt) => prompt.replace('Please provide:', 'I need:').replace('Requirements:', 'Specifications:'),
      gemini: (prompt) => prompt.replace('Create a', 'Generate a').replace('Build a', 'Construct a'),
      copilot: (prompt) => `// ${language.name} ${category.name}\n${prompt}`
    };

    const basePrompt = basePrompts.chatgpt[selectedCategory] || basePrompts.chatgpt.component;
    
    if (selectedModel === 'chatgpt') {
      return basePrompt;
    } else if (variations[selectedModel]) {
      return variations[selectedModel](basePrompt);
    }
    
    return basePrompt;
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTags, customRequirements]);

  // Copy to clipboard with better error handling
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      const modelName = AI_MODELS.find(model => model.id === selectedModel)?.name || 'AI';
      showNotification(`Copied ${modelName} prompt to clipboard!`);
    } catch (error) {
      console.warn('Clipboard API failed:', error);
      showNotification('Failed to copy to clipboard', 'error');
    }
  }, [generatedPrompt, selectedModel, showNotification]);

  // Save current prompt
  const savePrompt = useCallback(() => {
    const newPrompt = {
      id: Date.now(),
      model: selectedModel,
      language: selectedLanguage,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      tags: [...selectedTags],
      customRequirements,
      prompt: generatedPrompt,
      createdAt: new Date().toISOString()
    };
    
    setSavedPrompts(prev => [newPrompt, ...prev.slice(0, 19)]); // Keep last 20
    showNotification('Prompt saved successfully!');
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTags, customRequirements, generatedPrompt, showNotification]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if user is typing in input/textarea
      if (e.target.matches('input, textarea, [contenteditable]')) {
        return;
      }

      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        copyToClipboard();
      } else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        savePrompt();
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowHelp(true);
      } else if (e.key === 'Escape' && showHelp) {
        e.preventDefault();
        setShowHelp(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [copyToClipboard, savePrompt, showHelp]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Prompt Builder
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Code className="w-4 h-4" />
              <span>Multi-Language Code Generation</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Help (?)"
            >
              <Keyboard className="w-5 h-5" />
            </button>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Language & Category */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Programming Language */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Programming Language
              </h3>
              <div className="space-y-2">
                {PROGRAMMING_LANGUAGES.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedLanguage === lang.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{lang.icon}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Code Category
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Controls - AI Model & Difficulty */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Model:</span>
                  <div className="flex gap-2">
                    {AI_MODELS.map(model => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedModel === model.id
                            ? `${model.color} text-white`
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="mr-1">{model.icon}</span>
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</span>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {DIFFICULTY_LEVELS.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Prompt Preview/Editor */}
          <div className="flex-1 p-6">
            <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Generated Prompt Preview
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded">
                      {PROGRAMMING_LANGUAGES.find(l => l.id === selectedLanguage)?.name}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded">
                      {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title={showPreview ? 'Hide preview' : 'Show preview'}
                  >
                    {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={savePrompt}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    title="Save prompt (Ctrl+S)"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    title="Copy to clipboard (Ctrl+C)"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>
              
              {showPreview && (
                <div className="flex-1 p-4 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
              )}
              
              {!showPreview && (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preview hidden. Click the eye icon to show the generated prompt.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Tags & Custom Requirements */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Feature Tags */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Feature Tags
              </h3>
              <div className="space-y-2">
                {FEATURE_TAGS.map(tag => (
                  <label
                    key={tag}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags(prev => [...prev, tag]);
                        } else {
                          setSelectedTags(prev => prev.filter(t => t !== tag));
                        }
                      }}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Requirements */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Custom Requirements
              </h3>
              <textarea
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                placeholder="Add specific requirements, constraints, or additional features..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Saved Prompts */}
            {savedPrompts.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Recent Saves ({savedPrompts.length})
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {savedPrompts.slice(0, 5).map(prompt => (
                    <div
                      key={prompt.id}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => {
                        setSelectedModel(prompt.model);
                        setSelectedLanguage(prompt.language);
                        setSelectedCategory(prompt.category);
                        setSelectedDifficulty(prompt.difficulty);
                        setSelectedTags(prompt.tags);
                        setCustomRequirements(prompt.customRequirements);
                        showNotification('Prompt loaded!');
                      }}
                      title="Click to load this prompt"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-0.5 rounded">
                          {PROGRAMMING_LANGUAGES.find(l => l.id === prompt.language)?.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(prompt.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 truncate">
                        {CATEGORIES.find(c => c.id === prompt.category)?.name} - {prompt.difficulty}
                      </p>
                    </div>
                  ))}
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

export default DevPromptApp;