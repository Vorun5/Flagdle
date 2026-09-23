import { useGameStore } from 'lib/stores/game'
import { ROUND_SIZES } from 'lib/stores/game/type'
import { useTranslation } from 'react-i18next'

export const GameStart = () => {
  const { t } = useTranslation()
  const { gameStatus, roundSize, countryIds, changeRoundSize, startGame } = useGameStore()
  const availableCount = Math.min(roundSize, countryIds.length)

  return (
    <div className="game-intro">
      <h2 className="game-intro__title">
        {gameStatus === 'idle' ? t('intro.title') : t('intro.playAgainTitle')}
      </h2>
      <p className="game-intro__description">{t('intro.description')}</p>
      <fieldset className="round-picker">
        <legend>{t('chooseRoundSize')}</legend>
        <div className="round-picker__options">
          {ROUND_SIZES.map(size => (
            <button
              key={size}
              type="button"
              className={`round-picker__option ${
                size === roundSize ? 'round-picker__option--active' : ''
              }`}
              aria-pressed={size === roundSize}
              onClick={() => changeRoundSize(size)}
            >
              <strong>{size}</strong>
              <span>{t('flags')}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="game-intro__action-row">
        <button
          type="button"
          className="button action-btn game-intro__start"
          disabled={availableCount === 0}
          onClick={startGame}
        >
          {gameStatus === 'idle' ? t('startTheGame') : t('playAgain')}
        </button>
        <span className="game-intro__count">{t('roundAvailable', { count: availableCount })}</span>
      </div>
      {availableCount === 0 && (
        <p className="game-intro__warning">{t('impossibleToStartTheGame')}</p>
      )}
    </div>
  )
}
