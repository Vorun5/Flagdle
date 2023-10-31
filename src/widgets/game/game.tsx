import { GameStopwatch } from './ui/game-stopwatch'
import { GameScore } from './ui/game-score'
import { GameLastAnswer } from './ui/game-last-answer'
import { GameField } from './ui/game-field'
import { GameEndBth } from './ui/game-end-bth'
import { GameMysteriousCountry } from './ui/game-mysterious-country'
import './game.css'

export const Game = () => {
  return (
    <div className="box">
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
    </div>
  )
}
