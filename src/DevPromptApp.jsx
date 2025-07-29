// src/DevPromptApp.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Star, 
  Copy, 
  Heart,
  Filter,
  BarChart3,
  Keyboard,
  X,
  Check,
  AlertCircle,
  Trash2,
  Edit3,
  Tag,
  TrendingUp,
  Clock,
  Award,
  Grid3X3,
  List,
  Moon,
  Sun
} from 'lucide-react';

// Import our new components
import { 
  LoadingSpinner, 
  PromptCardSkeleton, 
  StorageErrorHandler,
  useLocalStorageWithErrorHandling,
  InlineSpinner
} from './components';

// Initial prompts data
const initialPrompts = [
  {
    id: 1,
    title: "React Component Generator",
    description: "Generate a complete React functional component with props, state, and TypeScript",
    category: "Frontend",
    tags: ["react", "typescript", "component"],
    difficulty: "Intermediate",
    chatgpt: "Create a React functional component with TypeScript that accepts props and manages state. Include proper type definitions and export statement.",
    claude: "Build a React component using TypeScript. Define proper interfaces for props, implement useState hooks, and include comprehensive JSDoc comments.",
    gemini: "Generate a React functional component with TypeScript support, including prop types, state management, and best practices.",
    copilot: "// Create React component with TypeScript\ninterface Props {\n  // Define props here\n}\n\nconst ComponentName: React.FC<Props> = () => {",
    rating: 4.5,
    usageCount: 23,
    isFavorite: true,
    isCustom: false,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z"
  },
  {
    id: 2,
    title: "API Endpoint Creator",
    description: "Generate RESTful API endpoints with proper error handling and validation",
    category: "Backend",
    tags: ["api", "rest", "express", "validation"],
    difficulty: "Advanced",
    chatgpt: "Create a RESTful API endpoint using Express.js with input validation, error handling, and proper HTTP status codes.",
    claude: "Build an Express.js API route with comprehensive error handling, request validation using Joi or similar, and proper response formatting.",
    gemini: "Generate a REST API endpoint with Express.js including middleware for validation, authentication, and error handling.",
    copilot: "// Express.js API endpoint with validation\napp.post('/api/endpoint', validateInput, async (req, res) => {",
    rating: 4.8,
    usageCount: 31,
    isFavorite: false,
    isCustom: false,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z"
  },
  {
    id: 3,
    title: "Database Schema Designer",
    description: "Design normalized database schemas with relationships and constraints",
    category: "Backend",
    tags: ["database", "sql", "schema", "design"],
    difficulty: "Advanced",
    chatgpt: "Design a normalized database schema with proper relationships, foreign keys, and constraints for a given application domain.",
    claude: "Create a comprehensive database schema with tables, relationships, indexes, and constraints. Include migration scripts and documentation.",
    gemini: "Generate a well-structured database schema with proper normalization, relationships, and performance considerations.",
    copilot: "-- Database schema design\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,",
    rating: 4.3,
    usageCount: 18,
    isFavorite: true,
    isCustom: false,
    createdAt: "2024-01-12T11:45:00Z",
    updatedAt: "2024-01-19T13:30:00Z"
  },
  {
    id: 4,
    title: "Unit Test Generator",
    description: "Generate comprehensive unit tests with mocking and edge cases",
    category: "Testing",
    tags: ["testing", "jest", "unit-tests", "mocking"],
    difficulty: "Intermediate",
    chatgpt: "Create comprehensive unit tests using Jest with proper mocking, edge cases, and good test coverage for the given function or component.",
    claude: "Generate thorough unit tests with Jest including setup, teardown, mocking external dependencies, and testing edge cases.",
    gemini: "Write complete unit test suites with proper test structure, mocking strategies, and comprehensive coverage.",
    copilot: "// Jest unit tests\ndescribe('ComponentName', () => {\n  beforeEach(() => {",
    rating: 4.6,
    usageCount: 27,
    isFavorite: false,
    isCustom: false,
    createdAt: "2024-01-14T15:20:00Z",
    updatedAt: "2024-01-21T10:15:00Z"
  },
  {
    id: 5,
    title: "Mobile App Architecture",
    description: "Design scalable mobile app architecture with state management",
    category: "Mobile",
    tags: ["react-native", "architecture", "state-management"],
    difficulty: "Advanced",
    chatgpt: "Design a scalable React Native app architecture with proper state management, navigation, and folder structure.",
    claude: "Create a comprehensive mobile app architecture including state management with Redux/Zustand, navigation patterns, and performance optimizations.",
    gemini: "Design a robust mobile application architecture with clean code principles, state management, and scalability considerations.",
    copilot: "// React Native app architecture\nconst AppNavigator = () => {\n  return (",
    rating: 4.4,
    usageCount: 15,
    isFavorite: true,
    isCustom: false,
    createdAt: "2024-01-16T08:30:00Z",
    updatedAt: "2024-01-22T14:45:00Z"
  },
  {
    id: 6,
    title: "Custom Docker Setup",
    description: "My custom Docker configuration for development environment",
    category: "DevOps",
    tags: ["docker", "development", "custom"],
    difficulty: "Intermediate",
    chatgpt: "Create a Docker setup with multi-stage builds for my Node.js application with Redis and PostgreSQL services.",
    claude: "Build a comprehensive Docker configuration with development and production environments, including all necessary services and optimizations.",
    gemini: "Generate Docker Compose setup for full-stack development with proper networking and volume management.",
    copilot: "# Custom Docker setup\nversion: '3.8'\nservices:\n  app:",
    rating: 5.0,
    usageCount: 8,
    isFavorite: true,
    isCustom: true,
    createdAt: "2024-01-20T16:45:00Z",
    updatedAt: "2024-01-22T09:30:00Z"
  }
];

