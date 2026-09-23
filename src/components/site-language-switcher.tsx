import { useTranslation } from 'react-i18next'

export const SiteLanguageSwitcher = () => {
  const { t, i18n } = useTranslation()
  const isRussian = i18n.resolvedLanguage?.startsWith('ru') ?? false
  const nextLanguage = isRussian ? 'en' : 'ru'

  return (
    <button
      type="button"
      className="site-language-switcher"
      aria-label={t('switchSiteLanguage', { language: nextLanguage.toUpperCase() })}
      onClick={() => {
        void i18n.changeLanguage(nextLanguage)
      }}
    >
      {nextLanguage.toUpperCase()}
    </button>
  )
}
