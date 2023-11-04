import { COUNTRIES } from 'lib/consts/countries'
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
    const country = COUNTRIES.find((country) => country.id === countryId)
    if (country) {
      commonCountryNames.push(country.translations[language].common)
      officialCountryNames.push(country.translations[language].official)
    }
  }
  commonCountryNames.sort()
  officialCountryNames.sort()
  const countryNames = [...new Set([...commonCountryNames, ...officialCountryNames])]
  const countryNamesInLowerCase = countryNames.map((countryName) => countryName.toLowerCase())

  return {
    countryNames,
    countryNamesInLowerCase,
  }
}
