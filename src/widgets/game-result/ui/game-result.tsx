import { useGameStore } from 'lib/stores/game'
import { COUNTRIES_LENGTH } from 'lib/consts/countries'
import { convertTime } from 'lib/helpers/convert-time'
import '../game-result.css'

export const GameResult = () => {
  const { guessedСountryIds, startTime, endTime, startGame } = useGameStore()
  const time = convertTime(endTime - startTime)

  return (
    <section className="box game-result">
      <h3 className="game-result__title">Ваш результат!</h3>
      <span className="game-result__guessed">
        Отгадано {guessedСountryIds.length} из {COUNTRIES_LENGTH} флагов
      </span>
      <span className="game-result__time">
        За {time.minutes !== 0 && <>{time.minutes} мин. и </>}
        {time.seconds} сек.
      </span>
      <button className="button action-btn" onClick={startGame}>
        Начать новую партию
      </button>
    </section>
  )
}
