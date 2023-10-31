import { CountryDto } from 'lib/dto/country-dto'
import { compareCountryName } from 'lib/helpers/compare-country-name'
import { create } from 'zustand'

type State = {
  guessedCountries: CountryDto[]
  unguessedСountries: CountryDto[]
  mysteriousCountry: CountryDto | null
  gameStatus: 'playing' | 'winner' | 'idle'
  startTime: number
  endTime: number
  lastAnswer: null | {
    status: 'right' | 'wrong'
    answer: CountryDto
    correctAnswer: CountryDto
  }
}

type Action = {
  startGame: (countries: CountryDto[]) => void
  endGame: () => void
  enterCountryName: (countryName: string, countries: CountryDto[]) => void
}

const guessCountry = (countries: CountryDto[]) =>
  countries[Math.floor(Math.random() * countries.length)]

export const useGameStore = create<State & Action>((set) => ({
  guessedCountries: [],
  unguessedСountries: [],
  mysteriousCountry: null,
  gameStatus: 'idle',
  startTime: 0,
  endTime: 0,
  lastAnswer: null,
  startGame: (countries) => {
    set({
      unguessedСountries: countries,
      gameStatus: 'playing',
      startTime: new Date().getTime(),
      guessedCountries: [],
      mysteriousCountry: guessCountry(countries),
    })
  },
  endGame: () => {
    set({
      gameStatus: 'winner',
      endTime: new Date().getTime(),
    })
  },
  enterCountryName: (countryName, countries) =>
    set((state) => {
      if (state.mysteriousCountry && compareCountryName(state.mysteriousCountry, countryName)) {
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
      let userAnswer: CountryDto | null = null
      for (const country of countries) {
        if (compareCountryName(country, countryName)) {
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
