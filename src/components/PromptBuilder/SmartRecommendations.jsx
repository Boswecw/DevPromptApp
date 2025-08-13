// src/components/PromptBuilder/SmartRecommendations.jsx
import React from 'react';
import { Lightbulb, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { AI_MODELS } from './constants';

const SmartRecommendations = ({ 
  selectedModel, 
  selectedCategory, 
  selectedLanguage,
  recommendedModels, 
  onModelChange, 
  categoryObj 
}) => {
  // Don't show recommendations if user is already using a recommended model
  if (recommendedModels.length === 0 || recommendedModels.includes(selectedModel)) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="font-medium text-green-800 dark:text-green-300">
            Optimal Choice!
          </h3>
        </div>
        <p className="text-sm text-green-700 dark:text-green-400">
          You're using an AI model that's optimized for <span className="font-medium">{categoryObj?.name || selectedCategory}</span> tasks.
        </p>
      </div>
    );
  }

  const getModelInfo = (modelId) => {
    return AI_MODELS.find(m => m.id === modelId);
  };

  const getRecommendationReason = (modelId) => {
    const model = getModelInfo(modelId);
    if (!model) return null;

    // Simple reasoning based on category
    const reasons = {
      'component': 'Excellent at generating reusable UI components',
      'function': 'Optimized for clean, efficient function creation',
      'class': 'Great at object-oriented programming patterns',
      'api': 'Specialized in API design and implementation',
      'database': 'Strong with data modeling and queries',
      'test': 'Expert at comprehensive test coverage',
      'algorithm': 'Excellent at complex problem solving',
      'ui': 'Perfect for modern UI/UX implementations',
      'accessibility': 'Specialized in accessible web development'
    };

    return reasons[selectedCategory] || 'Optimized for your current task';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-medium text-blue-800 dark:text-blue-300">
          Smart Suggestions
        </h3>
      </div>
      
      <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
        For <span className="font-medium">{categoryObj?.name || selectedCategory}</span> in{' '}
        <span className="font-medium">{selectedLanguage}</span>, consider:
      </p>
      
      <div className="space-y-3">
        {recommendedModels.slice(0, 2).map(modelId => {
          const model = getModelInfo(modelId);
          const reason = getRecommendationReason(modelId);
          
          if (!model) return null;
          
          return (
            <button
              key={modelId}
              onClick={() => onModelChange(modelId)}
              className="w-full text-left p-4 bg-white dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-800/30 rounded-lg border border-blue-200 dark:border-blue-700 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-xl">{model.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {model.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {reason}
                    </div>
                    {model.costTier === 'budget' && (
                      <div className="flex items-center space-x-1 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Cost-effective
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Performance indicator */}
      <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Recommendations based on task type and model capabilities
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;