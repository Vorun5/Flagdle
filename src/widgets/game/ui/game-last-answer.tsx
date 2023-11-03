import { useGameStore } from 'lib/stores/game'
import { useTranslation } from 'react-i18next'

export const GameLastAnswer = () => {
  const { t } = useTranslation()
  const { language, lastAnswer } = useGameStore()

  if (!lastAnswer) return <></>

  return (
    <div>
      <span className="answer">
        {t('lastAnswer')}:{' '}
        <span className={lastAnswer.status === 'right' ? 'answer__right' : 'answer__wrong'}>
          {lastAnswer.status === 'right' ? t('guessedRight') : t('didntGuess')}
        </span>
      </span>
      <span className="answer">
        {t('yourAnswer')}:{' '}
        <a
          className="country"
          href={lastAnswer.answer.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {lastAnswer.answer.translations[language].common}
          <div className="country__flag">
            <img
              src={`./flags/${lastAnswer.answer.id}.svg`}
              alt={lastAnswer.answer.translations[language].common}
            />
          </div>
        </a>
      </span>
      {lastAnswer.status === 'wrong' && (
        <span className="answer">
          {t('correctAnswer')}:{' '}
          <a
            className="country"
            href={lastAnswer.correctAnswer.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lastAnswer.correctAnswer.translations[language].common}
            <div className="country__flag">
              <img
                src={`./flags/${lastAnswer.correctAnswer.id}.svg`}
                alt={lastAnswer.correctAnswer.translations[language].common}
              />
            </div>
          </a>
        </span>
      )}
    </div>
  )
}
