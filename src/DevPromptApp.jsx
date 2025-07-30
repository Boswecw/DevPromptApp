// src/DevPromptApp.jsx - COMPLETE VERSION: Fixed Tech Stack Color Selection
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

// Tech stack configurations - INCLUDING CHUCK'S POWER STACK!
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

  // Toggle feature tags
  const toggleTag = useCallback((tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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

**Additional Context:** Please be creative and suggest innovative approaches where possible.`;
        break;
      case 'copilot':
        basePrompt = `// ${language.name} ${selectedCategory} request
${basePrompt}

Please provide inline comments and suggest VS Code extensions that might be helpful.`;
        break;
    }

    return basePrompt;
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

  // Save current prompt
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

    setSavedPrompts(prev => [newPrompt, ...prev.slice(0, 9)]); // Keep only 10 most recent
    showNotification('Prompt saved successfully!');
  }, [selectedModel, selectedLanguage, selectedCategory, selectedDifficulty, selectedTechStack, selectedTags, customRequirements, generatedPrompt, showNotification]);

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

  return (
    <>
      {/* CSS Override for Selection Issues */}
      <style>{`
        .selection-purple-active {
          background-color: #9333ea !important;
          color: white !important;
          border-color: #9333ea !important;
          box-shadow: 0 10px 15px -3px rgba(147, 51, 234, 0.3) !important;
        }
        
        .selection-green-active {
          background-color: #16a34a !important;
          color: white !important;
          border-color: #16a34a !important;
          box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.3) !important;
        }
        
        .selection-gradient-active {
          background: linear-gradient(to right, #9333ea, #3b82f6) !important;
          color: white !important;
          border-color: #9333ea !important;
          box-shadow: 0 10px 15px -3px rgba(147, 51, 234, 0.4) !important;
        }
        
        /* Specific fixes for Language and Category sections */
        .language-button-selected {
          background-color: #9333ea !important;
          color: white !important;
          border: 2px solid #9333ea !important;
          box-shadow: 0 10px 15px -3px rgba(147, 51, 234, 0.3) !important;
        }
        
        .category-button-selected-purple {
          background-color: #9333ea !important;
          color: white !important;
          border: 2px solid #9333ea !important;
          box-shadow: 0 10px 15px -3px rgba(147, 51, 234, 0.3) !important;
        }
        
        .category-button-selected-green {
          background-color: #16a34a !important;
          color: white !important;
          border: 2px solid #16a34a !important;
          box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.3) !important;
        }
        
        .dark .selection-purple-active {
          background-color: #9333ea !important;
          color: white !important;
          border-color: #9333ea !important;
        }
        
        .dark .selection-green-active {
          background-color: #16a34a !important;
          color: white !important;
          border-color: #16a34a !important;
        }
        
        .dark .selection-gradient-active {
          background: linear-gradient(to right, #9333ea, #3b82f6) !important;
          color: white !important;
          border-color: #9333ea !important;
        }
        
        .dark .language-button-selected {
          background-color: #9333ea !important;
          color: white !important;
          border: 2px solid #9333ea !important;
        }
        
        .dark .category-button-selected-purple {
          background-color: #9333ea !important;
          color: white !important;
          border: 2px solid #9333ea !important;
        }
        
        .dark .category-button-selected-green {
          background-color: #16a34a !important;
          color: white !important;
          border: 2px solid #16a34a !important;
        }
      `}</style>
      
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
            {/* AI Model Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                AI Model
              </h2>
              <div className="space-y-2">
                {AI_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 transform hover:scale-105 ${
                      selectedModel === model.id
                        ? 'selection-purple-active'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <span className="mr-2">{model.icon}</span>
                    {model.name}
                    {selectedModel === model.id && (
                      <div className="flex items-center gap-1 mt-1">
                        <Check className="w-3 h-3" />
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Language
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {PROGRAMMING_LANGUAGES.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedLanguage === lang.id
                        ? 'bg-purple-600 dark:bg-purple-600 text-white shadow-md'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    }`}
                  >
                    <span className="mr-2">{lang.icon}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Category
              </h2>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 border-2 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? (category.id === 'accessibility' 
                            ? 'bg-green-600 dark:bg-green-600 text-white border-green-600 dark:border-green-600 shadow-lg' 
                            : 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600 shadow-lg')
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                    {category.id === 'accessibility' && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        WCAG 2.1
                      </span>
                    )}
                    {selectedCategory === category.id && (
                      <div className="flex items-center gap-1 mt-1">
                        <Check className="w-3 h-3" />
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Difficulty Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Difficulty Level
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DIFFICULTY_LEVELS.map(difficulty => (
                  <button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left transform hover:scale-105 ${
                      selectedDifficulty === difficulty.id
                        ? 'selection-purple-active'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <div className="font-medium">{difficulty.name}</div>
                    <div className="text-xs opacity-75">{difficulty.description}</div>
                    {selectedDifficulty === difficulty.id && (
                      <div className="flex items-center gap-1 mt-2">
                        <Check className="w-3 h-3" />
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Selection - FIXED COLOR LOGIC */}
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
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left transform hover:scale-105 ${
                      selectedTechStack === stack.id
                        ? (stack.id === 'chucks-power-stack' 
                            ? 'selection-gradient-active'
                            : 'selection-purple-active')
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{stack.icon}</span>
                      <div>
                        <div className="font-medium">{stack.name}</div>
                        <div className="text-xs opacity-75 mt-1">{stack.description}</div>
                        {/* Selection indicator */}
                        {selectedTechStack === stack.id && (
                          <div className="flex items-center gap-1 mt-2">
                            <Check className="w-3 h-3" />
                            <span className="text-xs font-medium">Selected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Tags */}
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
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 transform hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? 'selection-purple-active'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <Check className="w-3 h-3 ml-1 inline" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Custom Requirements
              </h2>
              <textarea
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                placeholder="Add any specific requirements, constraints, or additional context..."
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="4"
              />
            </div>

            {/* Generated Prompt Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {showPreview ? <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <EyeOff className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  Generated Prompt
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                    title={showPreview ? 'Hide preview' : 'Show preview'}
                  >
                    {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showPreview ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={savePrompt}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
              {showPreview && (
                <div className="p-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                    {generatedPrompt}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Prompts */}
            {savedPrompts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Saved Prompts
                </h2>
                <div className="space-y-2">
                  {savedPrompts.map(prompt => (
                    <div
                      key={prompt.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => loadPrompt(prompt)}
                    >
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {PROGRAMMING_LANGUAGES.find(l => l.id === prompt.language)?.name}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {CATEGORIES.find(c => c.id === prompt.category)?.name}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {DIFFICULTY_LEVELS.find(d => d.id === prompt.difficulty)?.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(prompt.createdAt).toLocaleDateString()}
                        </div>
                      </div>
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
    </>
  );
};

export default DevPromptApp;