import { COUNTRIES_LENGTH } from 'lib/consts/countries'
import { useGameStore } from 'lib/stores/game'

export const GameScore = () => {
  const { guessedСountryIds: guessedCountries } = useGameStore()

  return (
    <span className="game__info">
      Счет:{' '}
      <b>
        {guessedCountries.length} из {COUNTRIES_LENGTH}
      </b>
    </span>
  )
}
