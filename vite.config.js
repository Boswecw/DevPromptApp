// vite.config.js - DEVPROMPTAPP GITHUB PAGES CONFIG
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/DevPromptApp/',  // ← MUST match your GitHub repo name exactly (case-sensitive)

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'DevPrompt Generator',
        short_name: 'DevPrompt',
        description: 'The ultimate AI prompt builder for developers',
        theme_color: '#9333ea',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/DevPromptApp/',
        start_url: '/DevPromptApp/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/DevPromptApp/index.html',
      }
    })
  ],

  css: {
    postcss: './postcss.config.js',
  }
})
