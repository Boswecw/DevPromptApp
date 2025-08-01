// src/components/HelpModal.jsx - Enhanced with new AI models
import React from 'react';
import { 
  X, Keyboard, Zap, Settings, HelpCircle, 
  TrendingDown, Search, BookOpen, DollarSign,
  Award, Target, Lightbulb
} from 'lucide-react';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            DevPrompt Generator Help
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-8">
          
          {/* New Models Showcase */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                ✨ New AI Models - Cost-Effective Powerhouses
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔥</span>
                  <h4 className="font-bold text-red-800 dark:text-red-300">DeepSeek R1</h4>
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    SAVE 90%
                  </span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-400 mb-2">
                  Advanced reasoning at fraction of GPT-4 cost. Excels at mathematical problems and complex logic.
                </p>
                <div className="text-xs text-red-600 dark:text-red-500">
                  <strong>Best for:</strong> Algorithms, mathematics, complex reasoning, optimization
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h4 className="font-bold text-orange-800 dark:text-orange-300">Qwen 2.5 Max</h4>
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    CODING EXPERT
                  </span>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-400 mb-2">
                  Superior coding performance, outperforms GPT-4o on coding tasks. 90% cheaper than Claude.
                </p>
                <div className="text-xs text-orange-600 dark:text-orange-500">
                  <strong>Best for:</strong> Components, APIs, full-stack development, code optimization
                </div>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔍</span>
                  <h4 className="font-bold text-teal-800 dark:text-teal-300">Perplexity Pro</h4>
                  <span className="px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
                    RESEARCH PRO
                  </span>
                </div>
                <p className="text-sm text-teal-700 dark:text-teal-400 mb-2">
                  Real-time research with citations and sources. Perfect for documentation and learning.
                </p>
                <div className="text-xs text-teal-600 dark:text-teal-500">
                  <strong>Best for:</strong> Documentation, research, API guides, technology comparisons
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800 dark:text-green-300">Cost Savings Impact</h4>
              </div>
              <p className="text-sm text-green-700 dark:text-green-400">
                These new models can reduce your API costs by up to <strong>90%</strong> while often providing 
                <strong> superior performance</strong> for coding tasks. A typical enterprise can save 
                <strong>$10,000+ monthly</strong> by switching from GPT-4 to these cost-effective alternatives.
              </p>
            </div>
          </section>

          {/* Original Models */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Original AI Models
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
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
                  Creative approach with emphasis on modern patterns and performance optimization.
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

          {/* Smart Model Selection */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Smart Model Selection Guide
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  📊 For Algorithms & Mathematics
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                  <strong>Recommended:</strong> DeepSeek R1 → Qwen 2.5 Max → Claude
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-500">
                  DeepSeek R1 excels at complex reasoning and mathematical optimization problems.
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                  💻 For Coding & Components
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-400 mb-2">
                  <strong>Recommended:</strong> Qwen 2.5 Max → Claude → DeepSeek R1
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-500">
                  Qwen 2.5 Max outperforms GPT-4o on coding benchmarks at 90% lower cost.
                </p>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">
                  📚 For Documentation & Research
                </h4>
                <p className="text-sm text-teal-700 dark:text-teal-400 mb-2">
                  <strong>Recommended:</strong> Perplexity Pro → ChatGPT → Claude
                </p>
                <p className="text-xs text-teal-600 dark:text-teal-500">
                  Perplexity Pro provides real-time research with citations and authoritative sources.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  🎨 For HTML/CSS & UI/UX Tasks
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-400 mb-2">
                  <strong>Recommended:</strong> Claude → Qwen 2.5 Max → Gemini
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-500">
                  Claude excels at semantic HTML and modern CSS, while Qwen offers performance optimization.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">
                  🌐 For Frontend Technologies
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                  <strong>HTML/CSS Focus:</strong> Semantic markup, accessibility, responsive design, modern CSS features
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-500">
                  Now includes specialized prompts for HTML5 semantics, CSS Grid/Flexbox, animations, and accessibility.
                </p>
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Keyboard className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Keyboard Shortcuts
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Search prompts</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+K</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">New custom prompt</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+N</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Export prompts</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+E</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Show help</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">?</kbd>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Copy ChatGPT prompt</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">1</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Copy Claude prompt</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">2</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Copy Gemini prompt</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">3</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Copy GitHub Copilot</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">4</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Copy DeepSeek R1</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">5</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Copy Qwen 2.5 Max</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">6</kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">Copy Perplexity Pro</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">7</kbd>
                </div>
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
                    Why should I use the new cost-effective models?
                  </span>
                  <span className="ml-6 flex-shrink-0">+</span>
                </summary>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  DeepSeek R1 and Qwen 2.5 Max offer superior performance for coding tasks at 90% lower cost than GPT-4. 
                  They often outperform expensive models while saving significant money on API costs. Perfect for developers 
                  and companies looking to optimize their AI spending without sacrificing quality.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-gray-900 dark:text-white">
                    How does HTML and CSS support work?
                  </span>
                  <span className="ml-6 flex-shrink-0">+</span>
                </summary>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  HTML and CSS are now fully supported with specialized prompts. HTML prompts focus on semantic markup, 
                  accessibility (ARIA labels, proper headings), and SEO optimization. CSS prompts emphasize modern features 
                  like Grid/Flexbox, responsive design, animations, and performance optimization. The app automatically 
                  recommends the best AI models for frontend tasks.
                </div>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-gray-900 dark:text-white">
                    When should I use Perplexity Pro over other models?
                  </span>
                  <span className="ml-6 flex-shrink-0">+</span>
                </summary>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Use Perplexity Pro when you need real-time research, current information, or want citations and sources. 
                  It's perfect for documentation tasks, learning about new technologies, or when you need to reference 
                  authoritative sources in your code comments.
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-gray-900 dark:text-white">
                    How do I know which model is best for my task?
                  </span>
                  <span className="ml-6 flex-shrink-0">+</span>
                </summary>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  The app shows smart recommendations based on your selected category. Generally: DeepSeek R1 for algorithms/math, 
                  Qwen 2.5 Max for coding/components, Perplexity Pro for research/documentation, and Claude for architecture/design. 
                  Each model card shows its specialties and cost tier.
                </div>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Can I save my custom prompts with the new models?
                  </span>
                  <span className="ml-6 flex-shrink-0">+</span>
                </summary>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Yes! All functionality works with the new models. You can save prompts, create templates, export collections, 
                  and use all keyboard shortcuts. The new models integrate seamlessly with existing features while offering 
                  significant cost savings and performance improvements.
                </div>
              </details>
            </div>
          </section>

          {/* Tips */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pro Tips
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">💰 Cost Optimization</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Start with DeepSeek R1 or Qwen 2.5 Max for most tasks. They often provide better results than expensive models at 90% lower cost.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">🔍 Research Tasks</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Use Perplexity Pro when you need current information, documentation, or want to include authoritative sources and citations.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">⚡ Performance</h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  For complex algorithms or mathematical problems, DeepSeek R1's advanced reasoning capabilities often exceed GPT-4 performance.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-1">🎯 Model Mixing</h4>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  Try the same prompt with different models - you might discover that cheaper models produce better results for your specific use case.
                </p>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded">
                <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-1">🌐 HTML/CSS Excellence</h4>
                <p className="text-sm text-indigo-700 dark:text-indigo-400">
                  For HTML/CSS tasks, Claude excels at semantic markup and accessibility, while Qwen 2.5 Max offers cutting-edge CSS techniques and performance optimization.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;