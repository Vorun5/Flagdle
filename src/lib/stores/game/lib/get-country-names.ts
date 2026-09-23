import { COUNTRIES_BY_ID } from 'lib/consts/countries'
import { getCountryTranslation } from 'lib/consts/country-translations'
import { CountryLanguages } from 'lib/types'

export const getCountryNames = ({
  language,
  countryIds,
}: {
  language: CountryLanguages
  countryIds: number[]
}) => {
  const commonCountryNames: string[] = []
  const officialCountryNames: string[] = []
  for (const countryId of countryIds) {
    const country = COUNTRIES_BY_ID.get(countryId)
    if (country) {
      const translation = getCountryTranslation(country, language)
      commonCountryNames.push(translation.common)
      officialCountryNames.push(translation.official)
    }
  }
  commonCountryNames.sort()
  officialCountryNames.sort()
  const countryNames = [...new Set([...commonCountryNames, ...officialCountryNames])]
  const countryNamesInLowerCase = countryNames.map(countryName => countryName.toLowerCase())

  return {
    countryNames,
    countryNamesInLowerCase,
  }
}
