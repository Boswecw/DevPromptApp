// src/components/PromptBuilder/index.js - CORRECTED VERSION

// Export main PromptBuilder component
export { default as PromptBuilder } from './PromptBuilder';

// Export all selector components
export { default as ModelSelector } from './ModelSelector';
export { default as LanguageSelector } from './LanguageSelector';
export { default as CategorySelector } from './CategorySelector';
export { default as DifficultySelector } from './DifficultySelector';
export { default as TechStackSelector } from './TechStackSelector';
export { default as FeatureTagsSelector } from './FeatureTagsSelector';

// Export other components
export { default as CustomRequirements } from './CustomRequirements';
export { default as PromptPreview } from './PromptPreview';
export { default as SavedPrompts } from './SavedPrompts';

// Export utilities and constants
export { generatePrompt } from './promptGenerator';
export {
  AI_MODELS,
  PROGRAMMING_LANGUAGES,
  CATEGORIES,
  DIFFICULTY_LEVELS,
  TECH_STACKS,
  FEATURE_TAGS
} from './constants';