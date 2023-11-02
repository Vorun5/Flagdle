import { convertTime } from 'lib/helpers/convert-time'
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

  const time = convertTime(stopwatch)

  return (
    <span className="game__info">
      Время:{' '}
      <b>
        {time.minutes !== 0 && <>{time.minutes} мин. </>}
        {time.seconds} сек.
      </b>
    </span>
  )
}
