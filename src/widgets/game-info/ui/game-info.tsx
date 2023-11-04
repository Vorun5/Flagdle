import { useGameStore } from 'lib/stores/game'
import { GameFilters } from './game-filters'
import { GameResult } from './game-result'
import { GameStart } from './game-start'
import '../game-info.css'

export const GameInfo = () => {
  const { gameStatus } = useGameStore()
  return (
    <section className="box">
      {gameStatus === 'idle' && <GameStart />}
      {gameStatus === 'winner' && <GameResult />}
      <GameFilters />
    </section>
  )
}
