import { CONUNTRIES } from 'lib/consts/countries'
import { CountryLanguages } from 'lib/types'
import { create } from 'zustand'

type State = {
  gameLanguage: CountryLanguages
  countryNames: string[]
  countryNamesInLowerCase: string[]
}

// type Actions = {
//   fetchCountries: () => Promise<void>
// }

function initCountriesStore(): State {
  const gameLanguage: CountryLanguages = 'rus'
  const commonCountryNames: string[] = []
  const officialnCountryNames: string[] = []
  for (const country of CONUNTRIES) {
    commonCountryNames.push(country.translations[gameLanguage].common)
    officialnCountryNames.push(country.translations[gameLanguage].official)
  }
  commonCountryNames.sort()
  officialnCountryNames.sort()
  const countryNames = [...new Set([...commonCountryNames, ...officialnCountryNames])]
  const countryNamesInLowerCase = countryNames.map((countryName) => countryName.toLowerCase())

  return {
    gameLanguage,
    countryNames,
    countryNamesInLowerCase,
  }
}

export const useCountriesStore = create<State>((/*set*/) => ({
  ...initCountriesStore(),
}))
