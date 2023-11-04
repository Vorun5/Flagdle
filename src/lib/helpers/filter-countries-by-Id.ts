import { Country } from 'lib/types'

export const filterCountriesById = (countries: Country[], countriesIds: number[]): Country[] => {
  return countries.filter((country) => countriesIds.includes(country.id))
}
