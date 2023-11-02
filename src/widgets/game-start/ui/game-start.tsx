import { useGameStore } from 'lib/stores/game'
import '../game-start.css'

export const GameStart = () => {
  const { startGame } = useGameStore()

  return (
    <section className="box start-game">
      <h2 className="start-game__title">Правила игры</h2>
      <ul className="start-game__rules">
        <li className="start-game__rule">
          Вам нужно угадать как можно больше флагов стран за более короткое время
        </li>
        <li className="start-game__rule">Вы можете пропустить флаг, если не знаете его</li>
      </ul>
      <button className="button action-btn" onClick={startGame}>
        Начать игру
      </button>
    </section>
  )
}
