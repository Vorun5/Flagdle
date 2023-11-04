import { COUNTRIES } from 'lib/consts/countries'
import { compareCountryName } from 'lib/helpers/compare-country-name'
import { create } from 'zustand'
import { GameStoreActions, GameStoreState, MAX_POPULATION, MIN_POPULATION } from './type'
import { initGameStore } from './lib/init-game-store'
import { guessCountry } from './lib/guess-country'
import { getCountryNames } from './lib/get-country-names'

export const useGameStore = create<GameStoreState & GameStoreActions>((set) => ({
  ...initGameStore(),
  startGame: () => {
    set((state) => {
      return {
        unguessedСountryIds: state.countryIds,
        gameStatus: 'playing',
        startTime: new Date().getTime(),
        guessedСountryIds: [],
        mysteriousCountry: guessCountry(state.countryIds),
        lastAnswer: null,
      }
    })
  },
  endGame: () => {
    set({
      gameStatus: 'winner',
      endTime: new Date().getTime(),
      lastAnswer: null,
    })
  },
  changeGameLanguage: (language) => {
    localStorage.setItem('game-language', language)
    set((state) => {
      const { countryNames, countryNamesInLowerCase } = getCountryNames({
        language,
        countryIds: state.countryIds,
      })

      return {
        language,
        countryNames,
        countryNamesInLowerCase,
      }
    })
  },
  changeFilters: (filters) => {
    const newPopulation = filters.population
    if (newPopulation.from > newPopulation.to) {
      const from = newPopulation.to
      const to = newPopulation.from
      newPopulation.from = from
      newPopulation.to = to
    }
    if (newPopulation.from < MIN_POPULATION) newPopulation.from = MIN_POPULATION
    if (newPopulation.to < MIN_POPULATION) newPopulation.to = MIN_POPULATION
    if (newPopulation.from > MAX_POPULATION) newPopulation.from = MAX_POPULATION
    if (newPopulation.to > MAX_POPULATION) newPopulation.to = MAX_POPULATION

    set((state) => {
      if (state.gameStatus === 'playing') return state
      const newCountryIds: number[] = []
      for (const country of COUNTRIES) {
        if (
          country.population >= newPopulation.from &&
          country.population <= newPopulation.to &&
          (filters.continents.length === 0 ||
            country.continents.some((continent) => filters.continents.includes(continent)))
        ) {
          newCountryIds.push(country.id)
        }
      }
      const { countryNames, countryNamesInLowerCase } = getCountryNames({
        language: state.language,
        countryIds: newCountryIds,
      })

      return {
        countryNames,
        countryNamesInLowerCase,
        countryIds: newCountryIds,
        filters: {
          continents: filters.continents,
          population: newPopulation,
        },
      }
    })
  },
  enterCountryName: (countryName) =>
    set((state) => {
      if (!state.mysteriousCountry) {
        throw new Error('Imposible: enterCountryName. mysteriousCountry cant be null')
      }
      if (
        compareCountryName({
          country: state.mysteriousCountry,
          name: countryName,
          language: state.language,
        })
      ) {
        const newUnguessedСountryIds = state.unguessedСountryIds.filter(
          (id) => id !== state.mysteriousCountry?.id,
        )
        const gameStatus = newUnguessedСountryIds.length !== 0 ? 'playing' : 'winner'

        return {
          unguessedСountryIds: newUnguessedСountryIds,
          guessedСountryIds: [...state.guessedСountryIds, state.mysteriousCountry.id],
          mysteriousCountry: guessCountry(newUnguessedСountryIds),
          gameStatus: gameStatus,
          endTime: gameStatus === 'winner' ? new Date().getTime() : 0,
          lastAnswer: {
            status: 'right',
            answer: state.mysteriousCountry,
            correctAnswer: state.mysteriousCountry,
          },
        }
      }

      const userAnswer = COUNTRIES.find((country) =>
        compareCountryName({ country, name: countryName, language: state.language }),
      )

      if (!userAnswer) {
        throw new Error('Imposible: enterCountryName. userAnswer cant be undefinde')
      }

      if (state.mysteriousCountry) {
        return {
          mysteriousCountry: guessCountry(state.unguessedСountryIds),
          lastAnswer: {
            status: 'wrong',
            answer: userAnswer,
            correctAnswer: state.mysteriousCountry,
          },
        }
      }

      return state
    }),
}))
