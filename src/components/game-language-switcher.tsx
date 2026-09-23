import { useGameStore } from 'lib/stores/game'
import { ALL_COUNTRY_LANGUAGES, CountryLanguages } from 'lib/types'
import { useTranslation } from 'react-i18next'

const languageNames: Record<CountryLanguages, string> = {
  ara: 'العربية',
  bre: 'Brezhoneg',
  ces: 'Čeština',
  cym: 'Cymraeg',
  deu: 'Deutsch',
  eng: 'English',
  est: 'Eesti',
  fin: 'Suomi',
  fra: 'Français',
  hrv: 'Hrvatski',
  hun: 'Magyar',
  ita: 'Italiano',
  jpn: '日本語',
  kor: '한국어',
  nld: 'Nederlands',
  per: 'فارسی',
  pol: 'Polski',
  rus: 'Русский',
  slk: 'Slovenčina',
  spa: 'Español',
  srp: 'Српски',
  swe: 'Svenska',
  tur: 'Türkçe',
  urd: 'اردو',
  zho: '中文',
}

export const GameLanguageSwitcher = () => {
  const { t } = useTranslation()
  const { language, languageLoading, languageError, changeGameLanguage } = useGameStore()

  return (
    <div className="header__game-language">
      <label htmlFor="game-language">{t('gameLanguageShort')}</label>
      <select
        id="game-language"
        value={language}
        disabled={languageLoading}
        onChange={event => {
          void changeGameLanguage(event.target.value as CountryLanguages)
        }}
      >
        {ALL_COUNTRY_LANGUAGES.map(code => (
          <option key={code} value={code}>
            {languageNames[code]}
          </option>
        ))}
      </select>
      {languageError && <span role="alert">{t('languageLoadError')}</span>}
    </div>
  )
}
