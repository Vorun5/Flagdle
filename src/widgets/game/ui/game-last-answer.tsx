import { Icons } from 'components/icons'
import { formatPopulationNumber } from 'lib/helpers/format-population-number'
import { useGameStore } from 'lib/stores/game/game'
import { Country } from 'lib/types'
import { useTranslation } from 'react-i18next'

const GameLastAnswerCountry = ({ country }: { country: Country }) => {
  const { language } = useGameStore()

  return (
    <span className="last-answer-country">
      {country.translations[language].common}
      <div className="last-answer-country__flag">
        <img src={`./flags/${country.id}.svg`} alt={country.translations[language].common} />
        <span className="country__continents">
          {country.continents.map((continent, index) => {
            const end = country.continents.length != index + 1 ? ', ' : ''
            return continent + end
          })}
        </span>
        <span className="last-answer-country__population">
          {formatPopulationNumber(country.population)}
        </span>
        <a
          className="last-answer-country__link"
          href={country.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Maps <Icons width="16px" height="16px" icon="external-link" />
        </a>
      </div>
    </span>
  )
}

export const GameLastAnswer = () => {
  const { t } = useTranslation()
  const { lastAnswer } = useGameStore()

  if (!lastAnswer) return <></>

  return (
    <div className="last-answer__container">
      <span className="last-answer">
        {t('lastAnswer')}:{' '}
        <span
          className={lastAnswer.status === 'right' ? 'last-answer__right' : 'last-answer__wrong'}
        >
          {lastAnswer.status === 'right' ? t('guessedRight') : t('didntGuess')}
        </span>
      </span>
      <span className="last-answer">
        {t('yourAnswer')}: <GameLastAnswerCountry country={lastAnswer.answer} />
      </span>
      {lastAnswer.status === 'wrong' && (
        <span className="last-answer">
          {t('correctAnswer')}: <GameLastAnswerCountry country={lastAnswer.correctAnswer} />
        </span>
      )}
    </div>
  )
}
