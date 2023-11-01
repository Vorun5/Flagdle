import { useCountriesStore } from 'lib/stores/countries'
import { useGameStore } from 'lib/stores/game'

export const GameLastAnswer = () => {
  const { gameLanguage } = useCountriesStore()
  const { lastAnswer } = useGameStore()

  if (!lastAnswer) return <></>

  return (
    <div>
      <span className="answer">
        Последний ответ:{' '}
        <span className={lastAnswer.status === 'right' ? 'answer__right' : 'answer__wrong'}>
          {lastAnswer.status === 'right' ? 'угадал' : 'не угадал'}
        </span>
      </span>
      <span className="answer">
        Мой ответ:{' '}
        <a
          className="country"
          href={lastAnswer.answer.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {lastAnswer.answer.translations[gameLanguage].common}
          <div className="country__flag">
            <img
              src={`./flags/${lastAnswer.answer.id}.svg`}
              alt={lastAnswer.answer.translations[gameLanguage].common}
            />
          </div>
        </a>
      </span>
      {lastAnswer.status === 'wrong' && (
        <span className="answer">
          Правильный ответ:{' '}
          <a
            className="country"
            href={lastAnswer.correctAnswer.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lastAnswer.correctAnswer.translations[gameLanguage].common}
            <div className="country__flag">
              <img
                src={`./flags/${lastAnswer.correctAnswer.id}.svg`}
                alt={lastAnswer.correctAnswer.translations[gameLanguage].common}
              />
            </div>
          </a>
        </span>
      )}
    </div>
  )
}
