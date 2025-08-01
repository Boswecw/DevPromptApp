// src/components/PromptBuilder/promptGenerator.js
// Enhanced prompt generator with new AI models

import { MODEL_CAPABILITIES } from './constants.js';

export const generatePrompt = (config) => {
  const {
    selectedModel,
    selectedLanguage,
    selectedCategory,
    selectedDifficulty,
    selectedTechStack,
    selectedFeatures,
    customRequirements
  } = config;

  const language = selectedLanguage;
  const difficulty = selectedDifficulty;
  const techStack = selectedTechStack;
  const features = selectedFeatures || [];
  const customContext = customRequirements ? `\n\n**Additional Requirements:**\n${customRequirements}` : '';
  
  // Tech stack context
  const stackContext = techStack.id !== 'none' ? 
    `\n\n**Tech Stack Context:**\n- Frontend: ${techStack.frontend}\n- Backend: ${techStack.backend}\n- Database: ${techStack.database}\n- Features: ${techStack.features}` : '';

  // Features context
  const featuresContext = features.length > 0 ? 
    `\n\n**Required Features:** ${features.join(', ')}` : '';

  // Language-specific considerations
  const isMarkupLanguage = ['html', 'css'].includes(language.id);
  const languageContext = isMarkupLanguage ? 
    `\n\n**${language.name} Specific Requirements:**${
      language.id === 'html'
        ? '\n- Semantic HTML5 elements and proper document structure' +
          '\n- Accessibility attributes (ARIA labels, alt text, proper headings)' +
          '\n- SEO-friendly markup and meta tags' +
          '\n- Cross-browser compatibility considerations'
        : language.id === 'css'
        ? '\n- Modern CSS features (Grid, Flexbox, Custom Properties)' +
          '\n- Responsive design with mobile-first approach' +
          '\n- Performance optimization (efficient selectors, minimal reflow)' +
          '\n- Browser compatibility and vendor prefixes where needed'
        : ''
    }` : '';

  // Base prompt templates for each category
  const promptTemplates = {
    component: `Create a ${difficulty.name.toLowerCase()}-level ${language.name} ${selectedCategory} that demonstrates modern development practices.

The ${selectedCategory} should be:
- Well-structured and maintainable
- Include proper error handling and validation
- Follow ${language.name} best practices and conventions
- Include comprehensive comments explaining the logic
- Be production-ready and scalable

${difficulty.name === 'Beginner' ? 'Focus on clear, simple code with extensive explanations.' : ''}
${difficulty.name === 'Intermediate' ? 'Include moderate complexity with best practices and optimization.' : ''}
${difficulty.name === 'Advanced' ? 'Implement advanced patterns, performance optimizations, and enterprise-grade features.' : ''}

${stackContext}${featuresContext}${languageContext}${customContext}`,

    function: `Develop a ${difficulty.name.toLowerCase()}-level ${language.name} function with the following specifications:

**Requirements:**
- Pure function design with predictable inputs/outputs
- Comprehensive error handling and edge case management
- Type safety (if applicable to ${language.name})
- Unit test examples and usage documentation
- Performance considerations and optimization notes

${difficulty.name === 'Advanced' ? '- Advanced algorithmic optimization and memory efficiency\n- Concurrent/parallel processing capabilities where applicable' : ''}

${stackContext}${featuresContext}${customContext}`,

    api: `Design and implement a ${difficulty.name.toLowerCase()}-level ${language.name} API endpoint with:

**Core Features:**
- RESTful design principles and proper HTTP methods
- Input validation and sanitization
- Authentication and authorization handling
- Comprehensive error responses with proper status codes
- Rate limiting and security best practices
- API documentation and example requests/responses

${difficulty.name === 'Advanced' ? '- Implement caching strategies and performance monitoring\n- Database optimization and connection pooling\n- Microservices architecture considerations' : ''}

${stackContext}${featuresContext}${customContext}`,

    database: `Create a ${difficulty.name.toLowerCase()}-level ${language.name} database solution including:

**Database Design:**
- Normalized schema design with proper relationships
- Efficient indexing strategy
- Data validation and constraints
- Migration scripts and version control
- Query optimization and performance tuning
- Backup and recovery procedures

${difficulty.name === 'Advanced' ? '- Horizontal scaling strategies\n- Data partitioning and sharding\n- Performance monitoring and analytics' : ''}

${stackContext}${featuresContext}${customContext}`,

    test: `Develop a comprehensive ${difficulty.name.toLowerCase()}-level test suite for ${language.name}:

**Testing Strategy:**
- Unit tests with high code coverage
- Integration tests for system interactions
- End-to-end testing scenarios
- Mock and stub implementations
- Test data management and cleanup
- Continuous integration compatibility

${difficulty.name === 'Advanced' ? '- Performance and load testing\n- Security testing and vulnerability assessment\n- Contract testing for APIs' : ''}

${stackContext}${featuresContext}${customContext}`,

    algorithm: `Implement a ${difficulty.name.toLowerCase()}-level ${language.name} algorithm with:

**Algorithm Requirements:**
- Optimal time and space complexity
- Clear mathematical explanation of the approach
- Step-by-step implementation with comments
- Multiple test cases with expected outputs
- Performance analysis and Big O notation
- Alternative approaches and trade-offs discussion

${difficulty.name === 'Advanced' ? '- Parallel processing optimizations\n- Memory-efficient implementations\n- Real-world scalability considerations' : ''}

${stackContext}${featuresContext}${customContext}`,

    ui: `Design and develop a ${difficulty.name.toLowerCase()}-level ${language.name} UI/UX ${isMarkupLanguage ? 'implementation' : 'component'}:

**Design Requirements:**
- Modern, responsive design that works across devices
- ${language.id === 'html' ? 'Semantic HTML5 structure with proper accessibility' : language.id === 'css' ? 'Advanced CSS techniques (Grid, Flexbox, Animations)' : 'Consistent styling and design system integration'}
- Interactive elements with smooth animations
- Loading states and error handling UX
- Accessibility compliance (WCAG 2.1)
- Performance optimization for smooth interactions
- ${language.id === 'css' ? 'CSS-only solutions where possible (no JavaScript dependencies)' : 'Cross-browser compatibility and progressive enhancement'}

${difficulty.name === 'Advanced' ? '- Advanced animations and micro-interactions\n- State management and data flow optimization\n- Progressive enhancement and graceful degradation' : ''}

${stackContext}${featuresContext}${languageContext}${customContext}`,

    class: `Create a ${difficulty.name.toLowerCase()}-level ${language.name} class implementation:

**Class Design:**
- Object-oriented principles (encapsulation, inheritance, polymorphism)
- Clear interface and public/private methods
- Constructor validation and initialization
- Error handling and exception management
- Documentation and usage examples
- Thread safety considerations (if applicable)

${difficulty.name === 'Advanced' ? '- Design patterns implementation\n- Memory management and resource cleanup\n- Performance optimization and caching' : ''}

${stackContext}${featuresContext}${customContext}`,

    accessibility: `Develop a ${difficulty.name.toLowerCase()}-level ${language.name} accessibility-focused implementation:

**Accessibility Requirements:**
- WCAG 2.1 AA compliance
- Semantic HTML and proper ARIA attributes
- Keyboard navigation and focus management
- Screen reader compatibility and announcements
- Color contrast and visual accessibility
- Responsive design for various devices and orientations

${difficulty.name === 'Advanced' ? '- Advanced ARIA patterns and complex widgets\n- Performance optimization for assistive technologies\n- Automated accessibility testing integration' : ''}

${stackContext}${featuresContext}${customContext}`
  };

  let basePrompt = promptTemplates[selectedCategory] || promptTemplates.component;

  // Model-specific enhancements
  switch (selectedModel) {
    case 'deepseek':
      basePrompt = `**DeepSeek R1 - Advanced Reasoning Mode**

${basePrompt}

**Reasoning Requirements:**
- Show mathematical/logical reasoning steps
- Explain algorithmic complexity and optimization decisions
- Provide multiple solution approaches with trade-off analysis
- Include performance benchmarks and complexity analysis
- Demonstrate advanced problem-solving techniques

**Focus Areas:** Mathematical precision, logical flow, optimization strategies`;
      break;

    case 'qwen':
      basePrompt = `**Qwen 2.5 Max - Coding Excellence Mode**

${basePrompt}

**Coding Excellence Standards:**
- Production-ready code with enterprise-grade quality
- Multi-language best practices and conventions
- Advanced error handling and edge case management
- Performance optimization and scalability considerations
- Comprehensive testing and documentation

**Optimization Focus:** Code quality, performance, maintainability, scalability`;
      break;

    case 'perplexity':
      basePrompt = `**Perplexity Pro - Research-Enhanced Mode**

${basePrompt}

**Research Requirements:**
- Include current best practices and industry standards
- Reference recent documentation and official guidelines
- Provide links to relevant resources and documentation
- Compare different approaches with pros/cons
- Include real-world examples and case studies
- Cite authoritative sources and official documentation

**Research Focus:** Current trends, best practices, authoritative sources, practical examples`;
      break;

    case 'claude':
      basePrompt = basePrompt.replace('Create a', 'I need you to help me create a')
        .replace('Build a', 'Please help me build a')
        .replace('Design a', 'Let\'s work together to design a')
        .replace('Develop a', 'Please assist me in developing a');
      basePrompt += `\n\n**Claude Enhancement:** Focus on clean architecture, maintainable code structure, and detailed explanations of design decisions.`;
      break;

    case 'gemini':
      basePrompt = `**Context:** I'm working on a ${language.name} project and need your creative input.

${basePrompt}

**Creative Enhancement:** Please suggest innovative approaches, modern patterns, and creative solutions where possible. Include alternative implementations and explain the reasoning behind design choices.`;
      break;

    case 'copilot':
      basePrompt = `// ${language.name} ${selectedCategory} request

${basePrompt}

**GitHub Copilot Enhancement:** Please provide inline comments, suggest VS Code extensions that might be helpful, and include practical implementation examples with code snippets.`;
      break;

    default:
      // Default ChatGPT behavior
      basePrompt += `\n\n**Standard Mode:** Provide comprehensive explanations with step-by-step implementation details and best practices.`;
  }

  // Add model-specific optimization suggestions
  if (MODEL_CAPABILITIES[selectedModel]) {
    const capabilities = MODEL_CAPABILITIES[selectedModel];
    if (capabilities.bestFor.includes(selectedCategory)) {
      basePrompt += `\n\n**Model Optimization:** This prompt is optimized for ${selectedModel.toUpperCase()}, which excels at ${capabilities.strengths.join(', ')}. Expected superior results for this task type.`;
    }
  }

  return basePrompt;
};

