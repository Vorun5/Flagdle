import { ALL_COUNTRY_CONTINENTS } from 'lib/types'
import { useGameStore, GameFiltersType, MAX_POPULATION, MIN_POPULATION } from 'lib/stores/game'
import { useEffect, useId, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { COUNTRIES } from 'lib/consts/countries'
import { filterCountriesById } from 'lib/helpers/filter-countries-by-Id'
import { CountryList } from 'components/country-list'

export const GameFilters = () => {
  const { t } = useTranslation()
  const [localFilters, setLocalFilters] = useState<GameFiltersType | null>(null)
  const [showCountriesList, setShowCountriesList] = useState(false)
  const { filters, changeFilters, countryIds, startGame } = useGameStore()
  const fromId = useId()
  const toId = useId()

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const countries = useMemo(() => filterCountriesById(COUNTRIES, countryIds), [countryIds])

  if (localFilters === null) return <></>

  return (
    <div className="game-filters">
      <h2 className="game-filters__title">{t('filters')}</h2>
      <h4 className="game-filters__subtitle">{t('continents')}</h4>
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
          {t('continentsList.All')}
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
            {t(`continentsList.${continent}`)}
          </button>
        ))}
      </div>
      <h4 className="game-filters__subtitle">{t('population')}</h4>
      <div className="population-filter">
        <div className="population-field__container">
          <label className="population-field__label" htmlFor={fromId}>
            {t('from')}
          </label>
          <input
            className="field"
            id={fromId}
            type="number"
            value={localFilters.population.from}
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
            {t('to')}
          </label>
          <input
            className="field"
            id={toId}
            type="number"
            value={localFilters.population.to}
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
          {t('applyFilters')}
        </button>
      </div>
      <div className="countries">
        <span className="countries__title">
          {t('numberOfEligibleCountries')}: <b style={{ fontWeight: '500' }}>{countryIds.length}</b>{' '}
          {countryIds.length !== 0 && (
            <span
              className="countries__show"
              onClick={() => setShowCountriesList(!showCountriesList)}
            >
              [{showCountriesList ? t('hide') : t('show')}]
            </span>
          )}
          {countryIds.length === 0 && (
            <>
              <br />
              <span className="countries__warning">{t('impossibleToStartTheGame')}</span>
            </>
          )}
        </span>
        <button
          disabled={countryIds.length === 0}
          className="button action-btn"
          onClick={startGame}
        >
          {t('startTheGame')}
        </button>
        {showCountriesList && <CountryList countries={countries} />}
      </div>
    </div>
  )
}
