import { useGameStore } from 'lib/stores/game/game'
import { useTranslation } from 'react-i18next'

export const GameScore = () => {
  const { t } = useTranslation()
  const { guessedСountryIds, countryIds } = useGameStore()

  return (
    <span className="game__info">
      {t('score')}:{' '}
      <b>
        {guessedСountryIds.length} {t('outOf')} {countryIds.length}
      </b>
    </span>
  )
}
