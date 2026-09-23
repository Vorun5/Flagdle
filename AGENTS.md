# Flagdle contributor guide

Flagdle is a client-only flag guessing game built with React 18, TypeScript, Vite, Zustand, and i18next. Country data and flag SVGs are checked into this repository; the game does not need a live country API.

## Where things live

- `src/lib/consts/countries-base.json` contains country metadata and English names. `src/lib/consts/country-translations/<language>.json` contains other names, loaded on demand by `country-translations.ts`. `public/flags/<id>.svg` contains the matching flag images.
- `src/lib/stores/game/` owns game state, answer handling, and filter changes. Keep game rules here rather than in UI components.
- `src/widgets/game/` is the active round; `src/widgets/game-info/` is the start, filters, and results screen.
- `src/components/` contains shared UI. `public/locales/en` and `public/locales/ru` contain interface translations. The header has separate controls for interface language and country names.

## Working on the game

- Run `npm ci`, `npm test`, `npm run lint`, and `npm run build` before handing off a change. Use `npm run dev` for manual UI checks.
- Keep store updates immutable. Do not mutate filter objects or country ID arrays received from components; Zustand subscribers rely on new references.
- Preserve the invariant that an active game has at least one country in `roundCountryIds` and a non-null mysterious country. Filters determine `countryIds` (the eligible pool); a round samples up to 10, 25, or 50 IDs from it. An empty filtered list must not start a round.
- A correct answer removes exactly that country from the unguessed IDs. A wrong answer should show a different flag next when the round has another unguessed country. The result records the elapsed time and the final guessed/unguessed IDs. Ending early must preserve the actual score.
- Store only a validated `CountryLanguages` value in `localStorage`; an unknown saved value should fall back to English.
- When changing UI copy, update both locale JSON files. Keep form controls keyboard accessible and avoid document-wide shortcuts for input-specific actions.
- Treat the country catalog as static data. Keep all language files aligned with the base country IDs. Do not hand edit generated-looking country entries or flag assets for unrelated code cleanup.

## graphify

When the user explicitly requests `/graphify`, follow the graphify skill at `~/.agents/skills/graphify/SKILL.md` before other project work. Generated graph output is optional for ordinary code changes.
