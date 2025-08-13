// src/components/PromptBuilder/promptGenerator.js
// Extracted prompt generation logic from the main component

import {
  AI_MODELS,
  PROGRAMMING_LANGUAGES,
  CATEGORIES,
  DIFFICULTY_LEVELS,
  TECH_STACKS
} from './constants';

// ---------- NEW: lightweight model recommendation ----------
/**
 * Returns an ordered array of model IDs best suited for the given selection.
 * Keep this simple & local so it works with your current model list.
 */
export const recommendModel = (selectedCategory, selectedDifficulty, selectedTags = [], selectedLanguage) => {
  const tags = (selectedTags || []).map(String);
  const lang = String(selectedLanguage || '');

  // Simple rules that work with your current constants (chatgpt, claude, gemini, copilot)
  const rec = [];

  // Accessibility-heavy tasks → ChatGPT or Claude first
  const isA11y =
    tags.some(t =>
      /wcag|aria|screen reader|keyboard|accessible|contrast/i.test(t)
    ) || selectedCategory === 'accessibility';

  // Test / algorithm / advanced → Claude or Gemini do well for reasoning
  const isReasoningHeavy =
    selectedCategory === 'algorithm' ||
    selectedCategory === 'test' ||
    selectedDifficulty === 'advanced';

  // UI / component work → ChatGPT usually best balance
  const isUI =
    selectedCategory === 'ui' || selectedCategory === 'component';

  if (isA11y) {
    rec.push('chatgpt', 'claude', 'gemini', 'copilot');
  } else if (isReasoningHeavy) {
    rec.push('claude', 'gemini', 'chatgpt', 'copilot');
  } else if (isUI) {
    rec.push('chatgpt', 'gemini', 'claude', 'copilot');
  } else {
    // Default balanced rec
    rec.push('chatgpt', 'gemini', 'claude', 'copilot');
  }

  // De-duplicate and keep only models that exist in constants
  const available = new Set(AI_MODELS.map(m => m.id));
  return rec.filter((id, i) => available.has(id) && rec.indexOf(id) === i);
};

// ---------- NEW: simple cost-savings estimator ----------
/**
 * Returns { savings: number, recommended: boolean }
 * Compares selected model vs a simple "premium baseline".
 * Numbers are illustrative and only used for the UI badge.
 */
export const calculateCostSavings = (selectedModel, tokens = 1000) => {
  // Simple per-million-tokens estimates (illustrative)
  const PRICE = {
    chatgpt: 15,   // $/MTok
    claude: 18,
    gemini: 12,
    copilot: 8
  };

  // Fallback to ChatGPT if unknown model
  const sel = PRICE[selectedModel] ?? PRICE.chatgpt;

  // Use the highest of the three "premium" models as the baseline
  const premiumBaseline = Math.max(PRICE.chatgpt, PRICE.claude, PRICE.gemini); // 18

  // Savings percentage vs baseline (floor at 0)
  const savings = Math.max(0, Math.round((1 - sel / premiumBaseline) * 100));

  // "Recommended" if the selected model is the cheapest in our table
  const cheapest = Math.min(...Object.values(PRICE));
  const recommended = sel === cheapest;

  return { savings, recommended };
};

