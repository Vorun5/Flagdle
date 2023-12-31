import { Icons } from 'components/icons'
import { useKeydown } from 'lib/hooks/use-keydown'
import { useGameStore } from 'lib/stores/game/game'
import { useEffect, useRef, useState } from 'react'

export const GameField = () => {
  const { language, countryNames, countryNamesInLowerCase, enterCountryName } = useGameStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState('')
  const [selectedClue, setSelectedClue] = useState(-1)

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
    if (!canEnter || input.trim().length === 0) {
      setCanEnter(false)
      return
    }
    enterCountryName(input, language)
    setInput('')
  }

  useKeydown('Enter', () => {
    if (!canEnter && clue.length !== 0) {
      setInput(clue[selectedClue])
      return
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
    <div className="game__field-container">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value)
        }}
        className="game__field field"
      />
      <div
        className={`game__field-btn ${canEnter ? '' : 'game__field-btn--disable'}`}
        onClick={localEnterCountryName}
      >
        <Icons icon="arrow-r" width="20px" height="20px" color="white" />
      </div>
      {!canEnter && (
        <div className="clues">
          {clue.map((coutnryName, index) => (
            <span
              key={coutnryName}
              className={`clue ${selectedClue === index ? 'clue--active' : ''}`}
              onClick={() => {
                setInput(coutnryName)
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
            >
              {coutnryName}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
