import { Country } from 'lib/types'
import { CountryCard } from './country-card'
import { memo } from 'react'

export const CountryList = memo(function CountryList({ countries }: { countries: Country[] }) {
  return (
    <ul className="country-list">
      {countries.map((country) => (
        <li key={country.id}>
          <CountryCard country={country} />
        </li>
      ))}
    </ul>
  )
})
