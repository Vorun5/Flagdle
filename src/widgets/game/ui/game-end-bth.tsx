import { Icons } from 'components/icons'
import { useGameStore } from 'lib/stores/game'

export const GameEndBth = () => {
    const { endGame } = useGameStore()

    return (
        <button type="button" className="button game__bth" onClick={endGame}>
            <span className="game__bth-icon">
                <Icons icon="close" width="32px" height="32px" />
            </span>
            <span className="game__bth-text">Закончить игру</span>
        </button>
    )
}
