import { Country, CountryContinent, CountryLanguages } from 'lib/types'

export type GameFilterPopulation = {
  from: number
  to: number
}

export type GameFiltersType = {
  population: GameFilterPopulation
  continents: CountryContinent[]
}

export const MIN_POPULATION = 0

export const MAX_POPULATION = 2_000_000_000

export type GameStoreState = {
  language: CountryLanguages
  countryNames: string[]
  countryNamesInLowerCase: string[]
  guessedСountryIds: number[]
  unguessedСountryIds: number[]
  countryIds: number[]
  mysteriousCountry: Country | null
  gameStatus: 'playing' | 'winner' | 'idle'
  startTime: number
  endTime: number
  filters: GameFiltersType
  lastAnswer: null | {
    status: 'right' | 'wrong'
    answer: Country
    correctAnswer: Country
  }
}

export type GameStoreActions = {
  startGame: () => void
  endGame: () => void
  changeGameLanguage: (language: CountryLanguages) => void
  changeFilters: (filters: GameFiltersType) => void
  enterCountryName: (countryName: string, language: CountryLanguages) => void
}
