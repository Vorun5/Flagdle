import { useGameStore } from 'lib/stores/game'
import './game-result.css'
import { useCountriesStore } from 'lib/stores/countries'
import { Modal } from 'components/modal/modal'
import { useState } from 'react'

export const GameResult = () => {
  const { countries } = useCountriesStore()
  const { guessedCountries, startTime, endTime, startGame } = useGameStore()
  const time = endTime - startTime
  const [opened, setOpened] = useState(false)

  return (
    <section className="box">
      <span>
        Отгадано: {guessedCountries.length} из {countries.length}
      </span>
      <span>
        Время: {Math.floor(time / 1000 / 60) !== 0 && <>{Math.floor(time / 1000 / 60)} мин. </>}
        {Math.round((time / 1000) % 60)} сек. секунд
      </span>
      <button className="button" onClick={() => setOpened(true)}>
        Начать новую партию
      </button>
      <Modal opened={opened} onClose={() => setOpened(!opened)}>
        <span>Вы угадали!</span>
        <button className="button" onClick={() => startGame(countries)}>
          Начать новую партию
        </button>
      </Modal>
    </section>
  )
}
