import { CountryList } from 'components/country-list'
import { COUNTRIES } from 'lib/consts/countries'
import { filterCountriesById } from 'lib/helpers/filter-countries-by-Id'
import { useGameStore } from 'lib/stores/game'
import { MAX_POPULATION, MIN_POPULATION } from 'lib/stores/game/type'
import { ALL_COUNTRY_CONTINENTS } from 'lib/types'
import { useId, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const GameFilters = () => {
  const { t } = useTranslation()
  const { filters, changeFilters, countryIds } = useGameStore()
  const [fromInput, setFromInput] = useState(String(filters.population.from))
  const [toInput, setToInput] = useState(String(filters.population.to))
  const fromId = useId()
  const toId = useId()
  const countries = useMemo(() => filterCountriesById(COUNTRIES, countryIds), [countryIds])

  const changePopulation = (from: string, to: string) => {
    changeFilters({
      ...filters,
      population: { from: Number(from || 0), to: Number(to || 0) },
    })
  }

  const normalizeInputs = () => {
    const population = useGameStore.getState().filters.population
    setFromInput(String(population.from))
    setToInput(String(population.to))
  }

  return (
    <details className="game-filters">
      <summary className="game-filters__summary">
        <span>{t('customizeCountries')}</span>
        <span>{t('eligibleCountries', { count: countryIds.length })}</span>
      </summary>
      <div className="game-filters__body">
        <fieldset className="game-filters__group">
          <legend>{t('continents')}</legend>
          <div className="continents-filter">
            <button
              type="button"
              className="continents-filter__item"
              aria-pressed={filters.continents.length === 0}
              onClick={() => changeFilters({ ...filters, continents: [] })}
            >
              {t('continentsList.All')}
            </button>
            {ALL_COUNTRY_CONTINENTS.map(continent => (
              <button
                key={continent}
                type="button"
                className="continents-filter__item"
                aria-pressed={filters.continents.includes(continent)}
                onClick={() =>
                  changeFilters({
                    ...filters,
                    continents: filters.continents.includes(continent)
                      ? filters.continents.filter(value => value !== continent)
                      : [...filters.continents, continent],
                  })
                }
              >
                {t(`continentsList.${continent}`)}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="game-filters__group">
          <legend>{t('population')}</legend>
          <div className="population-filter">
            <div>
              <label htmlFor={fromId}>{t('from')}</label>
              <input
                id={fromId}
                type="number"
                inputMode="numeric"
                min={MIN_POPULATION}
                max={MAX_POPULATION}
                value={fromInput}
                onChange={event => {
                  setFromInput(event.target.value)
                  changePopulation(event.target.value, toInput)
                }}
                onBlur={normalizeInputs}
              />
            </div>
            <div>
              <label htmlFor={toId}>{t('to')}</label>
              <input
                id={toId}
                type="number"
                inputMode="numeric"
                min={MIN_POPULATION}
                max={MAX_POPULATION}
                value={toInput}
                onChange={event => {
                  setToInput(event.target.value)
                  changePopulation(fromInput, event.target.value)
                }}
                onBlur={normalizeInputs}
              />
            </div>
          </div>
        </fieldset>
        {countryIds.length > 0 && (
          <details className="eligible-list">
            <summary>{t('showEligibleCountries')}</summary>
            <CountryList countries={countries} />
          </details>
        )}
      </div>
    </details>
  )
}
