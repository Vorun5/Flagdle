import { useGameStore } from 'lib/stores/game'
import { GameFilters } from './game-filters'
import { GameResult } from './game-result'
import { GameStart } from './game-start'
import '../game-info.css'

export const GameInfo = () => {
  const { gameStatus } = useGameStore()

  return (
    <section className="box">
      <div className="game-info">
        {gameStatus === 'idle' && <GameStart />}
        {gameStatus === 'winner' && <GameResult />}
        <div className="game-info__divider" />
        <GameFilters />
      </div>
    </section>
  )
}
