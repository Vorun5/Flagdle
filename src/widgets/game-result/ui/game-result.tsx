import { useGameStore } from 'lib/stores/game'
import { COUNTRIES_LENGTH } from 'lib/consts/countries'
import { convertTime } from 'lib/helpers/convert-time'
import { useTranslation } from 'react-i18next'
import '../game-result.css'

export const GameResult = () => {
  const { t } = useTranslation()
  const { guessedСountryIds, startTime, endTime, startGame } = useGameStore()
  const time = convertTime(endTime - startTime)

  return (
    <section className="box game-result">
      <h3 className="game-result__title">{t('yourResult')}</h3>
      <span className="game-result__guessed">
        {t('resultFlags', { guessed: guessedСountryIds.length, total: COUNTRIES_LENGTH })}
      </span>
      <span className="game-result__time">
        {t('resultTime', { minutes: time.minutes, seconds: time.seconds })}
      </span>
      <button className="button action-btn" onClick={startGame}>
        {t('startNewGame')}
      </button>
    </section>
  )
}
