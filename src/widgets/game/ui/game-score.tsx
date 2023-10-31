import { useCountriesStore } from 'lib/stores/countries'
import { useGameStore } from 'lib/stores/game'

export const GameScore = () => {
  const { countries } = useCountriesStore()
  const { guessedCountries } = useGameStore()

  return (
    <span className="game__info">
      Счет:{' '}
      <b>
        {guessedCountries.length} из {countries.length}
      </b>
    </span>
  )
}
