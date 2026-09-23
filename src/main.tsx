import { createRoot } from 'react-dom/client'
import { App } from './app'
import { StrictMode } from 'react'
import 'styles/index.css'
import 'styles/reset.css'
import 'styles/main.css'
import 'lib/i18n'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
