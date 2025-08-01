// src/components/PromptBuilder/ModelSelector.jsx
import React from 'react';
import { Zap, Check, DollarSign, TrendingDown, Search, BookOpen } from 'lucide-react';
import { AI_MODELS, COST_TIER_COLORS } from './constants.js';

const ModelSelector = ({ selectedModel, onModelChange }) => {
  const getModelIcon = (modelId) => {
    switch (modelId) {
      case 'deepseek': return <TrendingDown className="w-4 h-4" />;
      case 'qwen': return <Zap className="w-4 h-4" />;
      case 'perplexity': return <Search className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'COST SAVER': return 'bg-green-500 text-white';
      case 'CODING EXPERT': return 'bg-orange-500 text-white';
      case 'RESEARCH PRO': return 'bg-teal-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          AI Model
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {AI_MODELS.length} models available
        </div>
      </div>

      <div className="space-y-3">
        {AI_MODELS.map(model => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`w-full text-left px-4 py-4 rounded-lg text-sm font-medium transition-all duration-200 border-2 transform hover:scale-[1.02] relative overflow-hidden ${
              selectedModel === model.id
                ? 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600 shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            {/* Main model info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-lg">{model.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{model.name}</span>
                    {model.badge && (
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getBadgeColor(model.badge)}`}>
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${
                    selectedModel === model.id 
                      ? 'text-purple-100' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {model.description}
                  </p>
                </div>
              </div>
              
              {selectedModel === model.id && (
                <div className="flex items-center gap-1 ml-2">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Cost savings indicator */}
            {model.savings && (
              <div className={`flex items-center gap-2 mt-2 text-xs ${
                selectedModel === model.id 
                  ? 'text-green-200' 
                  : 'text-green-600 dark:text-green-400'
              }`}>
                <DollarSign className="w-3 h-3" />
                <span className="font-semibold">Save {model.savings}</span>
                {getModelIcon(model.id)}
              </div>
            )}

            {/* Unique feature indicator */}
            {model.unique && (
              <div className={`flex items-center gap-2 mt-2 text-xs ${
                selectedModel === model.id 
                  ? 'text-blue-200' 
                  : 'text-blue-600 dark:text-blue-400'
              }`}>
                <Search className="w-3 h-3" />
                <span className="font-medium">{model.unique}</span>
              </div>
            )}

            {/* Cost tier indicator */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-1">
                {model.specialties.slice(0, 3).map((specialty, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedModel === model.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                selectedModel === model.id 
                  ? 'bg-white/20 text-white' 
                  : COST_TIER_COLORS[model.costTier] || 'bg-gray-100 text-gray-600'
              }`}>
                {model.costTier.toUpperCase()}
              </span>
            </div>

            {/* Selection indicator */}
            {selectedModel === model.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* Cost comparison footer */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <TrendingDown className="w-4 h-4 text-green-600" />
          <span className="font-medium">New cost-effective models can save up to 90% on API costs</span>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;