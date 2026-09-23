import { Country, CountryLanguages } from 'lib/types'

export const compareCountryName = ({
  country,
  language,
  name,
}: {
  country: Country
  language: CountryLanguages
  name: string
}) =>
  country.translations[language].common.trim().toLocaleLowerCase() ===
    name.trim().toLocaleLowerCase() ||
  country.translations[language].official.trim().toLocaleLowerCase() ===
    name.trim().toLocaleLowerCase()
