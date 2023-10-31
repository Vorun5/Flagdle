import { CountryDto } from 'lib/dto/country-dto'

export const compareCountryName = (country: CountryDto, name: string) =>
  country.name.common.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase() ||
  country.name.official.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase()
