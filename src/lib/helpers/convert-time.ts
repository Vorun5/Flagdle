export const convertTime = (time: number) => {
  const totalSeconds = Math.floor(Math.max(0, time) / 1000)

  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  }
}
