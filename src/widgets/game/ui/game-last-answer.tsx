import { getCountryTranslation } from 'lib/consts/country-translations'
import { useGameStore } from 'lib/stores/game/game'
import { useTranslation } from 'react-i18next'

export const GameLastAnswer = () => {
  const { t } = useTranslation()
  const { language, lastAnswer } = useGameStore()

  if (!lastAnswer) return null

  const correctName = getCountryTranslation(lastAnswer.correctAnswer, language).common
  const answerName = getCountryTranslation(lastAnswer.answer, language).common

  return (
    <div
      className={`game-feedback game-feedback--${lastAnswer.status}`}
      role="status"
      aria-live="polite"
    >
      <strong>
        {lastAnswer.status === 'right'
          ? t('feedback.correct', { country: correctName })
          : t('feedback.wrong', { country: correctName })}
      </strong>
      {lastAnswer.status === 'wrong' && (
        <span>{t('feedback.yourAnswer', { country: answerName })}</span>
      )}
    </div>
  )
}
