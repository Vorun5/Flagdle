import { useKeydown } from 'hooks/use-keydown'
import { useCountriesStore } from 'lib/stores/countries'
import { useGameStore } from 'lib/stores/game'
import { useEffect, useState } from 'react'
import { Icons } from './icons'

const Stopwatch = () => {
    const { gameIsOn, startTime } = useGameStore()

    const [stopwatch, setStopwatch] = useState(0)
    useEffect(() => {
        if (!gameIsOn) return
        setStopwatch(0)
        const interval = setInterval(() => {
            const nowDate = new Date()
            setStopwatch(nowDate.getTime() - startTime)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [gameIsOn, startTime])

    return (
        <span className="game__info">
            Время:{' '}
            <b>
                {Math.floor(stopwatch / 1000 / 60) !== 0 && (
                    <>{Math.floor(stopwatch / 1000 / 60)} мин. </>
                )}
                {Math.round((stopwatch / 1000) % 60)} сек.
            </b>
        </span>
    )
}

const Score = () => {
    const { countries } = useCountriesStore()
    const { guessedCountries } = useGameStore()

    return (
        <span className="game__info">
            Счет:{' '}
            <b>
                {guessedCountries.length} из {countries.length}
            </b>
        </span>
    )
}

export const Game = () => {
    const { countries, countryNames, countryNamesInLowerCase } = useCountriesStore()
    const { endGame, mysteriousCountry, enterCountryName, lastAnswer } = useGameStore()

    const [input, setInput] = useState('')
    const [selectedClue, setSelectedClue] = useState(-1)

    // in milliseconds

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

    const localEnterCountryName = () => {
        if (!canEnter || mysteriousCountry === null || input.trim().length === 0) return
        enterCountryName(input, countries)
        setInput('')
    }

    useKeydown('Enter', () => {
        if (input.trim().length === 0) return
        if (!canEnter && clue.length !== 0) {
            setInput(clue[0])
        }
        localEnterCountryName()
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
        <div className="game">
            <div className="game__header">
                <div>
                    <Stopwatch />
                    <Score />
                </div>
                <button type="button" className="button game__bth" onClick={endGame}>
                    <span className="game__bth-icon">
                        <Icons icon="close" width="32px" height="32px" />
                    </span>
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
                    className={`game__field-bth ${canEnter ? '' : 'game__field-bth--disable'}`}
                    onClick={localEnterCountryName}
                >
                    <Icons icon="arrow-r" width="20px" height="20px" color="white" />
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
                                lastAnswer.status === 'right' ? 'answer__right' : 'answer__wrong'
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
    )
}
