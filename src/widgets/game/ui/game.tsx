import { GameStopwatch } from './game-stopwatch'
import { GameScore } from './game-score'
import { GameLastAnswer } from './game-last-answer'
import { GameField } from './game-field'
import { GameEndBtn } from './game-end-btn'
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
        <GameEndBtn />
      </div>
      <GameMysteriousCountry />
      <GameField />
      <GameLastAnswer />
    </section>
  )
}
