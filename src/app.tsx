import { Header } from 'widgets/header'
import { Footer } from 'widgets/footer'
import { Game } from 'widgets/game'
import { GameResult } from 'widgets/game-result'
import { GameStart } from 'widgets/game-start'
import { useGameStore } from 'lib/stores/game'

export const App = () => {
  const { gameStatus } = useGameStore()

  return (
    <div className="app-container">
      <Header />
      <main className="content">
        {gameStatus === 'idle' && <GameStart />}
        {gameStatus === 'playing' && <Game />}
        {gameStatus === 'winner' && <GameResult />}
      </main>
      <Footer />
    </div>
  )
}