// Smart model recommendation based on category and requirements
export const recommendModel = (category, difficulty, features = [], languageId = '') => {
  const recommendations = {
    algorithm: ['deepseek', 'qwen'],
    function: ['deepseek', 'qwen'],
    class: ['qwen', 'claude'],
    api: ['qwen', 'claude'],
    database: ['qwen', 'deepseek'],
    component: ['qwen', 'claude'],
    ui: ['claude', 'gemini', 'qwen'], // Enhanced for HTML/CSS
    test: ['qwen', 'deepseek'],
    accessibility: ['claude', 'chatgpt']
  };

  // HTML/CSS specific recommendations
  if (['html', 'css'].includes(languageId)) {
    if (category === 'ui' || category === 'component') {
      return ['claude', 'qwen', 'gemini']; // Best for markup and styling
    }
    if (category === 'accessibility') {
      return ['claude', 'perplexity', 'chatgpt']; // Best for accessibility research
    }
  }

  // Research-heavy tasks
  if (features.includes('Documentation') || difficulty === 'advanced') {
    return ['perplexity', ...(recommendations[category] || ['qwen'])];
  }

  // Cost-sensitive recommendations
  if (features.includes('Performance') || features.includes('Scalable')) {
    return ['qwen', 'deepseek'];
  }

  return recommendations[category] || ['qwen', 'deepseek', 'claude'];
};

// Cost calculator for API usage
export const calculateCostSavings = (selectedModel, tokensUsed = 1000) => {
  const baseCost = {
    chatgpt: 0.03,      // $0.03 per 1K tokens (GPT-4)
    claude: 0.025,      // $0.025 per 1K tokens (Claude Sonnet)
    gemini: 0.02,       // $0.02 per 1K tokens
    copilot: 0.02,      // $0.02 per 1K tokens
    deepseek: 0.003,    // $0.003 per 1K tokens (90% savings)
    qwen: 0.0025,       // $0.0025 per 1K tokens (90% savings)
    perplexity: 0.015   // $0.015 per 1K tokens
  };

  const currentCost = (baseCost[selectedModel] || baseCost.chatgpt) * (tokensUsed / 1000);
  const gpt4Cost = baseCost.chatgpt * (tokensUsed / 1000);
  const savings = ((gpt4Cost - currentCost) / gpt4Cost) * 100;

  return {
    currentCost: currentCost.toFixed(4),
    gpt4Cost: gpt4Cost.toFixed(4),
    savings: Math.max(0, savings).toFixed(1),
    recommended: savings > 50
  };
};