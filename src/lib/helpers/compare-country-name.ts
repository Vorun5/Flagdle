import { Country, CountryLanguages } from 'lib/types'
import { getCountryTranslation } from 'lib/consts/country-translations'

export const compareCountryName = ({
  country,
  language,
  name,
}: {
  country: Country
  language: CountryLanguages
  name: string
}) => {
  const translation = getCountryTranslation(country, language)
  const normalizedName = name.trim().toLocaleLowerCase()

  return (
    translation.common.trim().toLocaleLowerCase() === normalizedName ||
    translation.official.trim().toLocaleLowerCase() === normalizedName
  )
}
