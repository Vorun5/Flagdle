import { useGameStore } from 'lib/stores/game/game'
import { useTranslation } from 'react-i18next'

export const GameMysteriousCountry = () => {
  const { t } = useTranslation()
  const { mysteriousCountry } = useGameStore()

  if (!mysteriousCountry) return <></>

  return (
    <img
      key={mysteriousCountry.id}
      src={`./flags/${mysteriousCountry.id}.svg`}
      alt={t('mysteriousFlag')}
      draggable={false}
      className="game__flag"
    />
  )
}
