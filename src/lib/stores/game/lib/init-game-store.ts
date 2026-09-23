import { ALL_COUNTRY_LANGUAGES, CountryLanguages } from 'lib/types'
import { GameStoreState, MAX_POPULATION } from '../type'
import { getCountryNames } from './get-country-names'
import { COUNTRIES_IDS } from 'lib/consts/countries'

export const initGameStore = (): GameStoreState => {
  const savedLanguage = localStorage.getItem('game-language')
  const language: CountryLanguages = ALL_COUNTRY_LANGUAGES.includes(
    savedLanguage as CountryLanguages,
  )
    ? (savedLanguage as CountryLanguages)
    : 'eng'

  const { countryNames, countryNamesInLowerCase } = getCountryNames({
    language,
    countryIds: COUNTRIES_IDS,
  })

  return {
    language,
    countryNames,
    countryNamesInLowerCase,
    guessedСountryIds: [],
    unguessedСountryIds: COUNTRIES_IDS,
    countryIds: COUNTRIES_IDS,
    mysteriousCountry: null,
    gameStatus: 'idle',
    startTime: 0,
    filters: {
      population: {
        from: 0,
        to: MAX_POPULATION,
      },
      continents: [],
    },
    lastAnswer: null,
    lastResult: null,
  }
}
