// src/components/PromptBuilder/constants.js
// Updated configuration constants with new AI models

export const AI_MODELS = [
  // Original models
  { 
    id: 'chatgpt', 
    name: 'ChatGPT', 
    color: 'bg-green-600 hover:bg-green-700', 
    darkColor: 'dark:bg-green-600 dark:hover:bg-green-700', 
    icon: '🤖',
    description: 'Comprehensive explanations with step-by-step details',
    costTier: 'standard',
    specialties: ['general', 'documentation', 'explanation']
  },
  { 
    id: 'claude', 
    name: 'Claude', 
    color: 'bg-purple-600 hover:bg-purple-700', 
    darkColor: 'dark:bg-purple-600 dark:hover:bg-purple-700', 
    icon: '🎭',
    description: 'Clean architecture and maintainable code focus',
    costTier: 'standard',
    specialties: ['architecture', 'refactoring', 'best-practices']
  },
  { 
    id: 'gemini', 
    name: 'Gemini', 
    color: 'bg-blue-600 hover:bg-blue-700', 
    darkColor: 'dark:bg-blue-600 dark:hover:bg-blue-700', 
    icon: '💎',
    description: 'Creative approaches with modern patterns',
    costTier: 'standard',
    specialties: ['creative', 'modern-patterns', 'innovation']
  },
  { 
    id: 'copilot', 
    name: 'GitHub Copilot', 
    color: 'bg-gray-700 hover:bg-gray-800', 
    darkColor: 'dark:bg-gray-600 dark:hover:bg-gray-700', 
    icon: '🚁',
    description: 'Code-focused prompts with inline comments',
    costTier: 'standard',
    specialties: ['coding', 'inline-help', 'practical']
  },
  
  // NEW MODELS - Cost-effective powerhouses
  { 
    id: 'deepseek', 
    name: 'DeepSeek R1', 
    color: 'bg-red-600 hover:bg-red-700', 
    darkColor: 'dark:bg-red-600 dark:hover:bg-red-700', 
    icon: '🔥',
    description: 'Advanced reasoning at fraction of GPT-4 cost',
    costTier: 'budget',
    specialties: ['reasoning', 'mathematics', 'logic', 'cost-effective'],
    badge: 'COST SAVER',
    savings: '90% vs GPT-4'
  },
  { 
    id: 'qwen', 
    name: 'Qwen 2.5 Max', 
    color: 'bg-orange-600 hover:bg-orange-700', 
    darkColor: 'dark:bg-orange-600 dark:hover:bg-orange-700', 
    icon: '⚡',
    description: 'Superior coding performance, 10x cheaper than Claude',
    costTier: 'budget',
    specialties: ['coding', 'performance', 'multilingual', 'cost-effective'],
    badge: 'CODING EXPERT',
    savings: '90% vs Claude'
  },
  { 
    id: 'perplexity', 
    name: 'Perplexity Pro', 
    color: 'bg-teal-600 hover:bg-teal-700', 
    darkColor: 'dark:bg-teal-600 dark:hover:bg-teal-700', 
    icon: '🔍',
    description: 'Real-time research with citations and sources',
    costTier: 'research',
    specialties: ['research', 'citations', 'real-time', 'documentation'],
    badge: 'RESEARCH PRO',
    unique: 'Live web search & citations'
  }
];

export const PROGRAMMING_LANGUAGES = [
  { id: 'html', name: 'HTML', icon: '🌐', extension: '.html' },
  { id: 'css', name: 'CSS', icon: '🎨', extension: '.css' },
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

export const CATEGORIES = [
  { id: 'component', name: 'Component', icon: '🧩' },
  { id: 'function', name: 'Function', icon: '⚙️' },
  { id: 'class', name: 'Class', icon: '🏗️' },
  { id: 'api', name: 'API', icon: '🌐' },
  { id: 'database', name: 'Database', icon: '🗄️' },
  { id: 'test', name: 'Test', icon: '🧪' },
  { id: 'algorithm', name: 'Algorithm', icon: '🔢' },
  { id: 'ui', name: 'UI/UX', icon: '🎨' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿' }
];

export const TECH_STACKS = [
  { 
    id: 'chucks-power-stack', 
    name: "🧠 Chuck's Power Stack (2025-2026)", 
    frontend: 'Next.js 15', 
    backend: 'Supabase + Vercel', 
    database: 'PostgreSQL + Vector DB',
    features: 'AI-first, Edge functions, Real-time'
  },
  { 
    id: 'mern', 
    name: 'MERN Stack', 
    frontend: 'React', 
    backend: 'Node.js + Express', 
    database: 'MongoDB',
    features: 'Full-stack JavaScript'
  },
  { 
    id: 'nextjs', 
    name: 'Next.js Full-Stack', 
    frontend: 'Next.js', 
    backend: 'Next.js API Routes', 
    database: 'Your choice',
    features: 'Integrated frontend and backend'
  },
  { 
    id: 'vue-nuxt', 
    name: 'Vue + Nuxt', 
    frontend: 'Vue.js', 
    backend: 'Nuxt.js', 
    database: 'Your choice',
    features: 'Vue ecosystem with SSR'
  },
  { 
    id: 'react-django', 
    name: 'React + Django', 
    frontend: 'React', 
    backend: 'Django', 
    database: 'PostgreSQL',
    features: 'React SPA with Python backend'
  },
  { 
    id: 'angular-dotnet', 
    name: 'Angular + .NET', 
    frontend: 'Angular', 
    backend: '.NET Core', 
    database: 'SQL Server',
    features: 'Enterprise Angular with .NET'
  },
  { 
    id: 'none', 
    name: 'Language Agnostic', 
    frontend: 'Not specified', 
    backend: 'Not specified', 
    database: 'Not specified',
    features: 'No specific stack requirements'
  }
];

export const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  { id: 'advanced', name: 'Advanced', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
];

export const FEATURE_TAGS = [
  'TypeSafe', 'Async', 'Error Handling', 'Validation', 'Testing', 'Performance', 
  'Security', 'Documentation', 'Responsive', 'Accessible', 'WCAG 2.1', 
  'Screen Reader', 'Keyboard Nav', 'ARIA', 'Color Contrast', 'Real-time',
  'Scalable', 'Mobile-first', 'SEO', 'PWA', 'Offline', 'Internationalization'
];

// Cost tier colors for UI
export const COST_TIER_COLORS = {
  budget: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  standard: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  research: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
};

// Model capabilities for smart recommendations
export const MODEL_CAPABILITIES = {
  deepseek: {
    strengths: ['mathematical reasoning', 'complex logic', 'code optimization', 'problem solving'],
    bestFor: ['algorithms', 'data structures', 'mathematical functions', 'optimization problems'],
    costSavings: 90
  },
  qwen: {
    strengths: ['code generation', 'multilingual support', 'performance optimization', 'debugging'],
    bestFor: ['components', 'APIs', 'full-stack development', 'refactoring'],
    costSavings: 90
  },
  perplexity: {
    strengths: ['research', 'documentation', 'real-time information', 'citations'],
    bestFor: ['documentation', 'learning', 'API research', 'technology comparisons'],
    unique: 'live_web_search'
  }
};