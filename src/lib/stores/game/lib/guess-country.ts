import { COUNTRIES_BY_ID } from 'lib/consts/countries'

export const guessCountry = (countries: number[]) => {
  const newGuessCountryId = countries[Math.floor(Math.random() * countries.length)]
  const newGuessCountry = COUNTRIES_BY_ID.get(newGuessCountryId)
  if (!newGuessCountry) {
    throw new Error('Cannot choose a country from an empty or invalid country list')
  }

  return newGuessCountry
}
