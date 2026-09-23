import { useGameStore } from 'lib/stores/game/game'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const GameField = () => {
  const { t } = useTranslation()
  const { countryNames, countryNamesInLowerCase, enterCountryName } = useGameStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')
  const [selectedClue, setSelectedClue] = useState(0)

  const processedInput = input.trim().toLowerCase()
  const canEnter = processedInput.length > 0 && countryNamesInLowerCase.includes(processedInput)
  const clues = processedInput
    ? countryNames.filter((_, index) => countryNamesInLowerCase[index].includes(processedInput))
    : []
  const showClues = !canEnter && clues.length > 0

  const selectClue = (name: string) => {
    setInput(name)
    setSelectedClue(0)
    inputRef.current?.focus()
  }

  return (
    <form
      className="game__field-container"
      onSubmit={event => {
        event.preventDefault()
        if (canEnter) {
          enterCountryName(input)
          setInput('')
          setSelectedClue(0)
        } else if (showClues) {
          selectClue(clues[Math.min(selectedClue, clues.length - 1)])
        }
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={event => {
          setInput(event.target.value)
          setSelectedClue(0)
        }}
        onKeyDown={event => {
          if (!showClues) return
          if (event.key === 'Enter') {
            event.preventDefault()
            selectClue(clues[Math.min(selectedClue, clues.length - 1)])
          } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            setSelectedClue(index => (index + 1) % clues.length)
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setSelectedClue(index => (index - 1 + clues.length) % clues.length)
          }
        }}
        aria-label={t('countryName')}
        placeholder={t('typeCountryName')}
        autoComplete="off"
        className="game__field field"
      />
      <button
        type="submit"
        disabled={!canEnter}
        aria-label={t('submitAnswer')}
        className="button action-btn game__field-btn"
      >
        {t('submitAnswer')}
      </button>
      {showClues && (
        <ul className="clues">
          {clues.map((countryName, index) => (
            <li key={countryName}>
              <button
                type="button"
                className={`clue ${selectedClue === index ? 'clue--active' : ''}`}
                onClick={() => selectClue(countryName)}
              >
                {countryName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
