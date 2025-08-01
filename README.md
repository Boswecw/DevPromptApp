[![Deploy to GitHub Pages](https://img.shields.io/github/deployments/boswecw/DevPromptApp/github-pages?label=Live%20App)](https://boswecw.github.io/DevPromptApp/)


# 🤖 DevPrompt Generator

> **The ultimate AI prompt builder for developers** - Generate perfect, tailored prompts for any coding task across multiple AI models and programming languages.

![DevPrompt Generator](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 **Multi-AI Support**
- **ChatGPT** - Comprehensive explanations with step-by-step details
- **Claude** - Clean architecture and maintainable code focus  
- **Gemini** - Creative approaches with modern patterns
- **GitHub Copilot** - Code-focused prompts with inline comments

### 💻 **10 Programming Languages**
JavaScript • TypeScript • Python • Java • C# • C++ • Rust • Go • PHP • Ruby

### 🏗️ **9 Code Categories**
- **Component** - UI components and reusable modules
- **Function** - Standalone functions and utilities  
- **Class** - Object-oriented classes and structures
- **API** - REST endpoints and web services
- **Database** - Queries, schemas, and migrations
- **Test** - Unit tests and test suites
- **Algorithm** - Data structures and algorithms
- **UI/UX** - User interface design and styling
- **♿ Accessibility** - WCAG 2.1 compliant implementations

### 🚀 **7 Tech Stacks**
- **🧠 Chuck's Power Stack (2025-2026)** - Bleeding-edge AI-first architecture
- **MERN Stack** - MongoDB, Express, React, Node.js
- **Next.js Full-Stack** - Integrated frontend and backend
- **Vue + Nuxt** - Vue ecosystem with Nuxt framework
- **React + Django** - React SPA with Python backend
- **Angular + .NET** - Enterprise Angular with .NET backend
- **Language Agnostic** - No specific stack requirements

### 🏷️ **Smart Feature Tags**
TypeSafe • Async • Error Handling • Validation • Testing • Performance • Security • Documentation • Responsive • Accessible • WCAG 2.1 • Screen Reader • Keyboard Nav • ARIA • Color Contrast

### 🌟 **Advanced Features**
- **💾 Auto-Save** - Prompts saved locally with browser storage
- **🌙 Dark Mode** - Beautiful theme switching with system preference detection
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **♿ Accessibility First** - Full WCAG 2.1 AA compliance
- **⚡ Real-time Preview** - See your generated prompt instantly
- **🔄 Import/Export** - Share prompt configurations
- **📊 Storage Management** - Smart error handling and recovery

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **Yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dev-prompt-app.git
cd dev-prompt-app

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build for Production

```bash
# Build the app
yarn build

# Preview the build
yarn preview
```

## 📖 Usage Guide

### 1. **Select Your AI Model**
Choose from ChatGPT, Claude, Gemini, or GitHub Copilot. Each model has optimized prompt templates.

### 2. **Pick Your Language & Category**
Select your programming language and the type of code you want to create (component, function, API, etc.).

### 3. **Configure Difficulty & Tech Stack**
- **Beginner**: Simple, well-commented code
- **Intermediate**: Best practices and moderate complexity  
- **Advanced**: Production-ready, optimized implementations

Choose a tech stack or go language-agnostic.

### 4. **Add Feature Tags**
Select features like TypeSafe, Async, Error Handling, Security, Accessibility, etc.

### 5. **Custom Requirements**
Add specific requirements, constraints, or preferences in the text area.

### 6. **Generate & Use**
- **Preview** your generated prompt
- **Copy** to clipboard with one click
- **Save** configurations for later use
- **Load** previously saved prompts

## 🎨 Special Features

### 🧠 Chuck's Power Stack (2025-2026)
A bleeding-edge tech stack featuring:
- **Frontend**: SvelteKit or SolidJS + Tailwind + Framer Motion
- **Backend**: Python + FastAPI + LangChain or Ollama  
- **Deployment**: Vercel or Cloudflare Workers
- **Edge Computing**: Rust + WASM for client-side AI tasks

### ♿ Accessibility Category
Special category for creating WCAG 2.1 AA compliant code with:
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

## 🛠️ Tech Stack

- **Frontend**: React 19.1, Vite 7.0, Tailwind CSS 3.4
- **Icons**: Lucide React
- **Storage**: LocalStorage with error handling
- **Themes**: CSS custom properties with dark mode
- **Build**: Vite with PostCSS and Autoprefixer
- **Code Quality**: ESLint with React plugins

## 📁 Project Structure

```
dev-prompt-app/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── PromptBuilder/   # Main prompt builder components
│   │   ├── ErrorBoundary.jsx
│   │   ├── ThemeProvider.jsx
│   │   └── index.js
│   ├── hooks/               # Custom React hooks
│   │   ├── useTheme.js
│   │   ├── useStorage.js
│   │   └── useThemeContext.js
│   ├── contexts/            # React contexts
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.js          # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Development

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production  
yarn preview      # Preview production build
yarn lint         # Run ESLint
```

### Environment Setup

The app uses modern ES modules and requires:
- Node.js 18+
- Modern browser with ES2020+ support
- LocalStorage for data persistence

## 🌟 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Add proper TypeScript types where applicable
- Ensure accessibility compliance (WCAG 2.1 AA)
- Test in both light and dark modes
- Verify responsive design on multiple screen sizes

## 🐛 Known Issues & Troubleshooting

### Styling Issues
If styles aren't loading:
```bash
# Clear cache and reinstall
yarn cache clean
rm -rf node_modules/.vite
yarn install
yarn dev
```

### Storage Issues
The app gracefully handles LocalStorage issues:
- **Quota exceeded**: Clear old data or export prompts
- **Storage disabled**: App works in session-only mode
- **Data corruption**: Automatic recovery with user confirmation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the beautiful utility-first styling
- **Lucide React** for the comprehensive icon set
- **Vite** for the lightning-fast development experience
- **React Team** for the amazing framework

## 📊 Project Stats

- **Components**: 20+ reusable React components
- **AI Models**: 4 supported platforms
- **Languages**: 10 programming languages
- **Categories**: 9 code categories including accessibility
- **Tech Stacks**: 7 modern development stacks
- **Feature Tags**: 15+ customization options

---

**Made with ❤️ for developers who want perfect AI prompts**

*Star ⭐ this repo if you find it useful!*