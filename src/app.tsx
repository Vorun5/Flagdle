import { useGameStore } from 'lib/stores/game/game'
import { Header } from 'widgets/header'
import { Footer } from 'widgets/footer'
import { Game } from 'widgets/game'
import { GameInfo } from 'widgets/game-info'

export const App = () => {
  const { gameStatus } = useGameStore()

  return (
    <div className="app-container">
      <Header />
      <main className="content">{gameStatus === 'playing' ? <Game /> : <GameInfo />}</main>
      <Footer />
    </div>
  )
}
