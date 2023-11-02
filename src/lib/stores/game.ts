import { COUNTRIES, COUNTRIES_IDS } from 'lib/consts/countries'
import { compareCountryName } from 'lib/helpers/compare-country-name'
import { ALL_COUNTRY_LANGUAGES, Country, CountryLanguages } from 'lib/types'
import { create } from 'zustand'

type State = {
  language: CountryLanguages
  countryNames: string[]
  countryNamesInLowerCase: string[]
  guessedСountryIds: number[]
  unguessedСountryIds: number[]
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
  changeGameLanguage: (language: CountryLanguages) => void
  enterCountryName: (countryName: string, language: CountryLanguages) => void
}

function getCountryNames(language: CountryLanguages) {
  const commonCountryNames: string[] = []
  const officialnCountryNames: string[] = []
  for (const country of COUNTRIES) {
    commonCountryNames.push(country.translations[language].common)
    officialnCountryNames.push(country.translations[language].official)
  }
  commonCountryNames.sort()
  officialnCountryNames.sort()
  const countryNames = [...new Set([...commonCountryNames, ...officialnCountryNames])]
  const countryNamesInLowerCase = countryNames.map((countryName) => countryName.toLowerCase())

  return {
    countryNames,
    countryNamesInLowerCase,
  }
}

function initGameStore(): State {
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

  const { countryNames, countryNamesInLowerCase } = getCountryNames(language as CountryLanguages)
  return {
    language: language as CountryLanguages,
    countryNames,
    countryNamesInLowerCase,
    guessedСountryIds: [],
    unguessedСountryIds: COUNTRIES_IDS,
    mysteriousCountry: null,
    gameStatus: 'idle',
    startTime: 0,
    endTime: 0,
    lastAnswer: null,
  }
}

const guessCountry = (countries: number[]) => {
  const newGuessCountryId = countries[Math.floor(Math.random() * countries.length)]
  const newGuessCountry = COUNTRIES.find((country) => country.id === newGuessCountryId)
  if (!newGuessCountry) {
    throw new Error('Imposible: guessCountry. newGuessCountry cant be undefinde')
  }

  return newGuessCountry
}

export const useGameStore = create<State & Action>((set) => ({
  ...initGameStore(),
  startGame: () => {
    set({
      unguessedСountryIds: COUNTRIES_IDS,
      gameStatus: 'playing',
      startTime: new Date().getTime(),
      guessedСountryIds: [],
      mysteriousCountry: guessCountry(COUNTRIES_IDS),
      lastAnswer: null,
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
    const { countryNames, countryNamesInLowerCase } = getCountryNames(language)
    console.log(language, countryNames, countryNamesInLowerCase)
    set({
      language,
      countryNames,
      countryNamesInLowerCase,
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