export const generatePrompt = ({
  selectedModel,
  selectedLanguage,
  selectedCategory,
  selectedDifficulty,
  selectedTechStack,
  selectedTags,
  customRequirements
}) => {
  const model = AI_MODELS.find(m => m.id === selectedModel);
  const language = PROGRAMMING_LANGUAGES.find(l => l.id === selectedLanguage);
  const category = CATEGORIES.find(c => c.id === selectedCategory);
  const difficulty = DIFFICULTY_LEVELS.find(d => d.id === selectedDifficulty);
  const techStack = TECH_STACKS.find(s => s.id === selectedTechStack);

  if (!model || !language || !category || !difficulty || !techStack) {
    return 'Please select all required options to generate a prompt.';
  }

  // Build tech stack context - ENHANCED FOR CHUCK'S POWER STACK
  const stackContext = techStack.id !== 'none'
    ? `
**Tech Stack Context:**
- Frontend: ${techStack.frontend}
- Backend: ${techStack.backend}
- Deployment: ${techStack.deployment}
${techStack.edge ? `- Edge Computing: ${techStack.edge}` : ''}
- Architecture: ${techStack.description}
`
    : '';

  // Build custom requirements
  const customContext = customRequirements
    ? `
**Additional Requirements:**
${customRequirements}
`
    : '';

  // Category-specific prompt templates
  const promptTemplates = {
    component: `Create a ${language.name} component with:
- ${difficulty.name} level functionality
- Features: ${(selectedTags || []).join(', ').toLowerCase()}
- Modern ${language.name} component patterns
${stackContext}${customContext}

Deliver:
- Complete component code
- Styling (CSS/styled-components)
- Props interface/type definitions
- Usage examples
- Accessibility considerations
${techStack.id !== 'none' ? `- Integration with ${techStack.frontend} patterns and animations` : ''}
${techStack.id === 'chucks-power-stack' ? '- Advanced animations with Framer Motion and potential client-side AI features' : ''}`,

    function: `Build a ${language.name} function that:
- ${difficulty.name} complexity level
- Incorporates: ${(selectedTags || []).join(', ').toLowerCase()}
- Follows ${language.name} best practices
${stackContext}${customContext}

Requirements:
- Well-documented with JSDoc/docstrings
- Include error handling
- Provide usage examples
- Optimize for readability and performance
${techStack.id !== 'none' ? `- Consider integration with ${techStack.name} architecture` : ''}`,

    class: `Design a ${language.name} class with:
- ${difficulty.name} level architecture
- Incorporates: ${(selectedTags || []).join(', ').toLowerCase()}
- Follows OOP principles for ${language.name}
${stackContext}${customContext}

Include:
- Constructor with proper parameter validation
- Public and private methods
- Properties with appropriate access modifiers
- Documentation for all public members
- Usage example with instantiation
${techStack.id !== 'none' ? `- Integration patterns for ${techStack.name} stack` : ''}`,

    api: `Create a ${language.name} API ${category.name.toLowerCase()} featuring:
- ${difficulty.name} level implementation
- Includes: ${(selectedTags || []).join(', ').toLowerCase()}
- RESTful design principles
${stackContext}${customContext}

Provide:
- Complete endpoint implementation
- Request/response schemas
- Error handling middleware
- Authentication/authorization if needed
- API documentation
${techStack.id !== 'none' ? `- Deployment configuration for ${techStack.deployment}` : ''}`,

    database: `Build a ${language.name} database integration that:
- ${difficulty.name} level complexity
- Implements: ${(selectedTags || []).join(', ').toLowerCase()}
- Uses modern ${language.name} database libraries
${stackContext}${customContext}

Include:
- Connection management
- Query builders or ORM usage
- Migration scripts
- Error handling and logging
- Performance optimizations
${techStack.id !== 'none' ? `- Integration with ${techStack.backend} backend patterns` : ''}
${techStack.id === 'chucks-power-stack' ? '- Consider AI/ML integration patterns and edge computing optimization' : ''}`,

    test: `Generate ${language.name} test suite with:
- ${difficulty.name} level test coverage
- Incorporates: ${(selectedTags || []).join(', ').toLowerCase()}
- Uses popular ${language.name} testing frameworks
${stackContext}${customContext}

Provide:
- Unit tests with multiple scenarios
- Integration tests if applicable
- Mock data and fixtures
- Test utilities and helpers
- Coverage configuration
${techStack.id !== 'none' ? `- E2E testing setup for ${techStack.name} stack` : ''}`,

    algorithm: `Implement a ${language.name} algorithm that:
- ${difficulty.name} complexity level
- Optimized for: ${(selectedTags || []).join(', ').toLowerCase()}
- Follows ${language.name} performance best practices
${stackContext}${customContext}

Include:
- Time and space complexity analysis
- Multiple solution approaches
- Edge case handling
- Performance benchmarks
- Clear step-by-step comments
${techStack.id !== 'none' ? `- Optimization considerations for ${techStack.name} environment` : ''}
${techStack.id === 'chucks-power-stack' ? '- AI-first optimization and potential WASM/Rust integration for performance-critical parts' : ''}`,

    ui: `Create a ${language.name} UI component with:
- ${difficulty.name} level functionality
- Features: ${(selectedTags || []).join(', ').toLowerCase()}
- Modern ${language.name} UI patterns
${stackContext}${customContext}

Deliver:
- Complete component code
- Styling (CSS/styled-components)
- Props interface/type definitions
- Usage examples
- Accessibility considerations
${techStack.id !== 'none' ? `- Integration with ${techStack.frontend} patterns and animations` : ''}
${techStack.id === 'chucks-power-stack' ? '- Advanced animations with Framer Motion and potential client-side AI features' : ''}`,

    // NEW ACCESSIBILITY PROMPTS
    accessibility: `Create a fully accessible ${language.name} implementation with ${difficulty.name} level complexity that includes:

🛠️ **WCAG 2.1 AA Compliance:**
- Follow WCAG 2.1 guidelines, specifically Level AA requirements
- Ensure all interactive elements are accessible via keyboard and screen readers
- Implement proper focus management and visual focus indicators
- Include ${(selectedTags || []).join(', ').toLowerCase()} where applicable

🌐 **Semantic HTML & Structure:**
- Use semantic HTML5 elements (header, nav, main, section, article, aside, footer)
- Implement proper heading hierarchy (h1-h6) with logical document outline
- Use appropriate HTML form elements with labels and fieldsets
- Include landmark roles where semantic elements aren't sufficient

🎨 **Visual & Color Accessibility:**
- Ensure minimum 4.5:1 color contrast for normal text (7:1 for ${selectedDifficulty === 'advanced' ? 'enhanced' : 'normal'})
- Provide alternative text for all images and icons
- Design for colorblind users (don't rely solely on color)
- Support high contrast and reduced motion preferences

⌨️ **Keyboard & Screen Reader Support:**
- Full keyboard navigation with logical tab order
- Proper ARIA labels, descriptions, and live regions
- Screen reader announcements for dynamic content
- Skip links and focus management for single-page applications

${stackContext}${customContext}

**Implementation Requirements:**
- Complete working code with accessibility features
- Testing instructions for screen readers and keyboard navigation
- Documentation of accessibility features implemented
- Performance considerations for assistive technologies
${techStack.id !== 'none' ? `- Integration with ${techStack.frontend} accessibility tools and libraries` : ''}
- Performance impact of accessibility features
${techStack.id === 'chucks-power-stack' ? '- AI-powered accessibility enhancements and edge-optimized assistive technology support' : ''}`
  };

  let basePrompt = promptTemplates[selectedCategory] || promptTemplates.component;

  // Model-specific modifications
  switch (selectedModel) {
    case 'claude':
      basePrompt = basePrompt
        .replace('Create a', 'I need you to help me create a')
        .replace('Build a', 'Please help me build a')
        .replace("Design a", "Let's work together to design a");
      break;
    case 'gemini':
      basePrompt = `**Context:** I'm working on a ${language.name} project and need your creative input.

${basePrompt}

**Additional Context:** Please be creative and suggest innovative approaches where possible.`;
      break;
    case 'copilot':
      basePrompt = `// ${language.name} ${selectedCategory} request
${basePrompt}

Please provide inline comments and suggest VS Code extensions that might be helpful.`;
      break;
  }

  return basePrompt;
};
