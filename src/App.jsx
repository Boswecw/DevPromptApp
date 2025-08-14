// src/App.jsx - Complete DevPrompt App with Integrated Landing Page & PromptBuilder
import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Sparkles, 
  Zap, 
  Brain, 
  Palette, 
  Shield,
  ArrowRight,
  Star,
  Users,
  Download,
  Menu,
  X,
  Settings
} from 'lucide-react';

// Core app components
import { 
  ErrorBoundary, 
  ThemeProvider, 
  ThemeToggle, 
  HelpModal,
  LoadingSpinner
} from './components';

// PWA component (direct import)
import PWAInstall from './components/PWAInstall';

// PromptBuilder components - all integrated
import { 
  PromptBuilder, 
  CustomPromptBuilder 
} from './components/PromptBuilder';

// Main App Component
function App() {
  const [currentMode, setCurrentMode] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Initialize app and restore last mode
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if user was in a specific mode
        const lastMode = localStorage.getItem('devprompt-last-mode') || 'landing';
        
        // Small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setCurrentMode(lastMode);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setCurrentMode('landing');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handle mode switching
  const handleModeSwitch = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem('devprompt-last-mode', mode);
    setShowMobileMenu(false);
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-purple-600 p-4 rounded-2xl mb-4 mx-auto w-fit">
            <Code className="w-8 h-8 text-white animate-pulse" />
          </div>
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading DevPrompt...</p>
        </div>
      </div>
    );
  }

  // Render based on current mode
  if (currentMode === 'guided') {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <div className="relative">
            <PWAInstall />
            <PromptBuilder onSwitchMode={handleModeSwitch} />
          </div>
          {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  if (currentMode === 'custom') {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <div className="relative">
            <PWAInstall />
            <CustomPromptBuilder onSwitchMode={handleModeSwitch} />
          </div>
          {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // Landing page (default)
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          
          {/* Navigation Header */}
          <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      DevPrompt
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                      AI Prompt Generator
                    </p>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  <button
                    onClick={() => handleModeSwitch('guided')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-200 font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    Guided Builder
                  </button>
                  
                  <button
                    onClick={() => handleModeSwitch('custom')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <Palette className="w-4 h-4" />
                    Custom Builder
                  </button>

                  <button
                    onClick={() => setShowHelp(true)}
                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    title="Help & Documentation"
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  <PWAInstall />
                  
                  <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          {showMobileMenu && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileMenu(false)} />
              <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Menu</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <button
                    onClick={() => handleModeSwitch('guided')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium"
                  >
                    <Sparkles className="w-5 h-5" />
                    Guided Builder
                  </button>
                  
                  <button
                    onClick={() => handleModeSwitch('custom')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Palette className="w-5 h-5" />
                    Custom Builder
                  </button>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-8">
                  <Zap className="w-4 h-4" />
                  AI-Powered Prompt Generation
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    Perfect Prompts
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-white">
                    Every Time
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                  Generate optimized prompts for ChatGPT, Claude, Gemini, and GitHub Copilot. 
                  Built for developers who demand precision, efficiency, and results.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <button
                    onClick={() => handleModeSwitch('guided')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Start Building
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleModeSwitch('custom')}
                    className="px-8 py-4 border-2 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-2xl font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
                  >
                    Custom Builder
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4</div>
                    <div className="text-gray-600 dark:text-gray-400">AI Models</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">10+</div>
                    <div className="text-gray-600 dark:text-gray-400">Languages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">9</div>
                    <div className="text-gray-600 dark:text-gray-400">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">15+</div>
                    <div className="text-gray-600 dark:text-gray-400">Features</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-20"></div>
              <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-20"></div>
              <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-20"></div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white/50 dark:bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Everything You Need
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Powerful features designed to make your AI interactions more effective and efficient.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature Cards */}
                <FeatureCard
                  icon={<Brain className="w-8 h-8" />}
                  title="4 AI Models"
                  description="Optimized prompts for ChatGPT, Claude, Gemini, and GitHub Copilot with model-specific formatting."
                  gradient="from-purple-500 to-purple-600"
                />
                
                <FeatureCard
                  icon={<Code className="w-8 h-8" />}
                  title="10+ Languages"
                  description="Support for JavaScript, Python, Java, C#, Rust, Go, and more with language-specific patterns."
                  gradient="from-blue-500 to-blue-600"
                />
                
                <FeatureCard
                  icon={<Palette className="w-8 h-8" />}
                  title="Smart Categories"
                  description="Components, APIs, algorithms, tests, and accessibility-focused prompts with intelligent templates."
                  gradient="from-pink-500 to-pink-600"
                />
                
                <FeatureCard
                  icon={<Shield className="w-8 h-8" />}
                  title="WCAG Compliant"
                  description="Built-in accessibility features and prompts that generate WCAG 2.1 AA compliant code."
                  gradient="from-green-500 to-green-600"
                />
                
                <FeatureCard
                  icon={<Zap className="w-8 h-8" />}
                  title="Auto-Save"
                  description="Local storage with smart error handling keeps your prompts safe and easily accessible."
                  gradient="from-yellow-500 to-orange-500"
                />
                
                <FeatureCard
                  icon={<Users className="w-8 h-8" />}
                  title="Developer First"
                  description="Built by developers, for developers. Clean interfaces, keyboard shortcuts, and export options."
                  gradient="from-indigo-500 to-indigo-600"
                />
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-white text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Ready to Build Better Prompts?
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers creating more effective AI prompts with our intelligent builder.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleModeSwitch('guided')}
                    className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                  >
                    Try Guided Builder
                  </button>
                  <button
                    onClick={() => handleModeSwitch('custom')}
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
                  >
                    Use Custom Builder
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">DevPrompt</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-center md:text-right">
                  Made with ❤️ for developers who want perfect AI prompts
                </p>
              </div>
            </div>
          </footer>

          {/* Help Modal */}
          {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
          
          {/* PWA Install Component */}
          <PWAInstall />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      {description}
    </p>
  </div>
);

export default App;