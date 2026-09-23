import assert from 'node:assert/strict'
import { before, beforeEach, test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { build } from 'vite'

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))

const savedValues = new Map()
globalThis.localStorage = {
  getItem: key => savedValues.get(key) ?? null,
  setItem: (key, value) => savedValues.set(key, value),
}

let store
let initGameStore
let getSavedGameLanguage
let chooseRoundCountries
let getCountryTranslation
let convertTime
let countries

before(async () => {
  await build({
    configFile: false,
    publicDir: false,
    logLevel: 'error',
    resolve: { alias: { lib: join(projectRoot, 'src/lib') } },
    build: {
      ssr: join(projectRoot, 'tests/test-entry.ts'),
      outDir: join(projectRoot, 'node_modules/.cache/flagdle-tests'),
      emptyOutDir: true,
      minify: false,
      rollupOptions: { output: { entryFileNames: 'bundle.mjs' } },
    },
  })
  const testModule = await import(
    pathToFileURL(join(projectRoot, 'node_modules/.cache/flagdle-tests/bundle.mjs')).href
  )
  store = testModule.useGameStore
  initGameStore = testModule.initGameStore
  getSavedGameLanguage = testModule.getSavedGameLanguage
  chooseRoundCountries = testModule.chooseRoundCountries
  getCountryTranslation = testModule.getCountryTranslation
  convertTime = testModule.convertTime
  countries = testModule.COUNTRIES
})

beforeEach(() => {
  savedValues.clear()
  store.setState(initGameStore())
})

test('unknown saved language falls back to English', () => {
  savedValues.set('game-language', 'invalid')
  assert.equal(getSavedGameLanguage(), 'eng')
  savedValues.set('game-language', 'rus')
  assert.equal(getSavedGameLanguage(), 'rus')
})

test('round selection is unique and leaves the eligible pool intact', () => {
  const eligible = countries.slice(0, 12).map(country => country.id)
  const sampled = chooseRoundCountries(eligible, 10, () => 0)
  assert.equal(sampled.length, 10)
  assert.equal(new Set(sampled).size, 10)
  assert.deepEqual(
    eligible,
    countries.slice(0, 12).map(country => country.id),
  )

  store.setState({ countryIds: eligible })
  store.getState().startGame()
  assert.equal(store.getState().roundCountryIds.length, 10)
  assert.equal(store.getState().countryIds.length, 12)
})

test('round size controls the sample and respects a smaller eligible pool', () => {
  const eligible = countries.slice(0, 30).map(country => country.id)
  store.setState({ countryIds: eligible })
  store.getState().changeRoundSize(25)
  store.getState().startGame()

  assert.equal(store.getState().roundCountryIds.length, 25)
  assert.equal(store.getState().unguessedСountryIds.length, 25)

  store.getState().endGame()
  store.getState().changeRoundSize(50)
  store.getState().startGame()
  assert.equal(store.getState().roundCountryIds.length, 30)
})

test('filters normalize limits without changing the caller object', () => {
  const filters = { population: { from: 2_000_000, to: 1_000_000 }, continents: [] }
  store.getState().changeFilters(filters)

  assert.deepEqual(filters.population, { from: 2_000_000, to: 1_000_000 })
  assert.deepEqual(store.getState().filters.population, { from: 1_000_000, to: 2_000_000 })
  assert.ok(
    store
      .getState()
      .countryIds.every(id =>
        countries.some(
          country =>
            country.id === id && country.population >= 1_000_000 && country.population <= 2_000_000,
        ),
      ),
  )

  filters.continents.push('Asia')
  assert.deepEqual(store.getState().filters.continents, [])
})

test('an empty eligible list cannot start a game', () => {
  store.setState({ countryIds: [] })
  store.getState().startGame()

  assert.equal(store.getState().gameStatus, 'idle')
  assert.equal(store.getState().mysteriousCountry, null)
})

test('the last correct answer records a complete result', () => {
  const country = countries[0]
  store.setState({ countryIds: [country.id] })
  store.getState().startGame()
  store.getState().enterCountryName(country.translations.eng.common)

  const state = store.getState()
  assert.equal(state.gameStatus, 'winner')
  assert.deepEqual(state.guessedСountryIds, [country.id])
  assert.deepEqual(state.unguessedСountryIds, [])
  assert.deepEqual(state.lastResult?.guessedСountryIds, [country.id])
  assert.deepEqual(state.lastResult?.countryIds, [country.id])
  assert.equal(state.mysteriousCountry, null)
})

test('an early finish keeps the current score and ignores later answers', () => {
  const [first, second] = countries
  store.setState({ countryIds: [first.id, second.id] })
  store.getState().startGame()
  const answer = store.getState().mysteriousCountry.translations.eng.common
  store.getState().enterCountryName(answer)
  store.getState().endGame()

  const result = store.getState().lastResult
  assert.equal(store.getState().gameStatus, 'finished')
  assert.equal(result.guessedСountryIds.length, 1)
  assert.equal(result.unguessedСountryIds.length, 1)

  store.getState().enterCountryName(second.translations.eng.common)
  assert.equal(store.getState().gameStatus, 'finished')
  assert.deepEqual(store.getState().lastResult, result)
})

test('a wrong answer does not show the same flag immediately', () => {
  const [first, second] = countries
  store.setState({ countryIds: [first.id, second.id] })
  store.getState().startGame()
  const firstFlag = store.getState().mysteriousCountry
  const wrongCountry = firstFlag.id === first.id ? second : first
  store.getState().enterCountryName(wrongCountry.translations.eng.common)

  assert.equal(store.getState().lastAnswer?.status, 'wrong')
  assert.notEqual(store.getState().mysteriousCountry?.id, firstFlag.id)
})

test('a selected country language loads its names on demand', async () => {
  await store.getState().changeGameLanguage('rus')

  const translated = getCountryTranslation(countries[0], 'rus').common
  assert.equal(store.getState().language, 'rus')
  assert.notEqual(translated, countries[0].translations.eng.common)
  assert.ok(store.getState().countryNames.includes(translated))
  assert.equal(savedValues.get('game-language'), 'rus')
})

test('elapsed time never displays 60 seconds', () => {
  assert.deepEqual(convertTime(59_999), { minutes: 0, seconds: 59 })
  assert.deepEqual(convertTime(60_999), { minutes: 1, seconds: 0 })
})
