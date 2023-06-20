import './app.css'
import { Header } from 'widgets/header'
import { Footer } from 'widgets/footer'
import { CountryDto } from 'src/lib/dto/country-dto'
import { useEffect, useState } from 'react'
import { api } from 'src/lib/api'
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg'
import { useKeydown } from './hooks/use-keydown'

export const App = () => {
    const [countries, setCountries] = useState<CountryDto[] | null>([])
    const [countryNames, setCountryNames] = useState<string[]>([])
    const [countryNamesInLowerCase, setCountryNamesInLowerCase] = useState<string[]>([])
    const [guessedCountries, setGuessedCountries] = useState<CountryDto[]>([])
    const [unguessedСountries, setUnguessedCountries] = useState<CountryDto[]>([])
    const [mysteriousCountry, setMysteriousCountry] = useState<CountryDto | null>(null)
    const [gameIsOn, setGameIsOn] = useState(false)
    const [input, setInput] = useState('')
    const [selectedClue, setSelectedClue] = useState(-1)

    const [lastAnswer, setLastAnswer] = useState<{
        status: 'right' | 'wrong'
        answer: CountryDto
        correctAnswer: CountryDto
    } | null>(null)
    // in milliseconds
    const [stopwatch, setStopwatch] = useState(0)
    const [startStopwatch, setStartStopwatch] = useState(0)

    const guessCountry = (countries: CountryDto[]) => {
        setMysteriousCountry(countries[Math.floor(Math.random() * countries.length)])
    }

    useEffect(() => {
        if (!gameIsOn) return
        const interval = setInterval(() => {
            const nowDate = new Date()
            setStopwatch(nowDate.getTime() - startStopwatch)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [gameIsOn, startStopwatch])

    const startGame = () => {
        setLastAnswer(null)
        setUnguessedCountries(countries ?? [])
        setGuessedCountries([])
        setMysteriousCountry(null)
        setStopwatch(0)
        guessCountry(countries ?? [])
        setGameIsOn(true)
        const nowDate = new Date()
        setStartStopwatch(nowDate.getTime())
    }

    const endGame = () => {
        setGameIsOn(false)
    }

    const fetchCountries = async () => {
        try {
            const newCountries = await api.get('all').json<CountryDto[]>()
            setCountries(newCountries)
        } catch (error) {
            setCountries(null)
            console.log('Failed to fetch countries')
        }
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    useEffect(() => {
        if (countries === null) return
        const commonCountryNames: string[] = []
        const officialnCountryNames: string[] = []
        for (const country of countries) {
            commonCountryNames.push(country.name.common)
            officialnCountryNames.push(country.name.official)
        }
        commonCountryNames.sort()
        officialnCountryNames.sort()
        setCountryNames([...commonCountryNames, ...officialnCountryNames])
        setCountryNamesInLowerCase([
            ...new Set([
                ...commonCountryNames.map((name) => name.toLowerCase()),
                ...officialnCountryNames.map((name) => name.toLowerCase()),
            ]),
        ])
    }, [countries])

    const [canEnter, setCanEnter] = useState(false)
    const [clue, setClue] = useState<string[]>([])

    useEffect(() => {
        const newClue: string[] = []
        const processedInput = input.trim().toLowerCase()
        if (processedInput.length !== 0) {
            setCanEnter(countryNamesInLowerCase.includes(processedInput))
            countryNamesInLowerCase.forEach((lowerCaseName, index) => {
                if (lowerCaseName.includes(processedInput)) {
                    newClue.push(countryNames[index])
                }
            })
        }
        setClue(newClue)
        setSelectedClue(newClue.length !== 0 ? 0 : -1)
    }, [input, countryNamesInLowerCase, countryNames])

    const enterCountryName = () => {
        if (!canEnter || mysteriousCountry === null || input.trim().length === 0) return
        let newUnguessedСountries: CountryDto[] = unguessedСountries
        const currentInput = input.trim().toLowerCase()
        if (
            mysteriousCountry.name.common.toLowerCase() === currentInput ||
            mysteriousCountry.name.official.toLowerCase() === currentInput
        ) {
            newUnguessedСountries = unguessedСountries.filter(
                (country) => country !== mysteriousCountry,
            )
            setUnguessedCountries(newUnguessedСountries)
            setGuessedCountries([...guessedCountries, mysteriousCountry])
            setLastAnswer({
                status: 'right',
                answer: mysteriousCountry,
                correctAnswer: mysteriousCountry,
            })
        } else {
            let answer: CountryDto | null = null
            if (countries !== null)
                for (const country of countries) {
                    if (
                        country.name.common.toLowerCase() === currentInput ||
                        country.name.official.toLowerCase() === currentInput
                    ) {
                        answer = country
                        break
                    }
                }
            if (answer !== null)
                setLastAnswer({
                    status: 'wrong',
                    answer: answer,
                    correctAnswer: mysteriousCountry,
                })
        }

        guessCountry(unguessedСountries)
        setInput('')
    }

    useKeydown('Enter', () => {
        if (input.trim().length === 0) return
        if (!canEnter && clue.length !== 0) {
            setInput(clue[0])
        }
        enterCountryName()
    })

    useKeydown('Tab', (event) => {
        if (clue.length == 0) return
        event.preventDefault()
        const newSelectedClue = selectedClue + 1
        setSelectedClue(newSelectedClue >= clue.length ? 0 : newSelectedClue)
    })

    useKeydown('ArrowUp', (event) => {
        if (clue.length == 0) return
        event.preventDefault()
        const newSelectedClue = selectedClue - 1
        setSelectedClue(newSelectedClue < 0 ? clue.length - 1 : newSelectedClue)
    })

    useKeydown('ArrowDown', (event) => {
        if (clue.length == 0) return
        event.preventDefault()
        const newSelectedClue = selectedClue + 1
        setSelectedClue(newSelectedClue >= clue.length ? 0 : newSelectedClue)
    })

    return (
        <div className="app-container">
            <Header />
            <main className="content">
                {countries === null ? (
                    <b>Failder to fetch countries</b>
                ) : countries.length === 0 ? (
                    <b>Loading</b>
                ) : !gameIsOn ? (
                    <div className="start-game">
                        <h2 className="start-game__title">Правила игры</h2>
                        <ul className="start-game__rules">
                            <li className="start-game__rule">
                                Вам нужно угадать как можно больше флагов стран за более короткое
                                время
                            </li>
                            <li className="start-game__rule">
                                Вы можете пропустить флаг, если не знаете его
                            </li>
                        </ul>
                        <button className="button start-game__bth" onClick={startGame}>
                            Начать игру
                        </button>
                    </div>
                ) : (
                    <div className="game">
                        <div className="game__header">
                            <div>
                                <span className="game__info">
                                    Время:{' '}
                                    <b>
                                        {Math.floor(stopwatch / 1000 / 60) !== 0 && (
                                            <>{Math.floor(stopwatch / 1000 / 60)} мин. </>
                                        )}
                                        {Math.round((stopwatch / 1000) % 60)} сек.
                                    </b>
                                </span>
                                <span className="game__info">
                                    Счет:{' '}
                                    <b>
                                        {guessedCountries.length} из {countries.length}
                                    </b>
                                </span>
                            </div>
                            <button type="button" className="button game__bth" onClick={endGame}>
                                <span className="game__bth-icon">X</span>
                                <span className="game__bth-text">Закончить игру</span>
                            </button>
                        </div>
                        {mysteriousCountry !== null && (
                            <>
                                <img
                                    src={mysteriousCountry.flags.svg}
                                    alt="Mysterious flag"
                                    draggable={false}
                                    className="flag"
                                />
                            </>
                        )}
                        <div className="game__field-container">
                            <input
                                type="text"
                                value={input}
                                onChange={(event) => {
                                    setInput(event.target.value)
                                }}
                                className="game__field field"
                            />
                            <div
                                className={`game__field-bth ${
                                    canEnter ? '' : 'game__field-bth--disable'
                                }`}
                                onClick={enterCountryName}
                            >
                                <Arrow width="20px" fill="white" />
                            </div>
                            {!canEnter && (
                                <div className="clues">
                                    {clue.map((coutnryName, index) => (
                                        <>
                                            <span
                                                key={index}
                                                className={`clue ${
                                                    selectedClue === index ? 'clue--active' : ''
                                                }`}
                                                onClick={() => {
                                                    setInput(coutnryName)
                                                }}
                                            >
                                                {coutnryName}
                                            </span>
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                        {lastAnswer !== null && (
                            <div>
                                <span className="answer">
                                    Последний ответ:{' '}
                                    <span
                                        className={
                                            lastAnswer.status === 'right'
                                                ? 'answer__right'
                                                : 'answer__wrong'
                                        }
                                    >
                                        {lastAnswer.status === 'right' ? 'угадал' : 'не угадал'}
                                    </span>
                                </span>
                                <span className="answer">
                                    Мой ответ:{' '}
                                    <span className="country">
                                        {lastAnswer.answer.name.common}
                                        <div className="country__flag">
                                            <img
                                                src={lastAnswer.answer.flags.svg}
                                                alt={lastAnswer.answer.name.common}
                                            />
                                        </div>
                                    </span>
                                </span>
                                {lastAnswer.status === 'wrong' && (
                                    <span className="answer">
                                        Правильный ответ:{' '}
                                        <span className="country">
                                            {lastAnswer.correctAnswer.name.common}
                                            <div className="country__flag">
                                                <img
                                                    src={lastAnswer.correctAnswer.flags.svg}
                                                    alt={lastAnswer.correctAnswer.name.common}
                                                />
                                            </div>
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}
