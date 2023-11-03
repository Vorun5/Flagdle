import { useGameStore } from 'lib/stores/game'
import { useTranslation } from 'react-i18next'
import '../game-start.css'

export const GameStart = () => {
  const { t } = useTranslation()
  const { startGame } = useGameStore()

  return (
    <section className="box start-game">
      <h2 className="start-game__title">{t('rulesOfTheGame')}</h2>
      <ul className="start-game__rules">
        <li className="start-game__rule">{t('rules.manyFlagsShoretTime')}</li>
        <li className="start-game__rule">{t('rules.canEnterWrongFlagName')}</li>
      </ul>
      <button className="button action-btn" onClick={startGame}>
        {t('startTheGame')}
      </button>
    </section>
  )
}
