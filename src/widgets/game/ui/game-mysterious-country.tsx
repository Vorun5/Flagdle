import { useGameStore } from 'lib/stores/game'

export const GameMysteriousCountry = () => {
    const { mysteriousCountry } = useGameStore()

    if (!mysteriousCountry) return <></>

    return (
        <img
            src={mysteriousCountry.flags.svg}
            alt="Mysterious flag"
            draggable={false}
            className="flag"
        />
    )
}
