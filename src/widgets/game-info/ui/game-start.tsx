import { useTranslation } from 'react-i18next'

export const GameStart = () => {
  const { t } = useTranslation()

  return (
    <div className="start-game">
      <h2 className="start-game__title">{t('rulesOfTheGame')}</h2>
      <ul className="start-game__rules">
        <li className="start-game__rule">{t('rules.manyFlagsShoretTime')}</li>
        <li className="start-game__rule">{t('rules.canEnterWrongFlagName')}</li>
        <li className="start-game__rule">{t('rules.studyFlags')}</li>
      </ul>
    </div>
  )
}
