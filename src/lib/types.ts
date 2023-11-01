export type CountryLanguages = keyof Country['translations']

export type CountryTranslation = {
  common: string
  official: string
}

export type Country = {
  id: number
  code: string
  link: string
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
