import { useGameStore } from 'lib/stores/game'
import { useEffect, useState } from 'react'

export const GameStopwatch = () => {
    const { gameStatus, startTime } = useGameStore()

    const [stopwatch, setStopwatch] = useState(0)
    useEffect(() => {
        if (!(gameStatus === 'playing')) return
        setStopwatch(0)
        const interval = setInterval(() => {
            const nowDate = new Date()
            setStopwatch(nowDate.getTime() - startTime)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [gameStatus, startTime])

    return (
        <span className="game__info">
            Время:{' '}
            <b>
                {Math.floor(stopwatch / 1000 / 60) !== 0 && (
                    <>{Math.floor(stopwatch / 1000 / 60)} мин. </>
                )}
                {Math.round((stopwatch / 1000) % 60)} сек.
            </b>
        </span>
    )
}
