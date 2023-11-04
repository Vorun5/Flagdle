import { useGameStore } from 'lib/stores/game/game'
import { convertTime } from 'lib/helpers/convert-time'
import { useTranslation } from 'react-i18next'

export const GameResult = () => {
  const { t } = useTranslation()
  const { guessedСountryIds, startTime, endTime, countryIds } = useGameStore()
  const time = convertTime(endTime - startTime)

  return (
    <div className="game-result">
      <h3 className="game-result__title">{t('yourResult')}</h3>
      <span className="game-result__guessed">
        {t('resultFlags', { guessed: guessedСountryIds.length, total: countryIds.length })}
      </span>
      <span className="game-result__time">
        {t('resultTime', { minutes: time.minutes, seconds: time.seconds })}
      </span>
    </div>
  )
}
