import { api } from 'lib/api'
import { CountryDto } from 'lib/dto/country-dto'
import { create } from 'zustand'

type State = {
    countries: CountryDto[]
    countryNames: string[]
    countryNamesInLowerCase: string[]
    status: 'idle' | 'error' | 'success'
}

type Actions = {
    fetchCountries: () => Promise<void>
}

export const useCountriesStore = create<State & Actions>((set) => ({
    countries: [],
    countryNames: [],
    countryNamesInLowerCase: [],
    status: 'idle',
    fetchCountries: async () => {
        try {
            const newCountries = await api.get('all').json<CountryDto[]>()
            const commonCountryNames: string[] = []
            const officialnCountryNames: string[] = []
            for (const country of newCountries) {
                commonCountryNames.push(country.name.common)
                officialnCountryNames.push(country.name.official)
            }
            commonCountryNames.sort()
            officialnCountryNames.sort()
            const countryNames = [...new Set([...commonCountryNames, ...officialnCountryNames])]
            const countryNamesInLowerCase = countryNames.map((countryName) =>
                countryName.toLowerCase(),
            )
            set({
                countries: newCountries,
                countryNames,
                countryNamesInLowerCase,
                status: 'success',
            })
        } catch (error) {
            console.log(error)

            set({ status: 'error' })
        }
    },
}))
