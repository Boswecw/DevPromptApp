// src/DevPromptApp.jsx - COMPLETE VERSION: Tech Stacks + Accessibility Category
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
  Keyboard,
  Database,
  Shield
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
  { id: 'chatgpt', name: 'ChatGPT', color: 'bg-green-600 hover:bg-green-700', darkColor: 'dark:bg-green-600 dark:hover:bg-green-700', icon: '🤖' },
  { id: 'claude', name: 'Claude', color: 'bg-purple-600 hover:bg-purple-700', darkColor: 'dark:bg-purple-600 dark:hover:bg-purple-700', icon: '🎭' },
  { id: 'gemini', name: 'Gemini', color: 'bg-blue-600 hover:bg-blue-700', darkColor: 'dark:bg-blue-600 dark:hover:bg-blue-700', icon: '💎' },
  { id: 'copilot', name: 'GitHub Copilot', color: 'bg-gray-700 hover:bg-gray-800', darkColor: 'dark:bg-gray-600 dark:hover:bg-gray-700', icon: '🚁' }
];

// Prompt categories - WITH ACCESSIBILITY
const CATEGORIES = [
  { id: 'component', name: 'Component', icon: '🧩' },
  { id: 'function', name: 'Function', icon: '⚙️' },
  { id: 'class', name: 'Class', icon: '🏗️' },
  { id: 'api', name: 'API', icon: '🌐' },
  { id: 'database', name: 'Database', icon: '💾' },
  { id: 'test', name: 'Test', icon: '🧪' },
  { id: 'algorithm', name: 'Algorithm', icon: '📊' },
  { id: 'ui', name: 'UI/UX', icon: '🎨' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿' } // ADDED
];

// Difficulty levels
const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { id: 'advanced', name: 'Advanced', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
];

// Tech Stacks - PRESERVED YOUR ORIGINAL
const TECH_STACKS = [
  {
    id: 'none',
    name: 'No Stack (Language Only)',
    icon: '⚡',
    description: 'Focus on the selected language only',
    frontend: '',
    backend: '',
    deployment: ''
  },
  {
    id: 'sveltekit-fastapi',
    name: 'SvelteKit + FastAPI',
    icon: '🚀',
    description: 'Modern full-stack with Python backend',
    frontend: 'SvelteKit + TailwindCSS + Framer Motion',
    backend: 'FastAPI (Python) + optional LangChain/Ollama',
    deployment: 'Vercel/Cloudflare Workers + Render/Railway',
    edge: 'Optional Rust/WASM later'
  },
  {
    id: 'nextjs-nodejs',
    name: 'Next.js + Node.js',
    icon: '⚛️',
    description: 'React ecosystem with Node backend',
    frontend: 'Next.js + TailwindCSS + Framer Motion',
    backend: 'Node.js + Express/Fastify + Prisma',
    deployment: 'Vercel + PlanetScale/Railway'
  },
  {
    id: 'vue-laravel',
    name: 'Vue.js + Laravel',
    icon: '💚',
    description: 'Vue frontend with PHP backend',
    frontend: 'Vue.js + Nuxt + TailwindCSS',
    backend: 'Laravel (PHP) + Eloquent ORM',
    deployment: 'Netlify + Digital Ocean'
  },
  {
    id: 'react-django',
    name: 'React + Django',
    icon: '🎯',
    description: 'React SPA with Python backend',
    frontend: 'React + Vite + TailwindCSS',
    backend: 'Django (Python) + DRF + PostgreSQL',
    deployment: 'Netlify + Heroku/Railway'
  },
  {
    id: 'angular-dotnet',
    name: 'Angular + .NET',
    icon: '🔺',
    description: 'Enterprise Angular with .NET backend',
    frontend: 'Angular + Angular Material',
    backend: '.NET Core + Entity Framework',
    deployment: 'Azure Static Web Apps + Azure App Service'
  }
];

// Feature tags - WITH ACCESSIBILITY TAGS
const FEATURE_TAGS = [
  'TypeSafe', 'Async', 'Error Handling', 'Validation', 'Testing', 
  'Performance', 'Security', 'Documentation', 'Responsive', 'Accessible',
  'WCAG 2.1', 'Screen Reader', 'Keyboard Nav', 'ARIA', 'Color Contrast'
];

const DevPromptApp = () => {
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

  // Generate prompt based on current selections - WITH TECH STACKS + ACCESSIBILITY
  const generatedPrompt = useMemo(() => {
    const language = PROGRAMMING_LANGUAGES.find(l => l.id === selectedLanguage);
    const category = CATEGORIES.find(c => c.id === selectedCategory);
    const difficulty = DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty);
    const techStack = TECH_STACKS.find(t => t.id === selectedTechStack);

    if (!language || !category || !difficulty || !techStack) {
      return 'Please select language, category, difficulty level, and tech stack.';
    }

    // Build stack context for prompts
    const stackContext = techStack.id === 'none' ? '' : `
Tech Stack Context:
- Frontend: ${techStack.frontend}
- Backend: ${techStack.backend}
- Deployment: ${techStack.deployment}
${techStack.edge ? `- Edge Computing: ${techStack.edge}` : ''}
`;

    const basePrompts = {
      chatgpt: {
        component: `Create a ${language.name} ${category.name.toLowerCase()} with the following requirements:
- ${difficulty.name} level implementation
- Include proper ${selectedTags.join(', ').toLowerCase()}
- Follow ${language.name} best practices and conventions
- Add comprehensive comments and documentation
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Please provide:
1. Complete, working code
2. Usage examples
3. Brief explanation of key features
4. Any necessary dependencies or setup instructions
${techStack.id !== 'none' ? '5. Integration patterns for the selected tech stack' : ''}`,

        function: `Write a ${language.name} function that:
- Implements ${difficulty.name} level logic
- Includes ${selectedTags.join(', ').toLowerCase()}
- Follows ${language.name} coding standards
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Requirements:
- Well-documented with JSDoc/docstrings
- Include error handling
- Provide usage examples
- Optimize for readability and performance
${techStack.id !== 'none' ? `- Consider integration with ${techStack.name} architecture` : ''}`,

        class: `Design a ${language.name} class with:
- ${difficulty.name} level architecture
- Incorporates ${selectedTags.join(', ').toLowerCase()}
- Follows OOP principles for ${language.name}
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Include:
- Constructor with proper parameter validation
- Public and private methods
- Properties with appropriate access modifiers
- Documentation for all public members
- Usage example with instantiation
${techStack.id !== 'none' ? `- Integration patterns for ${techStack.name} stack` : ''}`,

        api: `Create a ${language.name} API ${category.name.toLowerCase()} featuring:
- ${difficulty.name} level implementation
- Includes ${selectedTags.join(', ').toLowerCase()}
- RESTful design principles
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Provide:
- Complete endpoint implementation
- Request/response schemas
- Error handling middleware
- Authentication/authorization if needed
- API documentation
${techStack.id !== 'none' ? `- Deployment configuration for ${techStack.deployment}` : ''}`,

        database: `Build a ${language.name} database integration that:
- ${difficulty.name} level complexity
- Implements ${selectedTags.join(', ').toLowerCase()}
- Uses modern ${language.name} database libraries
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Include:
- Connection management
- Query builders or ORM usage
- Migration scripts
- Error handling and logging
- Performance optimizations
${techStack.id !== 'none' ? `- Integration with ${techStack.backend} backend patterns` : ''}`,

        test: `Generate ${language.name} test suite with:
- ${difficulty.name} level test coverage
- Incorporates ${selectedTags.join(', ').toLowerCase()}
- Uses popular ${language.name} testing frameworks
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Provide:
- Unit tests with multiple scenarios
- Integration tests if applicable
- Mock data and fixtures
- Test utilities and helpers
- Coverage configuration
${techStack.id !== 'none' ? `- E2E testing setup for ${techStack.name} stack` : ''}`,

        algorithm: `Implement a ${language.name} algorithm that:
- ${difficulty.name} complexity level
- Optimized for ${selectedTags.join(', ').toLowerCase()}
- Follows ${language.name} performance best practices
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Include:
- Time and space complexity analysis
- Multiple solution approaches
- Edge case handling
- Performance benchmarks
- Clear step-by-step comments
${techStack.id !== 'none' ? `- Optimization considerations for ${techStack.name} environment` : ''}`,

        ui: `Create a ${language.name} UI component with:
- ${difficulty.name} level functionality
- Features ${selectedTags.join(', ').toLowerCase()}
- Modern ${language.name} UI patterns
${stackContext}${customRequirements ? `- ${customRequirements}` : ''}

Deliver:
- Complete component code
- Styling (CSS/styled-components)
- Props interface/type definitions
- Usage examples
- Accessibility considerations
${techStack.id !== 'none' ? `- Integration with ${techStack.frontend} patterns and animations` : ''}`,

        // NEW ACCESSIBILITY PROMPTS
        accessibility: `Create a fully accessible ${language.name} implementation with ${difficulty.name} level complexity that includes:

🛠️ **WCAG 2.1 AA Compliance:**
- Follow WCAG 2.1 guidelines, specifically Level AA requirements
- Ensure all interactive elements are accessible via keyboard and screen readers
- Implement proper focus management and visual focus indicators
- Include ${selectedTags.join(', ').toLowerCase()} where applicable

🌐 **Semantic HTML & Structure:**
- Use semantic HTML5 elements (header, nav, main, section, article, aside, footer)
- Implement proper heading hierarchy (h1-h6) with logical document outline
- Use appropriate HTML form elements with labels and fieldsets
- Include landmark roles where semantic elements aren't sufficient

🎨 **Visual & Color Accessibility:**
- Ensure minimum 4.5:1 color contrast for normal text (7:1 for ${difficulty.name === 'advanced' ? 'AAA level' : 'enhanced readability'})
- Ensure minimum 3:1 contrast for large text and UI components
- Don't rely solely on color to convey information
- Support high contrast mode and respect user color preferences

⌨️ **Keyboard Navigation:**
- Make all interactive elements keyboard accessible (Tab, Enter, Space, Arrow keys)
- Implement logical tab order with proper tabindex management
- Provide keyboard shortcuts for common actions
- Include skip links for main content and navigation
- Handle focus trapping in modals and overlays

🗣️ **Screen Reader Support:**
- Provide descriptive alt text for all images (decorative images should have alt="")
- Use ARIA labels, descriptions, and live regions appropriately
- Implement proper ARIA roles, states, and properties
- Announce dynamic content changes with aria-live regions
- Use aria-expanded, aria-selected, aria-checked for interactive states

🔧 **ARIA Implementation:**
- Use ARIA roles responsibly (don't override semantic meaning)
- Implement aria-labelledby and aria-describedby for complex relationships
- Use aria-hidden for decorative elements invisible to screen readers
- Implement proper ARIA for custom components (dropdowns, modals, tabs)

🧪 **Testing & Validation:**
- Include instructions for testing with axe-core or WAVE
- Provide screen reader testing guidance (NVDA, JAWS, VoiceOver)
- Include automated accessibility testing setup
- Test with keyboard-only navigation
- Validate HTML for semantic correctness

${stackContext}${customRequirements ? `\n📋 **Additional Requirements:**\n- ${customRequirements}` : ''}

**Deliverables:**
1. Complete accessible implementation with inline comments explaining accessibility features
2. Comprehensive accessibility testing checklist
3. Screen reader testing instructions
4. Keyboard navigation map
5. Color contrast verification
6. ARIA implementation documentation
7. Common accessibility pitfalls to avoid
8. Browser compatibility notes for assistive technologies
${techStack.id !== 'none' ? `9. Integration with ${techStack.name} accessibility patterns` : ''}

**Focus Areas:**
- Error handling and validation with accessible error messages
- Form accessibility with proper labels and error associations
- Dynamic content updates with ARIA live regions
- Progressive enhancement principles
- Mobile accessibility considerations
- Performance impact of accessibility features`
      }
    };

    // Enhanced AI model variations
    const variations = {
      claude: (prompt) =>
        prompt
          .replace('Please provide:', 'I need:')
          .replace('Requirements:', 'Make sure it includes:')
          .replace('Include:', 'Ensure you include:')
          .replace('Provide:', 'Deliver:')
          .replace('Deliverables:', 'Expected Output:'),

      gemini: (prompt) =>
        prompt
          .replace(/(Create|Build|Write|Design) a/gi, 'Think creatively and implement a')
          .replace('Implement a', 'Construct an innovative')
          .replace('🛠️', '🔧')
          .concat('\n\n💡 Focus on clean, scalable patterns and modern design principles.'),

      copilot: (prompt) =>
        `/*
GitHub Copilot Code Generation Request:
${language.name} ${category.name} - ${difficulty.name} Level
${techStack.id !== 'none' ? `Tech Stack: ${techStack.name}` : ''}

${prompt}
*/

// Start coding below 👇
// Copilot will help autocomplete as you type`
    };

    const basePrompt = basePrompts.chatgpt[selectedCategory] || basePrompts.chatgpt.component;
    
    const getModelPrompt = (modelId, base) =>
      variations[modelId]?.(base) ?? base;

    return getModelPrompt(selectedModel, basePrompt);
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements]);

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
      techStack: selectedTechStack,
      tags: [...selectedTags],
      customRequirements,
      prompt: generatedPrompt,
      createdAt: new Date().toISOString()
    };
    
    setSavedPrompts(prev => [newPrompt, ...prev.slice(0, 19)]); // Keep last 20
    showNotification('Prompt saved successfully!');
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements, generatedPrompt, showNotification]);

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
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Code className="w-4 h-4" />
              <span>Multi-Language Code Generation</span>
              {selectedCategory === 'accessibility' && (
                <>
                  <span className="mx-2">•</span>
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600 font-medium">Accessibility Focused</span>
                </>
              )}
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
                        ? (category.id === 'accessibility' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white')
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                    {category.id === 'accessibility' && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        WCAG 2.1
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Controls - AI Model, Difficulty & Tech Stack */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="space-y-4">
              {/* AI Model & Difficulty Row */}
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

              {/* Tech Stack Row */}
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tech Stack:</span>
                <select
                  value={selectedTechStack}
                  onChange={(e) => setSelectedTechStack(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {TECH_STACKS.map(stack => (
                    <option key={stack.id} value={stack.id}>
                      {stack.icon} {stack.name} - {stack.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tech Stack Info - Show details when selected */}
              {selectedTechStack !== 'none' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <div className="text-xs text-blue-800 dark:text-blue-300">
                    <strong>Stack Details:</strong>
                    {TECH_STACKS.find(s => s.id === selectedTechStack) && (
                      <div className="mt-1 space-y-1">
                        <div><strong>Frontend:</strong> {TECH_STACKS.find(s => s.id === selectedTechStack).frontend}</div>
                        <div><strong>Backend:</strong> {TECH_STACKS.find(s => s.id === selectedTechStack).backend}</div>
                        <div><strong>Deployment:</strong> {TECH_STACKS.find(s => s.id === selectedTechStack).deployment}</div>
                        {TECH_STACKS.find(s => s.id === selectedTechStack).edge && (
                          <div><strong>Edge:</strong> {TECH_STACKS.find(s => s.id === selectedTechStack).edge}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
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
                    <span className={`px-2 py-1 rounded ${
                      selectedCategory === 'accessibility' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                        : 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400'
                    }`}>
                      {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    </span>
                    {selectedTechStack !== 'none' && (
                      <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-400 rounded">
                        {TECH_STACKS.find(s => s.id === selectedTechStack)?.name.split(' + ')[0]}
                      </span>
                    )}
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
                {selectedCategory === 'accessibility' && (
                  <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                    A11y Focus
                  </span>
                )}
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
                    <span className={`text-sm ${
                      ['WCAG 2.1', 'Screen Reader', 'Keyboard Nav', 'ARIA', 'Color Contrast'].includes(tag)
                        ? 'text-green-700 dark:text-green-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {tag}
                      {['WCAG 2.1', 'Screen Reader', 'Keyboard Nav', 'ARIA', 'Color Contrast'].includes(tag) && (
                        <span className="ml-1">♿</span>
                      )}
                    </span>
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
                placeholder={selectedCategory === 'accessibility' 
                  ? "Add specific accessibility requirements (e.g., 'Support voice commands', 'Implement dark/light mode', 'Include focus indicators')..."
                  : "Add specific requirements, constraints, or additional features..."}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Accessibility Quick Tips - Shows only when accessibility category is selected */}
            {selectedCategory === 'accessibility' && (
              <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="text-sm font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center gap-2">
                  ♿ Accessibility Checklist
                </h4>
                <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
                  <li>✓ WCAG 2.1 AA compliance</li>
                  <li>✓ Semantic HTML structure</li>
                  <li>✓ Keyboard navigation support</li>
                  <li>✓ Screen reader compatibility</li>
                  <li>✓ Color contrast ratios</li>
                  <li>✓ ARIA labels and roles</li>
                  <li>✓ Focus management</li>
                  <li>✓ Error handling</li>
                </ul>
              </div>
            )}

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
                        if (prompt.techStack) setSelectedTechStack(prompt.techStack);
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
                        {prompt.category === 'accessibility' && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-0.5 rounded">
                            ♿ A11y
                          </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(prompt.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 truncate">
                        {CATEGORIES.find(c => c.id === prompt.category)?.name} - {prompt.difficulty}
                        {prompt.techStack && prompt.techStack !== 'none' && 
                          ` (${TECH_STACKS.find(s => s.id === prompt.techStack)?.name.split(' + ')[0] || 'Stack'})`
                        }
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