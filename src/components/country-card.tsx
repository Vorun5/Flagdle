import { Country } from 'lib/types'
import { Icons } from './icons'
import { useGameStore } from 'lib/stores/game'
import { formatPopulationNumber } from 'lib/helpers/format-population-number'
import { useTranslation } from 'react-i18next'

export const CountryCard = ({ country }: { country: Country }) => {
  const { t } = useTranslation()
  const { language } = useGameStore()

  return (
    <div className="country-card">
      <img
        className="country-card__img"
        src={`./flags/${country.id}.svg`}
        alt={country.translations[language].common}
      />
      <div className="country-card__info">
        <h3 className="country-card__name">{country.translations[language].common}</h3>
        <h4 className="country-card__population">
          {t('population')}: {formatPopulationNumber(country.population)}
        </h4>
        <a
          className="country-card__link"
          href={country.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Maps <Icons width="12px" height="12px" icon="external-link" />
        </a>
      </div>
    </div>
  )
}
