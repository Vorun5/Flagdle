export type CountryLanguages = keyof Country['translations']

export const ALL_COUNTRY_LANGUAGES: CountryLanguages[] = [
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
]

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

export type CountryRegion = 'Americas' | 'Africa' | 'Asia' | 'Oceania' | 'Europe' | 'Antarctic'

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
  translations: {
    eng: CountryTranslation
    ara: CountryTranslation
    bre: CountryTranslation
    ces: CountryTranslation
    cym: CountryTranslation
    deu: CountryTranslation
    est: CountryTranslation
    fin: CountryTranslation
    fra: CountryTranslation
    hrv: CountryTranslation
    hun: CountryTranslation
    ita: CountryTranslation
    jpn: CountryTranslation
    kor: CountryTranslation
    nld: CountryTranslation
    per: CountryTranslation
    pol: CountryTranslation
    rus: CountryTranslation
    slk: CountryTranslation
    spa: CountryTranslation
    srp: CountryTranslation
    swe: CountryTranslation
    tur: CountryTranslation
    urd: CountryTranslation
    zho: CountryTranslation
  }
}
