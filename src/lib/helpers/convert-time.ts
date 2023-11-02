export const convertTime = (time: number) => {
  return {
    minutes: Math.floor(time / 1000 / 60),
    seconds: Math.round((time / 1000) % 60),
  }
}
