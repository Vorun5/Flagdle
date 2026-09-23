import { COUNTRIES_BY_ID } from 'lib/consts/countries'

export const guessCountry = (countries: number[], excludeId?: number) => {
  const candidates = countries.length > 1 ? countries.filter(id => id !== excludeId) : countries
  const newGuessCountryId = candidates[Math.floor(Math.random() * candidates.length)]
  const newGuessCountry = COUNTRIES_BY_ID.get(newGuessCountryId)
  if (!newGuessCountry) {
    throw new Error('Cannot choose a country from an empty or invalid country list')
  }

  return newGuessCountry
}
