import { ALL_COUNTRY_LANGUAGES, CountryLanguages } from 'lib/types'
import { GameStoreState } from '../type'
import { getCountryNames } from './get-country-names'
import { COUNTRIES_IDS } from 'lib/consts/countries'

export const initGameStore = (): GameStoreState => {
  let language = localStorage.getItem('game-language')
  if (language !== null) {
    try {
      ALL_COUNTRY_LANGUAGES.includes(language as CountryLanguages)
    } catch {
      language = 'eng'
    }
  } else {
    language = 'eng'
  }

  const { countryNames, countryNamesInLowerCase } = getCountryNames({
    language: language as CountryLanguages,
    countryIds: COUNTRIES_IDS,
  })

  return {
    language: language as CountryLanguages,
    countryNames,
    countryNamesInLowerCase,
    guessedСountryIds: [],
    unguessedСountryIds: COUNTRIES_IDS,
    countryIds: COUNTRIES_IDS,
    mysteriousCountry: null,
    gameStatus: 'idle',
    startTime: 0,
    endTime: 0,
    lastAnswer: null,
    filters: {
      population: {
        from: 0,
        to: 10_000_000_000,
      },
      continents: [],
    },
  }
}
