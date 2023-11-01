import { CONUNTRIES } from 'lib/consts/countries'
import { compareCountryName } from 'lib/helpers/compare-country-name'
import { Country, CountryLanguages } from 'lib/types'
import { create } from 'zustand'

type State = {
  guessedCountries: Country[]
  unguessedСountries: Country[]
  mysteriousCountry: Country | null
  gameStatus: 'playing' | 'winner' | 'idle'
  startTime: number
  endTime: number
  lastAnswer: null | {
    status: 'right' | 'wrong'
    answer: Country
    correctAnswer: Country
  }
}

type Action = {
  startGame: () => void
  endGame: () => void
  enterCountryName: (countryName: string, language: CountryLanguages) => void
}

const guessCountry = (countries: Country[]) =>
  countries[Math.floor(Math.random() * countries.length)]

export const useGameStore = create<State & Action>((set) => ({
  guessedCountries: [],
  unguessedСountries: [],
  mysteriousCountry: null,
  gameStatus: 'idle',
  startTime: 0,
  endTime: 0,
  lastAnswer: null,
  startGame: () => {
    set({
      unguessedСountries: CONUNTRIES,
      gameStatus: 'playing',
      startTime: new Date().getTime(),
      guessedCountries: [],
      mysteriousCountry: guessCountry(CONUNTRIES),
    })
  },
  endGame: () => {
    set({
      gameStatus: 'winner',
      endTime: new Date().getTime(),
    })
  },
  enterCountryName: (countryName, language) =>
    set((state) => {
      if (
        state.mysteriousCountry &&
        compareCountryName({ country: state.mysteriousCountry, name: countryName, language })
      ) {
        const newUnguessedСountries = state.unguessedСountries.filter(
          (country) => country !== state.mysteriousCountry,
        )
        const gameStatus = newUnguessedСountries.length !== 0 ? 'playing' : 'winner'
        console.log(gameStatus)

        return {
          unguessedСountries: newUnguessedСountries,
          guessedCountries: [...state.guessedCountries, state.mysteriousCountry],
          mysteriousCountry: guessCountry(newUnguessedСountries),
          gameStatus: gameStatus,
          endTime: gameStatus === 'winner' ? new Date().getTime() : 0,
          lastAnswer: {
            status: 'right',
            answer: state.mysteriousCountry,
            correctAnswer: state.mysteriousCountry,
          },
        }
      }
      let userAnswer: Country | null = null
      for (const country of CONUNTRIES) {
        if (compareCountryName({ country, name: countryName, language })) {
          userAnswer = country
          break
        }
      }
      if (state.mysteriousCountry && userAnswer !== null) {
        return {
          mysteriousCountry: guessCountry(state.unguessedСountries),
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
