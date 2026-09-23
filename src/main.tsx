import { createRoot } from 'react-dom/client'
import { App } from './app'
import { StrictMode } from 'react'
import 'styles/reset.css'
import 'styles/index.css'
import 'styles/main.css'
import 'lib/i18n'
import { getSavedGameLanguage } from 'lib/stores/game/lib/init-game-store'
import { useGameStore } from 'lib/stores/game'

const startApp = async () => {
  const savedLanguage = getSavedGameLanguage()
  if (savedLanguage !== 'eng') {
    await useGameStore.getState().changeGameLanguage(savedLanguage)
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void startApp()
