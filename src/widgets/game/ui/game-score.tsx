import { COUNTRIES_LENGTH } from 'lib/consts/countries'
import { useGameStore } from 'lib/stores/game'
import { useTranslation } from 'react-i18next'

export const GameScore = () => {
  const { t } = useTranslation()
  const { guessedСountryIds: guessedCountries } = useGameStore()

  return (
    <span className="game__info">
      {t('score')}:{' '}
      <b>
        {guessedCountries.length} {t('outOf')} {COUNTRIES_LENGTH}
      </b>
    </span>
  )
}
