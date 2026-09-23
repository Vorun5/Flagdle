import { COUNTRIES } from 'lib/consts/countries'
import { loadCountryLanguage } from 'lib/consts/country-translations'
import { compareCountryName } from 'lib/helpers/compare-country-name'
import { create } from 'zustand'
import { GameStoreActions, GameStoreState, MAX_POPULATION, MIN_POPULATION } from './type'
import { initGameStore } from './lib/init-game-store'
import { guessCountry } from './lib/guess-country'
import { getCountryNames } from './lib/get-country-names'
import { chooseRoundCountries } from './lib/choose-round-countries'

let languageRequest = 0

export const useGameStore = create<GameStoreState & GameStoreActions>(set => ({
  ...initGameStore(),
  startGame: () => {
    set(state => {
      if (state.gameStatus === 'playing' || state.countryIds.length === 0) return state

      const roundCountryIds = chooseRoundCountries(state.countryIds, state.roundSize)

      return {
        roundCountryIds,
        unguessedСountryIds: [...roundCountryIds],
        gameStatus: 'playing',
        startTime: Date.now(),
        guessedСountryIds: [],
        mysteriousCountry: guessCountry(roundCountryIds),
        lastAnswer: null,
        lastResult: null,
      }
    })
  },
  endGame: () => {
    set(state => {
      if (state.gameStatus !== 'playing') return state

      return {
        gameStatus: 'finished',
        mysteriousCountry: null,
        lastAnswer: null,
        lastResult: {
          startTime: state.startTime,
          endTime: Date.now(),
          countryIds: [...state.roundCountryIds],
          guessedСountryIds: [...state.guessedСountryIds],
          unguessedСountryIds: [...state.unguessedСountryIds],
        },
      }
    })
  },
  changeGameLanguage: async language => {
    const request = ++languageRequest
    set({ languageLoading: true, languageError: false })

    try {
      await loadCountryLanguage(language)
    } catch {
      if (request === languageRequest) set({ languageLoading: false, languageError: true })
      return
    }

    if (request !== languageRequest) return
    localStorage.setItem('game-language', language)
    set(state => {
      const { countryNames, countryNamesInLowerCase } = getCountryNames({
        language,
        countryIds: state.countryIds,
      })
      return { language, languageLoading: false, countryNames, countryNamesInLowerCase }
    })
  },
  changeRoundSize: size => {
    set(state => (state.gameStatus === 'playing' ? state : { roundSize: size }))
  },
  changeFilters: filters => {
    const clampPopulation = (value: number) =>
      Number.isFinite(value)
        ? Math.min(MAX_POPULATION, Math.max(MIN_POPULATION, Math.trunc(value)))
        : MIN_POPULATION
    const from = clampPopulation(filters.population.from)
    const to = clampPopulation(filters.population.to)
    const newPopulation = { from: Math.min(from, to), to: Math.max(from, to) }
    const continents = [...filters.continents]

    set(state => {
      if (state.gameStatus === 'playing') return state
      if (
        newPopulation.from === state.filters.population.from &&
        newPopulation.to === state.filters.population.to &&
        continents.length === state.filters.continents.length &&
        continents.every((continent, index) => continent === state.filters.continents[index])
      ) {
        return state
      }

      const newCountryIds: number[] = []
      for (const country of COUNTRIES) {
        if (
          country.population >= newPopulation.from &&
          country.population <= newPopulation.to &&
          (continents.length === 0 ||
            country.continents.some(continent => continents.includes(continent)))
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
          continents,
          population: newPopulation,
        },
      }
    })
  },
  enterCountryName: countryName =>
    set(state => {
      if (state.gameStatus !== 'playing' || !state.mysteriousCountry) return state

      if (
        compareCountryName({
          country: state.mysteriousCountry,
          name: countryName,
          language: state.language,
        })
      ) {
        const newUnguessedСountryIds = state.unguessedСountryIds.filter(
          id => id !== state.mysteriousCountry?.id,
        )
        const gameStatus = newUnguessedСountryIds.length !== 0 ? 'playing' : 'winner'

        if (gameStatus === 'winner') {
          const endTime = Date.now()
          return {
            unguessedСountryIds: [],
            guessedСountryIds: [...state.roundCountryIds],
            gameStatus: 'winner',
            mysteriousCountry: null,
            lastAnswer: null,
            lastResult: {
              startTime: state.startTime,
              endTime,
              countryIds: [...state.roundCountryIds],
              unguessedСountryIds: [],
              guessedСountryIds: [...state.roundCountryIds],
            },
          }
        }

        return {
          unguessedСountryIds: newUnguessedСountryIds,
          guessedСountryIds: [...state.guessedСountryIds, state.mysteriousCountry.id],
          gameStatus,
          mysteriousCountry: guessCountry(newUnguessedСountryIds),
          lastAnswer: {
            status: 'right',
            answer: state.mysteriousCountry,
            correctAnswer: state.mysteriousCountry,
          },
        }
      }

      const userAnswer = COUNTRIES.find(
        country =>
          state.countryIds.includes(country.id) &&
          compareCountryName({ country, name: countryName, language: state.language }),
      )

      if (!userAnswer) return state

      return {
        mysteriousCountry: guessCountry(state.unguessedСountryIds, state.mysteriousCountry.id),
        lastAnswer: {
          status: 'wrong',
          answer: userAnswer,
          correctAnswer: state.mysteriousCountry,
        },
      }
    }),
}))
