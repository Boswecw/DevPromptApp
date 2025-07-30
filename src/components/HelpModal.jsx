// src/components/HelpModal.jsx - Updated for Prompt Builder Interface
import React, { useEffect } from 'react';
import { 
  X, 
  Keyboard, 
  BookOpen, 
  HelpCircle, 
  Code,
  Layers,
  Zap,
  Settings,
  Copy,
  Save,
  Eye,
  Sun,
  Moon
} from 'lucide-react';

const HelpModal = ({ isOpen, onClose }) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Prompt Builder Help & Documentation
            </h2>
            <button 
              onClick={handleCloseClick}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close help modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            
            {/* Interface Overview */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Interface Overview
                </h3>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Four-Panel Layout
                </h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm mb-3">
                  The new interface uses a four-panel layout for maximum control over prompt generation:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-600" />
                      <strong>Left Panel:</strong> Programming languages & code categories
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-blue-600" />
                      <strong>Top Panel:</strong> AI model selection & difficulty level
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <strong>Right Panel:</strong> Feature tags & custom requirements
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <strong>Center:</strong> Live prompt preview & actions
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Programming Languages */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Multi-Language Support
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {[
                  { name: 'JavaScript', icon: '🟨' },
                  { name: 'TypeScript', icon: '🔷' },
                  { name: 'Python', icon: '🐍' },
                  { name: 'Java', icon: '☕' },
                  { name: 'C#', icon: '🔶' },
                  { name: 'C++', icon: '⚡' },
                  { name: 'Rust', icon: '🦀' },
                  { name: 'Go', icon: '🐹' },
                  { name: 'PHP', icon: '🐘' },
                  { name: 'Ruby', icon: '💎' }
                ].map(lang => (
                  <div key={lang.name} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                    <span>{lang.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Each language generates prompts optimized for its syntax, conventions, and best practices. 
                The AI models will provide language-specific examples and follow appropriate coding standards.
              </p>
            </section>

            {/* Code Categories */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Code Categories
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Component', icon: '🧩', desc: 'UI components, modules, and reusable elements' },
                  { name: 'Function', icon: '⚙️', desc: 'Standalone functions and utilities' },
                  { name: 'Class', icon: '🏗️', desc: 'Object-oriented classes and structures' },
                  { name: 'API', icon: '🌐', desc: 'REST endpoints, GraphQL resolvers, web services' },
                  { name: 'Database', icon: '💾', desc: 'Database queries, schemas, migrations' },
                  { name: 'Test', icon: '🧪', desc: 'Unit tests, integration tests, test suites' },
                  { name: 'Algorithm', icon: '📊', desc: 'Data structures, sorting, searching algorithms' },
                  { name: 'UI/UX', icon: '🎨', desc: 'User interface design and styling' }
                ].map(category => (
                  <div key={category.name} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{category.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Feature Tags */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Feature Tags
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Select multiple feature tags to customize your generated prompts. These influence the AI to include specific patterns and best practices:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  'TypeSafe', 'Async', 'Error Handling', 'Validation', 'Testing',
                  'Performance', 'Security', 'Documentation', 'Responsive', 'Accessible'
                ].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 rounded-full text-xs text-center">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Keyboard className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Keyboard Shortcuts
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white">Copy prompt to clipboard</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Ctrl + C</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white">Save current prompt</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Ctrl + S</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white">Show this help</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">?</kbd>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white">Close modal/overlay</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Esc</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white">Toggle dark mode</span>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Click <Sun className="w-3 h-3 inline" />/<Moon className="w-3 h-3 inline" /></kbd>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Models */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Model Differences
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">🤖 ChatGPT</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Comprehensive explanations with step-by-step implementation details and best practices.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-1">🎭 Claude</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    Detailed specifications with focus on clean architecture and maintainable code.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">💎 Gemini</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Constructive approach with emphasis on modern patterns and performance optimization.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <h4 className="font-medium text-gray-800 dark:text-gray-300 mb-1">🚁 GitHub Copilot</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Code-focused prompts with inline comments and practical implementation examples.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
              </div>
              
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-medium text-gray-900 dark:text-white">
                      How do I see what the prompt actually says?
                    </span>
                    <span className="ml-6 flex-shrink-0">+</span>
                  </summary>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    The center panel shows a live preview of your generated prompt. Use the eye icon to toggle the preview on/off. You can see exactly what will be sent to the AI before copying.
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Can I save my custom prompts?
                    </span>
                    <span className="ml-6 flex-shrink-0">+</span>
                  </summary>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Yes! Click the Save button or use Ctrl+S to save your current prompt configuration. Recent saves appear in the right panel. All saves are stored locally in your browser.
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-medium text-gray-900 dark:text-white">
                      How do I add custom requirements?
                    </span>
                    <span className="ml-6 flex-shrink-0">+</span>
                  </summary>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Use the "Custom Requirements" textarea in the right panel to add specific constraints, features, or additional context. This text gets included in your generated prompt.
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Why is the dark mode not working?
                    </span>
                    <span className="ml-6 flex-shrink-0">+</span>
                  </summary>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    The dark mode toggle is in the top-right corner of the header. Make sure you're clicking the sun/moon icon. Your preference is automatically saved and will persist between sessions.
                  </div>
                </details>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;