import { ALL_COUNTRY_LANGUAGES, CountryLanguages } from 'lib/types'
import { GameStoreState, MAX_POPULATION } from '../type'
import { getCountryNames } from './get-country-names'
import { COUNTRIES_IDS } from 'lib/consts/countries'

export const initGameStore = (): GameStoreState => {
  const language: CountryLanguages = 'eng'

  const { countryNames, countryNamesInLowerCase } = getCountryNames({
    language,
    countryIds: COUNTRIES_IDS,
  })

  return {
    language,
    languageLoading: false,
    languageError: false,
    countryNames,
    countryNamesInLowerCase,
    guessedСountryIds: [],
    unguessedСountryIds: [],
    countryIds: COUNTRIES_IDS,
    roundCountryIds: [],
    roundSize: 10,
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

export const getSavedGameLanguage = (): CountryLanguages => {
  const savedLanguage = localStorage.getItem('game-language')
  return ALL_COUNTRY_LANGUAGES.includes(savedLanguage as CountryLanguages)
    ? (savedLanguage as CountryLanguages)
    : 'eng'
}
