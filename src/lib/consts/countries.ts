import countries from './countries-base.json'
import { Country } from 'lib/types'

export const COUNTRIES: Country[] = countries as Country[]

export const COUNTRIES_IDS = COUNTRIES.map(country => country.id)

export const COUNTRIES_BY_ID = new Map(COUNTRIES.map(country => [country.id, country]))
