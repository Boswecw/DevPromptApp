// src/components/PromptBuilder/constants.js
// All configuration constants extracted from the main component

export const AI_MODELS = [
    { id: 'chatgpt', name: 'ChatGPT', color: 'bg-green-600 hover:bg-green-700', darkColor: 'dark:bg-green-600 dark:hover:bg-green-700', icon: '🤖' },
    { id: 'claude', name: 'Claude', color: 'bg-purple-600 hover:bg-purple-700', darkColor: 'dark:bg-purple-600 dark:hover:bg-purple-700', icon: '🎭' },
    { id: 'gemini', name: 'Gemini', color: 'bg-blue-600 hover:bg-blue-700', darkColor: 'dark:bg-blue-600 dark:hover:bg-blue-700', icon: '💎' },
    { id: 'copilot', name: 'GitHub Copilot', color: 'bg-gray-700 hover:bg-gray-800', darkColor: 'dark:bg-gray-600 dark:hover:bg-gray-700', icon: '🚁' }
  ];
  
  export const PROGRAMMING_LANGUAGES = [
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
    { id: 'function', name: 'Function', icon: '⚡' },
    { id: 'class', name: 'Class', icon: '🏗️' },
    { id: 'api', name: 'API', icon: '🌐' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'test', name: 'Test', icon: '🧪' },
    { id: 'algorithm', name: 'Algorithm', icon: '🔢' },
    { id: 'ui', name: 'UI/UX', icon: '🎨' },
    { id: 'accessibility', name: 'Accessibility', icon: '♿' }
  ];
  
  export const DIFFICULTY_LEVELS = [
    { id: 'beginner', name: 'Beginner', description: 'Simple, well-commented code' },
    { id: 'intermediate', name: 'Intermediate', description: 'Moderate complexity with best practices' },
    { id: 'advanced', name: 'Advanced', description: 'Complex, optimized, production-ready' }
  ];
  
  export const TECH_STACKS = [
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
  
  export const FEATURE_TAGS = [
    'TypeSafe', 'Async', 'Error Handling', 'Validation', 'Testing', 
    'Performance', 'Security', 'Documentation', 'Responsive', 'Accessible',
    'WCAG 2.1', 'Screen Reader', 'Keyboard Nav', 'ARIA', 'Color Contrast'
  ];