import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App.tsx'
import ThemeProvider from './providers/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
