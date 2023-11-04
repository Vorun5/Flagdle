import { COUNTRIES } from 'lib/consts/countries'

export const guessCountry = (countries: number[]) => {
  const newGuessCountryId = countries[Math.floor(Math.random() * countries.length)]
  const newGuessCountry = COUNTRIES.find((country) => country.id === newGuessCountryId)
  if (!newGuessCountry) {
    throw new Error('Imposible: guessCountry. newGuessCountry cant be undefinde')
  }

  return newGuessCountry
}