// Categories configuration
const categories = [
  { id: 'all', name: 'All', count: 0, color: 'bg-gray-100 text-gray-800' },
  { id: 'frontend', name: 'Frontend', count: 0, color: 'bg-blue-100 text-blue-800' },
  { id: 'backend', name: 'Backend', count: 0, color: 'bg-green-100 text-green-800' },
  { id: 'mobile', name: 'Mobile', count: 0, color: 'bg-purple-100 text-purple-800' },
  { id: 'testing', name: 'Testing', count: 0, color: 'bg-red-100 text-red-800' },
  { id: 'devops', name: 'DevOps', count: 0, color: 'bg-orange-100 text-orange-800' },
  { id: 'ui-ux', name: 'UI/UX', count: 0, color: 'bg-pink-100 text-pink-800' },
  { id: 'documentation', name: 'Documentation', count: 0, color: 'bg-indigo-100 text-indigo-800' },
  { id: 'security', name: 'Security', count: 0, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'data-science', name: 'Data Science', count: 0, color: 'bg-teal-100 text-teal-800' }
];

// AI Models configuration
const aiModels = [
  { id: 'chatgpt', name: 'ChatGPT', color: 'bg-green-600', shortcut: '1' },
  { id: 'claude', name: 'Claude', color: 'bg-purple-600', shortcut: '2' },
  { id: 'gemini', name: 'Gemini', color: 'bg-blue-600', shortcut: '3' },
  { id: 'copilot', name: 'Copilot', color: 'bg-gray-600', shortcut: '4' }
];

