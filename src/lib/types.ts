export const ALL_COUNTRY_LANGUAGES = [
  'ara',
  'bre',
  'ces',
  'cym',
  'deu',
  'eng',
  'est',
  'fin',
  'fra',
  'hrv',
  'hun',
  'ita',
  'jpn',
  'kor',
  'nld',
  'per',
  'pol',
  'rus',
  'slk',
  'spa',
  'srp',
  'swe',
  'tur',
  'urd',
  'zho',
] as const

export type CountryLanguages = (typeof ALL_COUNTRY_LANGUAGES)[number]

export type CountryTranslation = {
  common: string
  official: string
}

export type CountryContinent =
  | 'North America'
  | 'Africa'
  | 'Asia'
  | 'Oceania'
  | 'South America'
  | 'Europe'
  | 'Antarctica'

export const ALL_COUNTRY_CONTINENTS: CountryContinent[] = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America',
]

export type CountryRegion = 'Americas' | 'Africa' | 'Asia' | 'Oceania' | 'Europe' | 'Antarctic'

export const ALL_COUNTRY_REGIONS: CountryRegion[] = [
  'Africa',
  'Americas',
  'Antarctic',
  'Asia',
  'Europe',
  'Oceania',
]

export type Country = {
  id: number
  code: string
  link: string
  population: number
  continents: CountryContinent[]
  region: CountryRegion
  flag: {
    url: string
  }
  translations: { eng: CountryTranslation }
}
