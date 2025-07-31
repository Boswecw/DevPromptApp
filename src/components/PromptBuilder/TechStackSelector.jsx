// src/components/PromptBuilder/TechStackSelector.jsx
import React from 'react';
import { Database, Check } from 'lucide-react';

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

const TechStackSelector = ({ selectedTechStack, onTechStackChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Tech Stack
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {TECH_STACKS.map(stack => (
          <button
            key={stack.id}
            onClick={() => onTechStackChange(stack.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left transform hover:scale-105 ${
              selectedTechStack === stack.id
                ? (stack.id === 'chucks-power-stack' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-600 dark:to-blue-600 text-white border-purple-600 dark:border-purple-600 shadow-lg'
                    : 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600 shadow-lg')
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{stack.icon}</span>
              <div>
                <div className="font-medium">{stack.name}</div>
                <div className="text-xs opacity-75 mt-1">{stack.description}</div>
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
  );
};

export default TechStackSelector;