const DevPromptApp = () => {
  // ✅ ALL HOOKS MUST BE AT THE TOP - BEFORE ANY CONDITIONAL RETURNS
  
  // Enhanced localStorage with error handling
  const [prompts, setPrompts, { isLoading, error, retry, removeValue, clearError }] = 
    useLocalStorageWithErrorHandling('dev-prompts', initialPrompts, {
      onError: (err, operation) => {
        console.error(`🔴 Storage error during ${operation}:`, err);
      },
      maxRetries: 3,
      retryDelay: 1000
    });

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('updated'); // 'updated', 'created', 'usage', 'rating', 'title'
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Notification state
  const [notification, setNotification] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newMode);
      }
      return newMode;
    });
  }, []);

  // Apply dark mode on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  // Show notification
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Filter and sort prompts
  const filteredAndSortedPrompts = useMemo(() => {
    let filtered = prompts.filter(prompt => {
      const matchesSearch = searchTerm === '' || 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
        prompt.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'frontend' && prompt.category === 'Frontend') ||
        (selectedCategory === 'backend' && prompt.category === 'Backend') ||
        (selectedCategory === 'mobile' && prompt.category === 'Mobile') ||
        (selectedCategory === 'testing' && prompt.category === 'Testing') ||
        (selectedCategory === 'devops' && prompt.category === 'DevOps');
      
      const matchesDifficulty = selectedDifficulty === 'all' || 
        prompt.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();
      
      const matchesFavorites = !showFavoritesOnly || prompt.isFavorite;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorites;
    });

    // Sort prompts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'usage':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'updated':
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

    return filtered;
  }, [prompts, searchTerm, selectedCategory, selectedDifficulty, showFavoritesOnly, sortBy]);

  // Calculate category counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: category.id === 'all' 
        ? prompts.length 
        : prompts.filter(p => p.category.toLowerCase() === category.id.replace('-', '')).length
    }));
  }, [prompts]);

  // Analytics data
  const analytics = useMemo(() => {
    const totalPrompts = prompts.length;
    const customPrompts = prompts.filter(p => p.isCustom).length;
    const totalUsage = prompts.reduce((sum, p) => sum + (p.usageCount || 0), 0);
    const avgRating = prompts.length > 0 ? prompts.reduce((sum, p) => sum + (p.rating || 0), 0) / prompts.length : 0;
    const topUsed = [...prompts].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 5);
    const topRated = [...prompts].filter(p => p.rating >= 4.5).slice(0, 5);
    
    return {
      totalPrompts,
      customPrompts,
      totalUsage,
      avgRating,
      topUsed,
      topRated
    };
  }, [prompts]);

  // Copy prompt to clipboard
  const copyPrompt = useCallback(async (prompt, model) => {
    try {
      await navigator.clipboard.writeText(prompt[model]);
      
      // Update usage count
      const updatedPrompts = prompts.map(p => 
        p.id === prompt.id 
          ? { ...p, usageCount: (p.usageCount || 0) + 1, updatedAt: new Date().toISOString() }
          : p
      );
      setPrompts(updatedPrompts);
      
      showNotification(`Copied ${aiModels.find(m => m.id === model)?.name} prompt: "${prompt.title}"`);
    } catch (err) {
      console.error('Failed to copy:', err);
      showNotification('Failed to copy prompt', 'error');
    }
  }, [prompts, setPrompts, showNotification]);

  // Toggle favorite
  const toggleFavorite = useCallback((promptId) => {
    const updatedPrompts = prompts.map(p => 
      p.id === promptId 
        ? { ...p, isFavorite: !p.isFavorite, updatedAt: new Date().toISOString() }
        : p
    );
    setPrompts(updatedPrompts);
    
    const prompt = prompts.find(p => p.id === promptId);
    showNotification(
      `${prompt?.isFavorite ? 'Removed from' : 'Added to'} favorites: "${prompt?.title}"`,
      'success'
    );
  }, [prompts, setPrompts, showNotification]);

  // Export prompts
  const exportPrompts = useCallback(async () => {
    setIsExporting(true);
    try {
      const dataStr = JSON.stringify(prompts, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-dev-prompts-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      showNotification('Prompts exported successfully!');
    } catch (err) {
      console.error('Export failed:', err);
      showNotification('Failed to export prompts', 'error');
    } finally {
      setIsExporting(false);
    }
  }, [prompts, showNotification]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K - Focus search
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[type="text"]')?.focus();
      }
      // Ctrl+E - Export
      else if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        exportPrompts();
      }
      // ? - Show keyboard help
      else if (e.key === '?' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        setShowKeyboardHelp(true);
      }
      // 1-4 - Copy prompts (when not in input)
      else if (['1', '2', '3', '4'].includes(e.key) && !e.target.matches('input, textarea')) {
        const modelIndex = parseInt(e.key) - 1;
        const model = aiModels[modelIndex];
        if (model && filteredAndSortedPrompts.length > 0) {
          copyPrompt(filteredAndSortedPrompts[0], model.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exportPrompts, copyPrompt, filteredAndSortedPrompts]);

  // ✅ NOW WE CAN SAFELY HANDLE CONDITIONAL RENDERING AFTER ALL HOOKS

  // Handle storage errors
  if (error) {
    return (
      <StorageErrorHandler
        error={error}
        onRetry={retry}
        onClearStorage={() => {
          removeValue();
          clearError();
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
        storageKey="dev-prompts"
      />
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          {/* Search bar skeleton */}
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6"></div>
          
          {/* Categories skeleton */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0"></div>
            ))}
          </div>
          
          {/* Loading spinner */}
          <div className="text-center mb-8">
            <LoadingSpinner size="large" text="Loading your AI prompts..." />
          </div>
          
          {/* Prompt cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <PromptCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Dev Prompt Studio
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {analytics.totalPrompts} prompts • {analytics.totalUsage} total uses
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setShowAnalytics(true)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="View analytics"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            
            <button
              onClick={exportPrompts}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              title="Export prompts (Ctrl+E)"
            >
              {isExporting ? <InlineSpinner /> : <Download className="w-4 h-4" />}
              Export
            </button>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts... (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categoriesWithCounts.slice(0, 6).map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* View controls */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`p-2 rounded-lg border transition-colors ${
                  showFavoritesOnly
                    ? 'bg-red-50 border-red-300 text-red-600 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                title="Show favorites only"
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="updated">Recently Updated</option>
                <option value="created">Recently Created</option>
                <option value="usage">Most Used</option>
                <option value="rating">Highest Rated</option>
                <option value="title">Alphabetical</option>
              </select>

              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedPrompts.length} of {prompts.length} prompts
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${categoriesWithCounts.find(c => c.id === selectedCategory)?.name}`}
          </p>
          
          <button
            onClick={() => setShowKeyboardHelp(true)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Keyboard shortcuts (?)"
          >
            <Keyboard className="w-5 h-5" />
          </button>
        </div>

        {/* Prompts Grid/List */}
        {filteredAndSortedPrompts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedPrompts.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                viewMode={viewMode}
                onCopy={copyPrompt}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            showFavoritesOnly={showFavoritesOnly}
            onClearFilters={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setShowFavoritesOnly(false);
              setSelectedDifficulty('all');
            }}
          />
        )}
      </div>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsModal
          analytics={analytics}
          onClose={() => setShowAnalytics(false)}
        />
      )}

      {/* Keyboard Help Modal */}
      {showKeyboardHelp && (
        <KeyboardHelpModal onClose={() => setShowKeyboardHelp(false)} />
      )}
    </div>
  );
};

