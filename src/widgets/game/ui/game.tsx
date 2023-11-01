import { GameStopwatch } from './game-stopwatch'
import { GameScore } from './game-score'
import { GameLastAnswer } from './game-last-answer'
import { GameField } from './game-field'
import { GameEndBth } from './game-end-bth'
import { GameMysteriousCountry } from './game-mysterious-country'
import '../game.css'

export const Game = () => {
  return (
    <section className="box">
      <div className="game__header">
        <div>
          <GameStopwatch />
          <GameScore />
        </div>
        <GameEndBth />
      </div>
      <GameMysteriousCountry />
      <GameField />
      <GameLastAnswer />
    </section>
  )
}
