import { GameStopwatch } from './game-stopwatch'
import { GameScore } from './game-score'
import { GameLastAnswer } from './game-last-answer'
import { GameField } from './game-field'
import { GameEndBtn } from './game-end-btn'
import { GameMysteriousCountry } from './game-mysterious-country'
import '../game.css'
import { useTranslation } from 'react-i18next'

export const Game = () => {
  const { t } = useTranslation()

  return (
    <section className="box game">
      <div className="game__header">
        <div className="game__stats">
          <GameScore />
          <GameStopwatch />
        </div>
        <GameEndBtn />
      </div>
      <h2 className="game__prompt">{t('nameTheCountry')}</h2>
      <GameMysteriousCountry />
      <GameField />
      <GameLastAnswer />
    </section>
  )
}
