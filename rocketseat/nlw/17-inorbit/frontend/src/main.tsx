import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

const queryClient = new QueryClient()

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
