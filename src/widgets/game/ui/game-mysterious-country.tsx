import { useGameStore } from 'lib/stores/game/game'

export const GameMysteriousCountry = () => {
  const { mysteriousCountry } = useGameStore()

  if (!mysteriousCountry) return <></>

  return (
    <img
      src={`./flags/${mysteriousCountry.id}.svg`}
      alt="Mysterious flag"
      draggable={false}
      className="game__flag"
    />
  )
}
