import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // ← THIS MUST BE HERE AND FIRST
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)