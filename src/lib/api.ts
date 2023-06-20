import ky from 'ky'

export const api = ky.create({
    prefixUrl: 'https://restcountries.com/v3.1/',
    retry: {
        limit: 3,
        backoffLimit: 500,
    },
})