// Prompt Card Component
const PromptCard = ({ prompt, viewMode, onCopy, onToggleFavorite }) => {
  const [copyingModel, setCopyingModel] = useState(null);

  const handleCopy = async (model) => {
    setCopyingModel(model);
    try {
      await onCopy(prompt, model);
    } finally {
      setCopyingModel(null);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {prompt.title}
              </h3>
              {prompt.isCustom && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs rounded-full">
                  Custom
                </span>
              )}
              {prompt.difficulty && (
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(prompt.difficulty)}`}>
                  {prompt.difficulty}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {prompt.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {prompt.category}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {prompt.usageCount || 0} uses
              </span>
              {prompt.rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  {prompt.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onToggleFavorite(prompt.id)}
              className={`p-2 rounded-lg transition-colors ${
                prompt.isFavorite
                  ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${prompt.isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <div className="flex gap-1">
              {aiModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => handleCopy(model.id)}
                  disabled={copyingModel === model.id}
                  className={`${model.color} hover:opacity-90 disabled:opacity-50 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1`}
                  title={`Copy ${model.name} prompt (${model.shortcut})`}
                >
                  {copyingModel === model.id ? (
                    <InlineSpinner size="small" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {model.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {prompt.title}
          </h3>
          {prompt.isCustom && (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs rounded-full">
              Custom
            </span>
          )}
        </div>
        
        <button
          onClick={() => onToggleFavorite(prompt.id)}
          className={`p-1 rounded transition-colors ${
            prompt.isFavorite
              ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
              : 'text-gray-400 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${prompt.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {prompt.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full">
          {prompt.category}
        </span>
        {prompt.difficulty && (
          <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(prompt.difficulty)}`}>
            {prompt.difficulty}
          </span>
        )}
        {prompt.tags.slice(0, 2).map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
            {tag}
          </span>
        ))}
        {prompt.tags.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
            +{prompt.tags.length - 2} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {prompt.usageCount || 0}
          </span>
          {prompt.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current text-yellow-400" />
              {prompt.rating.toFixed(1)}
            </span>
          )}
        </div>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(prompt.updatedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {aiModels.map(model => (
          <button
            key={model.id}
            onClick={() => handleCopy(model.id)}
            disabled={copyingModel === model.id}
            className={`${model.color} hover:opacity-90 disabled:opacity-50 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1`}
            title={`Copy ${model.name} prompt (${model.shortcut})`}
          >
            {copyingModel === model.id ? (
              <InlineSpinner size="small" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ searchTerm, selectedCategory, showFavoritesOnly, onClearFilters }) => (
  <div className="text-center py-12">
    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      No prompts found
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      {searchTerm || selectedCategory !== 'all' || showFavoritesOnly
        ? 'Try adjusting your filters to see more results.'
        : 'Create your first prompt to get started!'}
    </p>
    {(searchTerm || selectedCategory !== 'all' || showFavoritesOnly) && (
      <button
        onClick={onClearFilters}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Clear all filters
      </button>
    )}
  </div>
);

// Notification Component
const Notification = ({ message, type, onClose }) => (
  <div className="fixed bottom-4 right-4 z-50">
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
      type === 'error' 
        ? 'bg-red-600 text-white' 
        : 'bg-green-600 text-white'
    }`}>
      {type === 'error' ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75">
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Analytics Modal Component
const AnalyticsModal = ({ analytics, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Grid3X3 className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Total Prompts</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{analytics.totalPrompts}</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Edit3 className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Custom Prompts</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{analytics.customPrompts}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Total Usage</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{analytics.totalUsage}</p>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Avg Rating</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{analytics.avgRating.toFixed(1)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Most Used Prompts</h3>
            <div className="space-y-3">
              {analytics.topUsed.map((prompt, index) => (
                <div key={prompt.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{prompt.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{prompt.usageCount || 0} uses</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Rated Prompts</h3>
            <div className="space-y-3">
              {analytics.topRated.map((prompt, index) => (
                <div key={prompt.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{prompt.title}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{prompt.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Keyboard Help Modal Component
const KeyboardHelpModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Focus search</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Ctrl + K</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Export prompts</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Ctrl + E</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Copy ChatGPT</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">1</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Copy Claude</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">2</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Copy Gemini</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">3</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Copy Copilot</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">4</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-900 dark:text-white">Show this help</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">?</kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DevPromptApp;