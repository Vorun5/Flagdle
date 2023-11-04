import { ALL_COUNTRY_CONTINENTS } from 'lib/types'
import { useGameStore, GameFiltersType, MAX_POPULATION, MIN_POPULATION } from 'lib/stores/game'
import { useEffect, useId, useState } from 'react'

export const GameFilters = () => {
  const [localFilters, setLocalFilters] = useState<GameFiltersType | null>(null)
  const { filters, changeFilters, countryIds, startGame } = useGameStore()
  const fromId = useId()
  const toId = useId()

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  if (localFilters === null) return <></>

  return (
    <div className="game-filters">
      <h2 className="game-filters__title">Фильтры ({countryIds.length})</h2>
      <h4 className="game-filters__subtitle">Континенты</h4>
      <div className="continents-filter">
        <button
          className={`continents-filter__item ${
            localFilters.continents.length === 0 ? 'continents-filter__item--active' : ''
          }`}
          onClick={() =>
            setLocalFilters({
              ...localFilters,
              continents: [],
            })
          }
        >
          Все континенты
        </button>
        {ALL_COUNTRY_CONTINENTS.map((continent) => (
          <button
            key={continent}
            className={`continents-filter__item ${
              localFilters.continents.includes(continent) ? 'continents-filter__item--active' : ''
            }`}
            onClick={() => {
              setLocalFilters({
                ...localFilters,
                continents: localFilters.continents.includes(continent)
                  ? localFilters.continents.filter((c) => c !== continent)
                  : [...localFilters.continents, continent],
              })
            }}
          >
            {continent}
          </button>
        ))}
      </div>
      <h4 className="game-filters__subtitle">Население</h4>
      <div className="population-filter">
        <div className="population-field__container">
          <label className="population-field__label" htmlFor={fromId}>
            От
          </label>
          <input
            className="field"
            id={fromId}
            type="number"
            value={localFilters.population.from}
            defaultValue={MIN_POPULATION}
            min={MIN_POPULATION}
            max={MAX_POPULATION}
            onChange={(event) => {
              const from = event.target.value ? Number(event.target.value) : 0
              setLocalFilters({
                ...localFilters,
                population: {
                  ...localFilters.population,
                  from,
                },
              })
            }}
          />
        </div>
        <div className="population-field__container">
          <label className="population-field__label" htmlFor={toId}>
            До
          </label>
          <input
            className="field"
            id={toId}
            type="number"
            value={localFilters.population.to}
            defaultValue={MAX_POPULATION}
            min={MIN_POPULATION}
            max={MAX_POPULATION}
            onChange={(event) => {
              const to = event.target.value ? Number(event.target.value) : 0
              setLocalFilters({
                ...localFilters,
                population: {
                  ...localFilters.population,
                  to,
                },
              })
            }}
          />
        </div>
      </div>
      <div className="game-filters__actions">
        <button
          className="button action-btn"
          onClick={() => {
            changeFilters(localFilters)
          }}
        >
          Применить фильтры
        </button>
        <button className="button action-btn" onClick={startGame}>
          Начать игру
        </button>
      </div>
    </div>
  )
}
