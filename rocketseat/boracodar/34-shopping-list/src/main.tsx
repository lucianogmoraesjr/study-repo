import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { OptionProvider } from './contexts/OptionContext.tsx'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OptionProvider>
      <App />
    </OptionProvider>
  </React.StrictMode>,
)
