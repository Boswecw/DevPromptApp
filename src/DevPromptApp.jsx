// src/DevPromptApp.jsx - COMPLETE VERSION: Fixed Dark Theme + Purple Selection Theme
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
  { id: 'function', name: 'Function', icon: '⚡' },
  { id: 'class', name: 'Class', icon: '🏗️' },
  { id: 'api', name: 'API', icon: '🌐' },
  { id: 'database', name: 'Database', icon: '🗄️' },
  { id: 'test', name: 'Test', icon: '🧪' },
  { id: 'algorithm', name: 'Algorithm', icon: '🔢' },
  { id: 'ui', name: 'UI/UX', icon: '🎨' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿' }
];

// Difficulty levels
const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', description: 'Simple, well-commented code' },
  { id: 'intermediate', name: 'Intermediate', description: 'Moderate complexity with best practices' },
  { id: 'advanced', name: 'Advanced', description: 'Complex, optimized, production-ready' }
];

// Tech stack configurations - INCLUDING CHUCK'S POWER STACK! 🧠
const TECH_STACKS = [
  {
    id: 'none',
    name: 'No Specific Stack',
    icon: '🔧',
    description: 'Language-agnostic implementation',
    frontend: 'Any',
    backend: 'Any',
    deployment: 'Any'
  },
  {
    id: 'chucks-power-stack',
    name: '🧠 Chuck\'s Power Stack (2025-2026)',
    icon: '🚀',
    description: 'The bleeding-edge full-stack with AI-first architecture',
    frontend: '🧩 SvelteKit or SolidJS + Tailwind + Framer Motion',
    backend: '🧠 Python + FastAPI + LangChain or Ollama',
    deployment: '⚙️ Vercel or Cloudflare Workers for speed + scale',
    edge: '🔥 Optional Edge Boost: Rust + WASM for client-side AI tasks'
  },
  {
    id: 'mern',
    name: 'MERN Stack',
    icon: '🌱',
    description: 'MongoDB, Express, React, Node.js',
    frontend: 'React + Vite + TailwindCSS',
    backend: 'Node.js + Express + MongoDB',
    deployment: 'Vercel + Atlas'
  },
  {
    id: 'next-full',
    name: 'Next.js Full-Stack',
    icon: '⚡',
    description: 'Next.js with integrated backend',
    frontend: 'Next.js + TypeScript + TailwindCSS',
    backend: 'Next.js API Routes + Prisma',
    deployment: 'Vercel + PlanetScale'
  },
  {
    id: 'vue-nuxt',
    name: 'Vue + Nuxt',
    icon: '💚',
    description: 'Vue ecosystem with Nuxt framework',
    frontend: 'Nuxt 3 + Vue 3 + TailwindCSS',
    backend: 'Nuxt Server API + Supabase',
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
      console.error('Failed to load saved prompts:', error);
      setSavedPrompts([]);
    }
  }, []);

  // Show notification helper
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Generate prompt logic - ENHANCED WITH BETTER STRUCTURE
  const generatedPrompt = useMemo(() => {
    const model = AI_MODELS.find(m => m.id === selectedModel);
    const language = PROGRAMMING_LANGUAGES.find(l => l.id === selectedLanguage);
    const category = CATEGORIES.find(c => c.id === selectedCategory);
    const difficulty = DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty);
    const techStack = TECH_STACKS.find(s => s.id === selectedTechStack);

    if (!model || !language || !category || !difficulty || !techStack) {
      return 'Please select all required options to generate a prompt.';
    }

    // Build tech stack context - ENHANCED FOR CHUCK'S POWER STACK
    const stackContext = techStack.id !== 'none' 
      ? `
**Tech Stack Context:**
- Frontend: ${techStack.frontend}
- Backend: ${techStack.backend}
- Deployment: ${techStack.deployment}
${techStack.edge ? `- Edge Computing: ${techStack.edge}` : ''}
- Architecture: ${techStack.description}
`
      : '';

    // Build custom requirements
    const customContext = customRequirements 
      ? `
**Additional Requirements:**
${customRequirements}
`
      : '';

    // Category-specific prompt templates
    const promptTemplates = {
      component: `Create a ${language.name} component with:
- ${difficulty.name} level functionality
- Features: ${selectedTags.join(', ').toLowerCase()}
- Modern ${language.name} component patterns
${stackContext}${customContext}

Deliver:
- Complete component code
- Styling (CSS/styled-components)
- Props interface/type definitions
- Usage examples
- Accessibility considerations
${techStack.id !== 'none' ? `- Integration with ${techStack.frontend} patterns and animations` : ''}
${techStack.id === 'chucks-power-stack' ? '- Advanced animations with Framer Motion and potential client-side AI features' : ''}`,

      function: `Build a ${language.name} function that:
- ${difficulty.name} complexity level
- Incorporates: ${selectedTags.join(', ').toLowerCase()}
- Follows ${language.name} best practices
${stackContext}${customContext}

Requirements:
- Well-documented with JSDoc/docstrings
- Include error handling
- Provide usage examples
- Optimize for readability and performance
${techStack.id !== 'none' ? `- Consider integration with ${techStack.name} architecture` : ''}`,

      class: `Design a ${language.name} class with:
- ${difficulty.name} level architecture
- Incorporates: ${selectedTags.join(', ').toLowerCase()}
- Follows OOP principles for ${language.name}
${stackContext}${customContext}

Include:
- Constructor with proper parameter validation
- Public and private methods
- Properties with appropriate access modifiers
- Documentation for all public members
- Usage example with instantiation
${techStack.id !== 'none' ? `- Integration patterns for ${techStack.name} stack` : ''}`,

      api: `Create a ${language.name} API ${category.name.toLowerCase()} featuring:
- ${difficulty.name} level implementation
- Includes: ${selectedTags.join(', ').toLowerCase()}
- RESTful design principles
${stackContext}${customContext}

Provide:
- Complete endpoint implementation
- Request/response schemas
- Error handling middleware
- Authentication/authorization if needed
- API documentation
${techStack.id !== 'none' ? `- Deployment configuration for ${techStack.deployment}` : ''}`,

      database: `Build a ${language.name} database integration that:
- ${difficulty.name} level complexity
- Implements: ${selectedTags.join(', ').toLowerCase()}
- Uses modern ${language.name} database libraries
${stackContext}${customContext}

Include:
- Connection management
- Query builders or ORM usage
- Migration scripts
- Error handling and logging
- Performance optimizations
${techStack.id !== 'none' ? `- Integration with ${techStack.backend} backend patterns` : ''}
${techStack.id === 'chucks-power-stack' ? '- Consider AI/ML integration patterns and edge computing optimization' : ''}`,

      test: `Generate ${language.name} test suite with:
- ${difficulty.name} level test coverage
- Incorporates: ${selectedTags.join(', ').toLowerCase()}
- Uses popular ${language.name} testing frameworks
${stackContext}${customContext}

Provide:
- Unit tests with multiple scenarios
- Integration tests if applicable
- Mock data and fixtures
- Test utilities and helpers
- Coverage configuration
${techStack.id !== 'none' ? `- E2E testing setup for ${techStack.name} stack` : ''}`,

      algorithm: `Implement a ${language.name} algorithm that:
- ${difficulty.name} complexity level
- Optimized for: ${selectedTags.join(', ').toLowerCase()}
- Follows ${language.name} performance best practices
${stackContext}${customContext}

Include:
- Time and space complexity analysis
- Multiple solution approaches
- Edge case handling
- Performance benchmarks
- Clear step-by-step comments
${techStack.id !== 'none' ? `- Optimization considerations for ${techStack.name} environment` : ''}
${techStack.id === 'chucks-power-stack' ? '- AI-first optimization and potential WASM/Rust integration for performance-critical parts' : ''}`,

      ui: `Create a ${language.name} UI component with:
- ${difficulty.name} level functionality
- Features: ${selectedTags.join(', ').toLowerCase()}
- Modern ${language.name} UI patterns
${stackContext}${customContext}

Deliver:
- Complete component code
- Styling (CSS/styled-components)
- Props interface/type definitions
- Usage examples
- Accessibility considerations
${techStack.id !== 'none' ? `- Integration with ${techStack.frontend} patterns and animations` : ''}
${techStack.id === 'chucks-power-stack' ? '- Advanced animations with Framer Motion and potential client-side AI features' : ''}`,

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
- Ensure minimum 4.5:1 color contrast for normal text (7:1 for ${difficulty.name === 'advanced' ? 'enhanced' : 'normal'})
- Provide alternative text for all images and icons
- Design for colorblind users (don't rely solely on color)
- Support high contrast and reduced motion preferences

⌨️ **Keyboard & Screen Reader Support:**
- Full keyboard navigation with logical tab order
- Proper ARIA labels, descriptions, and live regions
- Screen reader announcements for dynamic content
- Skip links and focus management for single-page applications

${stackContext}${customContext}

**Implementation Requirements:**
- Complete working code with accessibility features
- Testing instructions for screen readers and keyboard navigation
- Documentation of accessibility features implemented
- Performance considerations for assistive technologies
${techStack.id !== 'none' ? `- Integration with ${techStack.frontend} accessibility tools and libraries` : ''}
- Performance impact of accessibility features
${techStack.id === 'chucks-power-stack' ? '- AI-powered accessibility enhancements and edge-optimized assistive technology support' : ''}`
    };

    let basePrompt = promptTemplates[selectedCategory] || promptTemplates.component;

    // Model-specific modifications
    switch (selectedModel) {
      case 'claude':
        basePrompt = basePrompt.replace('Create a', 'I need you to help me create a')
          .replace('Build a', 'Please help me build a')
          .replace('Design a', 'Let\'s work together to design a');
        break;
      case 'gemini':
        basePrompt = `**Context:** I'm working on a ${language.name} project and need your creative input.

${basePrompt}

**Creative Approach:** Feel free to suggest innovative patterns or alternative approaches that might work better.`;
        break;
      case 'copilot':
        basePrompt = `// ${language.name} ${category.name} - ${difficulty.name} Level
// Tech Stack: ${techStack.name}
// Features: ${selectedTags.join(', ')}

${basePrompt}

Please provide inline comments explaining the implementation decisions.`;
        break;
    }

    return basePrompt;
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements]);

  // Copy prompt to clipboard
  const copyPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      showNotification('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy prompt:', error);
      showNotification('Failed to copy prompt', 'error');
    }
  }, [generatedPrompt, showNotification]);

  // Save current prompt configuration
  const savePrompt = useCallback(() => {
    const promptConfig = {
      id: Date.now().toString(),
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

    try {
      const newSavedPrompts = [promptConfig, ...savedPrompts];
      localStorage.setItem('saved-prompts', JSON.stringify(newSavedPrompts));
      setSavedPrompts(newSavedPrompts);
      showNotification('Prompt configuration saved!');
    } catch (error) {
      console.error('Failed to save prompt:', error);
      showNotification('Failed to save prompt', 'error');
    }
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements, generatedPrompt, savedPrompts, showNotification]);

  // Load saved prompt configuration
  const loadPrompt = useCallback((promptConfig) => {
    setSelectedModel(promptConfig.model);
    setSelectedLanguage(promptConfig.language);
    setSelectedCategory(promptConfig.category);
    setSelectedDifficulty(promptConfig.difficulty);
    setSelectedTechStack(promptConfig.techStack);
    setSelectedTags(promptConfig.tags);
    setCustomRequirements(promptConfig.customRequirements || '');
    showNotification('Prompt configuration loaded!');
  }, [showNotification]);

  // Toggle tag selection
  const toggleTag = useCallback((tagName) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'c':
            if (!e.target.matches('input, textarea')) {
              e.preventDefault();
              copyPrompt();
            }
            break;
          case 's':
            e.preventDefault();
            savePrompt();
            break;
        }
      }
      if (e.key === '?' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        setShowHelp(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [copyPrompt, savePrompt]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header - FIXED DARK THEME */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  DevPrompt Builder
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI-powered development prompts
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHelp(true)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Help & Documentation"
              >
                <Keyboard className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - FIXED DARK THEME */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel - FIXED DARK THEME */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* AI Model Selection - PURPLE THEME */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                AI Model
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {AI_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedModel === model.id
                        ? 'bg-purple-700 dark:bg-purple-700 text-white border-purple-700 dark:border-purple-700'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">{model.icon}</span>
                      <span className="text-sm font-medium">{model.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection - PURPLE THEME */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Programming Language
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {PROGRAMMING_LANGUAGES.map(language => (
                  <button
                    key={language.id}
                    onClick={() => setSelectedLanguage(language.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedLanguage === language.id
                        ? 'bg-purple-700 dark:bg-purple-700 text-white border-purple-700 dark:border-purple-700'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">{language.icon}</span>
                      <span className="text-xs font-medium">{language.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Category & Difficulty - PURPLE THEME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Category
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-purple-700 dark:bg-purple-700 text-white border-purple-700 dark:border-purple-700'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-xs font-medium text-center">{category.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Difficulty
                </h2>
                <div className="space-y-2">
                  {DIFFICULTY_LEVELS.map(difficulty => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedDifficulty === difficulty.id
                          ? 'bg-purple-700 dark:bg-purple-700 text-white border-purple-700 dark:border-purple-700'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium">{difficulty.name}</div>
                      <div className="text-xs opacity-75">{difficulty.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Selection - CHUCK'S POWER STACK SPECIAL + PURPLE THEME */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Tech Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {TECH_STACKS.map(stack => (
                  <button
                    key={stack.id}
                    onClick={() => setSelectedTechStack(stack.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedTechStack === stack.id
                        ? (stack.id === 'chucks-power-stack' 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-600 dark:to-blue-600 text-white border-purple-600 dark:border-purple-600' 
                            : 'bg-purple-700 dark:bg-purple-700 text-white border-purple-700 dark:border-purple-700')
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{stack.icon}</span>
                      <div>
                        <div className="font-medium">{stack.name}</div>
                        <div className="text-xs opacity-75 mt-1">{stack.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Tags - PURPLE THEME */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Feature Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {FEATURE_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-purple-700 dark:bg-purple-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                    {tag === 'Accessible' && ' ♿'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Actions Panel - FIXED DARK THEME + PURPLE THEME */}
          <div className="space-y-6">
            
            {/* Actions - PURPLE THEME */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Actions</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={showPreview ? 'Hide preview' : 'Show preview'}
                >
                  {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={copyPrompt}
                  className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </button>
                
                <button
                  onClick={savePrompt}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Custom Requirements - FIXED DARK THEME */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Requirements</h2>
              <textarea
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                placeholder="Add specific requirements, constraints, or additional context..."
                className="w-full h-32 p-3 border border-gray-200 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 focus:ring-opacity-50 transition-colors"
              />
            </div>

            {/* Prompt Preview - FIXED DARK THEME */}
            {showPreview && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Prompt</h2>
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            )}

            {/* Saved Prompts - FIXED DARK THEME */}
            {savedPrompts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  Recent Saves ({savedPrompts.length})
                </h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedPrompts.slice(0, 5).map((prompt) => (
                    <div
                      key={prompt.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => {
                        loadPrompt(prompt);
                      }}
                      title="Click to load this prompt"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 px-2 py-0.5 rounded">
                          {PROGRAMMING_LANGUAGES.find(l => l.id === prompt.language)?.name}
                        </span>
                        {prompt.category === 'accessibility' && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 rounded">
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

      {/* Notification - FIXED DARK THEME */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
            notification.type === 'error' 
              ? 'bg-red-600 dark:bg-red-600 text-white' 
              : 'bg-green-600 dark:bg-green-600 text-white'
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