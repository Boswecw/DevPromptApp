// tailwind.config.js (ES Module)
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ✅ FIXED: Add line-clamp utilities manually since we don't have the plugin
      // This replaces the need for @tailwindcss/line-clamp plugin
    },
  },
  plugins: [
    // ✅ SIMPLIFIED: Removed line-clamp plugin dependency
    // If you want line-clamp, install: npm install @tailwindcss/line-clamp
    // Then uncomment: require('@tailwindcss/line-clamp'),
  ],
};