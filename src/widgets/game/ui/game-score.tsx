import { useGameStore } from 'lib/stores/game/game'
import { useTranslation } from 'react-i18next'

export const GameScore = () => {
  const { t } = useTranslation()
  const { guessedСountryIds, roundCountryIds } = useGameStore()
  const total = roundCountryIds.length

  return (
    <div className="game__score">
      <span>{t('score')}</span>
      <strong>
        {guessedСountryIds.length} / {total}
      </strong>
      <div
        className="game__progress"
        role="progressbar"
        aria-label={t('score')}
        aria-valuenow={guessedСountryIds.length}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <span style={{ width: `${total ? (guessedСountryIds.length / total) * 100 : 0}%` }} />
      </div>
    </div>
  )
}
