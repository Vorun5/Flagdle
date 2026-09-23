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

export const ROUND_SIZES = [10, 25, 50] as const
export type RoundSize = (typeof ROUND_SIZES)[number]

export type GameStoreState = {
  language: CountryLanguages
  languageLoading: boolean
  languageError: boolean
  countryNames: string[]
  countryNamesInLowerCase: string[]
  guessedСountryIds: number[]
  unguessedСountryIds: number[]
  countryIds: number[]
  roundCountryIds: number[]
  roundSize: RoundSize
  mysteriousCountry: Country | null
  gameStatus: 'playing' | 'winner' | 'finished' | 'idle'
  startTime: number
  filters: GameFiltersType
  lastAnswer: null | {
    status: 'right' | 'wrong'
    answer: Country
    correctAnswer: Country
  }
  lastResult: {
    countryIds: number[]
    guessedСountryIds: number[]
    unguessedСountryIds: number[]
    startTime: number
    endTime: number
  } | null
}

export type GameStoreActions = {
  startGame: () => void
  endGame: () => void
  changeGameLanguage: (language: CountryLanguages) => Promise<void>
  changeRoundSize: (size: RoundSize) => void
  changeFilters: (filters: GameFiltersType) => void
  enterCountryName: (countryName: string) => void
}
