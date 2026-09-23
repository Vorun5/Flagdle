import { Country, CountryLanguages, CountryTranslation } from 'lib/types'

const languageModules = import.meta.glob<{ default: Record<string, CountryTranslation> }>(
  './country-translations/*.json',
)
const loadedTranslations: Partial<Record<CountryLanguages, Record<string, CountryTranslation>>> = {}
const pendingLoads: Partial<Record<CountryLanguages, Promise<void>>> = {}

export const loadCountryLanguage = async (language: CountryLanguages): Promise<void> => {
  if (language === 'eng' || loadedTranslations[language]) return

  if (!pendingLoads[language]) {
    const load = languageModules[`./country-translations/${language}.json`]
    if (!load) throw new Error(`Missing country translations for ${language}`)

    pendingLoads[language] = load()
      .then(module => {
        loadedTranslations[language] = module.default
      })
      .finally(() => {
        delete pendingLoads[language]
      })
  }

  await pendingLoads[language]
}

export const getCountryTranslation = (country: Country, language: CountryLanguages) =>
  loadedTranslations[language]?.[country.id] ?? country.translations.eng
