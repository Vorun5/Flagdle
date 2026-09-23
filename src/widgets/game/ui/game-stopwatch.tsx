import { convertTime } from 'lib/helpers/convert-time'
import { useGameStore } from 'lib/stores/game/game'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const GameStopwatch = () => {
  const { t } = useTranslation()
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
    <div className="game__time">
      <span>{t('time')}</span>
      <strong>
        {time.minutes !== 0 && (
          <>
            {time.minutes} {t('minutes')}{' '}
          </>
        )}
        {time.seconds} {t('seconds')}
      </strong>
    </div>
  )
}
