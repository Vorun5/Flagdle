import { CONUNTRIES } from 'lib/consts/countries'
import { useGameStore } from 'lib/stores/game'

export const GameScore = () => {
  const { guessedCountries } = useGameStore()

  return (
    <span className="game__info">
      Счет:{' '}
      <b>
        {guessedCountries.length} из {CONUNTRIES.length}
      </b>
    </span>
  )
}
