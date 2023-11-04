import { useGameStore } from 'lib/stores/game/game'
import { convertTime } from 'lib/helpers/convert-time'
import { useTranslation } from 'react-i18next'

export const GameResult = () => {
  const { t } = useTranslation()
  const { lastResult } = useGameStore()

  if (!lastResult) return <></>

  const time = convertTime(lastResult.endTime - lastResult.startTime)

  return (
    <div className="game-result">
      <h2 className="game-result__title">{t('yourResult')}</h2>
      <span className="game-result__guessed">
        {t('resultFlags', {
          guessed: lastResult.guessedСountryIds.length,
          total: lastResult.countryIds.length,
        })}
      </span>
      <span className="game-result__time">
        {t('resultTime', { minutes: time.minutes, seconds: time.seconds })}
      </span>
    </div>
  )
}
