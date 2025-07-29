// src/components/HelpModal.jsx
import React, { useState } from 'react';
import { X, Search, Heart, BarChart3, Download, Grid3X3, List, Moon, Sun, Star, Copy } from 'lucide-react';

const HelpModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('quick-start');

  const sections = [
    { id: 'quick-start', title: '🚀 Quick Start', icon: '🚀' },
    { id: 'core-features', title: '📚 Core Features', icon: '📚' },
    { id: 'ai-models', title: '🤖 AI Models', icon: '🤖' },
    { id: 'analytics', title: '📊 Analytics', icon: '📊' },
    { id: 'customization', title: '⚙️ Customization', icon: '⚙️' },
    { id: 'data-management', title: '💾 Data Management', icon: '💾' },
    { id: 'pro-tips', title: '🎮 Pro Tips', icon: '🎮' },
    { id: 'shortcuts', title: '⌨️ Keyboard Shortcuts', icon: '⌨️' },
    { id: 'troubleshooting', title: '🚨 Troubleshooting', icon: '🚨' }
  ];

  const QuickStartSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Welcome to AI Dev Prompt Studio! 🎉
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Your comprehensive toolkit for managing and organizing AI prompts across multiple platforms. 
        Think of it as your personal library of coding assistants - all organized, searchable, and ready to copy with one click.
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">What You'll Get:</h4>
        <ul className="space-y-1 text-blue-800 dark:text-blue-300">
          <li className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            <span>Instant access to development prompts</span>
          </li>
          <li className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>One-click copying to any AI platform</span>
          </li>
          <li className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Smart organization with categories and tags</span>
          </li>
          <li className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span>Usage analytics to track effectiveness</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const CoreFeaturesSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🎯 The Prompt Library</h4>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Your main workspace displays all prompts in an organized grid or list view. Each prompt card shows:
        </p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-4">
          <li>• <strong>Title & Description</strong> - What the prompt does</li>
          <li>• <strong>Category Badge</strong> - Frontend, Backend, Mobile, Testing, etc.</li>
          <li>• <strong>Difficulty Level</strong> - Beginner, Intermediate, or Advanced</li>
          <li>• <strong>Tags</strong> - Quick identifiers like "react", "api", "docker"</li>
          <li>• <strong>Usage Count</strong> - How often you've used this prompt</li>
          <li>• <strong>Star Rating</strong> - Community effectiveness rating</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">🔍 Smart Search & Filtering</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Search className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Search Bar</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Type keywords to find prompts. Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+K</kbd> to focus instantly.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">F</div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Category Filters</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Click category buttons to filter by Frontend, Backend, Mobile, etc.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Favorites System</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Heart prompts to add to favorites, use heart filter to show only starred prompts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AIModelsSection = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">The Four AI Platforms</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="w-8 h-8 bg-green-600 rounded text-white flex items-center justify-center font-bold text-sm">1</div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">ChatGPT</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">OpenAI's conversational AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="w-8 h-8 bg-purple-600 rounded text-white flex items-center justify-center font-bold text-sm">2</div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Claude</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Anthropic's helpful assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-sm">3</div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Gemini</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Google's multimodal AI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-8 h-8 bg-gray-600 rounded text-white flex items-center justify-center font-bold text-sm">4</div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Copilot</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">GitHub's code completion</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h5 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">💡 Pro Tip:</h5>
        <p className="text-yellow-800 dark:text-yellow-300 text-sm">
          Try the same prompt across different models to see which gives you the best results for your specific needs!
        </p>
      </div>
    </div>
  );

  const ShortcutsSection = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">⚡ Keyboard Shortcuts</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-900 dark:text-white">Focus search</span>
          <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">Ctrl + K</kbd>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-900 dark:text-white">Export prompts</span>
          <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">Ctrl + E</kbd>
        </div>
        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <span className="text-gray-900 dark:text-white">Copy ChatGPT prompt</span>
          <kbd className="px-3 py-1 bg-green-200 dark:bg-green-700 rounded text-sm font-mono">1</kbd>
        </div>
        <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <span className="text-gray-900 dark:text-white">Copy Claude prompt</span>
          <kbd className="px-3 py-1 bg-purple-200 dark:bg-purple-700 rounded text-sm font-mono">2</kbd>
        </div>
        <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-gray-900 dark:text-white">Copy Gemini prompt</span>
          <kbd className="px-3 py-1 bg-blue-200 dark:bg-blue-700 rounded text-sm font-mono">3</kbd>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-900 dark:text-white">Copy Copilot prompt</span>
          <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">4</kbd>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-900 dark:text-white">Show help (this dialog)</span>
          <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">?</kbd>
        </div>
      </div>
    </div>
  );

  const AnalyticsSection = () => (
    <div className="space-y-4">
      <p className="text-gray-600 dark:text-gray-300">
        Click the <BarChart3 className="inline w-4 h-4" /> bar chart icon in the header to open detailed analytics.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">📊</div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">Total Prompts</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">Library size</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">📈</div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">Total Usage</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">Copy count</p>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h5 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">📊 Use Analytics To:</h5>
        <ul className="text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
          <li>• Identify gaps in your prompt library</li>
          <li>• See which types of prompts you use most</li>
          <li>• Discover highly-rated prompts you haven't tried</li>
        </ul>
      </div>
    </div>
  );

  const CustomizationSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex gap-1">
          <Grid3X3 className="w-5 h-5 text-blue-600" />
          <List className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">View Modes</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Toggle between Grid (cards) and List (compact rows) view</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex gap-1">
          <Sun className="w-5 h-5 text-yellow-500" />
          <Moon className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Dark/Light Mode</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Click sun/moon icon. Automatically saved and follows system preference</p>
        </div>
      </div>
    </div>
  );

  const DataManagementSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <Download className="w-5 h-5 text-green-600" />
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Export Your Library</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Downloads JSON file with all prompts. Perfect for backups!</p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💾 Data Persistence</h5>
        <ul className="text-blue-800 dark:text-blue-300 text-sm space-y-1">
          <li>• All data is automatically saved in your browser</li>
          <li>• Favorites, usage counts, and custom prompts persist</li>
          <li>• No account required - everything stays on your device</li>
        </ul>
      </div>
    </div>
  );

  const ProTipsSection = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
        <h5 className="font-semibold text-purple-900 dark:text-purple-200 mb-3">🎮 Power User Workflows</h5>
        
        <div className="space-y-3">
          <div>
            <p className="font-medium text-purple-800 dark:text-purple-300">Daily Development:</p>
            <p className="text-sm text-purple-700 dark:text-purple-400">Pin this tab → Ctrl+K to search → Number keys to copy → Track analytics</p>
          </div>
          
          <div>
            <p className="font-medium text-purple-800 dark:text-purple-300">Project Setup:</p>
            <p className="text-sm text-purple-700 dark:text-purple-400">Filter by category → Favorite relevant prompts → Use favorites filter → Export to share</p>
          </div>
          
          <div>
            <p className="font-medium text-purple-800 dark:text-purple-300">Learning & Discovery:</p>
            <p className="text-sm text-purple-700 dark:text-purple-400">Sort by "Highest Rated" → Try new categories → Compare AI models → Check analytics for gaps</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h5 className="font-semibold text-green-900 dark:text-green-200 mb-2">✨ Best Practices</h5>
        <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
          <li>• Heart the prompts you use most often</li>
          <li>• Export your library regularly for backups</li>
          <li>• Try prompts across different AI models</li>
          <li>• Use analytics to identify your patterns</li>
        </ul>
      </div>
    </div>
  );

  const TroubleshootingSection = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="font-medium text-red-900 dark:text-red-200">Search not working?</p>
          <p className="text-sm text-red-700 dark:text-red-300">Make sure you've clicked in the search box or pressed Ctrl+K</p>
        </div>
        
        <div className="border border-orange-200 dark:border-orange-800 rounded-lg p-3">
          <p className="font-medium text-orange-900 dark:text-orange-200">No prompts showing?</p>
          <p className="text-sm text-orange-700 dark:text-orange-300">Check if you have active filters. Click "Clear all filters" in the empty state</p>
        </div>
        
        <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
          <p className="font-medium text-yellow-900 dark:text-yellow-200">Keyboard shortcuts not working?</p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">Make sure you're not typing in an input field. Click somewhere neutral first</p>
        </div>
        
        <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="font-medium text-blue-900 dark:text-blue-200">Copy to clipboard failed?</p>
          <p className="text-sm text-blue-700 dark:text-blue-300">Check browser permissions. Some browsers require HTTPS for clipboard access</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Browser Support</h5>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Works best in modern browsers (Chrome, Firefox, Safari, Edge). Requires JavaScript enabled.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'quick-start': return <QuickStartSection />;
      case 'core-features': return <CoreFeaturesSection />;
      case 'ai-models': return <AIModelsSection />;
      case 'analytics': return <AnalyticsSection />;
      case 'customization': return <CustomizationSection />;
      case 'data-management': return <DataManagementSection />;
      case 'pro-tips': return <ProTipsSection />;
      case 'shortcuts': return <ShortcutsSection />;
      case 'troubleshooting': return <TroubleshootingSection />;
      default: return <QuickStartSection />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full h-[80vh] flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Help & Documentation</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Learn how to master AI Dev Prompt Studio</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {sections.map(section => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {sections.find(s => s.id === activeSection)?.title || 'Help'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;