export const chooseRoundCountries = (
  eligibleCountryIds: number[],
  size: number,
  random: () => number = Math.random,
): number[] => {
  const shuffled = [...eligibleCountryIds]
  const count = Math.min(size, shuffled.length)

  for (let index = 0; index < count; index += 1) {
    const otherIndex = index + Math.floor(random() * (shuffled.length - index))
    const selectedId = shuffled[index]
    shuffled[index] = shuffled[otherIndex]
    shuffled[otherIndex] = selectedId
  }

  return shuffled.slice(0, count)
}
