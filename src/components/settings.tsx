import { useState } from 'react'
import { IconButton } from './icon-button'
import { Modal } from './modal/modal'
import { Select } from './select'
import { useGameStore } from 'lib/stores/game/game'
import { ALL_COUNTRY_LANGUAGES, CountryLanguages } from 'lib/types'
import { useTranslation } from 'react-i18next'

const gameLanguages = {
  ara: 'اللغة العربية', // Арабский
  bre: 'ar brezhoneg', // Бретонский
  ces: 'čeština', // Чешский
  cym: 'Cymraeg', // Валлийский
  deu: 'Deutsch', // Немецкий
  eng: 'English', // Английский
  est: 'eesti keel', // Эстонский
  fin: 'Suomen kieli', // Финский
  fra: 'Français', // Французский
  hrv: 'Ḫrvatski', // Хорватский
  hun: 'magyar nyelv', // Венгерский
  ita: 'lingua italiana', // Итальянский
  jpn: '日本語', // Японский
  kor: '한국인', // Корейский
  nld: 'Nederlands', // Голландский
  per: 'زبان فارسي', // Персидский
  pol: 'Polski', // Польский
  rus: 'Русский', // Русский
  slk: 'Slovenský', // Словацкий
  spa: 'Español', // Испанский язык
  srp: 'Српски', // Сербский
  swe: 'svenska', // Шведский
  tur: 'Türk Dili', // Турецкий
  urd: 'اردو', // Урду
  zho: '中国人', // Китайский
}

const siteLanguages = [
  {
    label: 'Русский',
    value: 'ru',
  },
  {
    label: 'English',
    value: 'en',
  },
]

export const Settings = () => {
  const { t, i18n } = useTranslation()
  const { language, changeGameLanguage } = useGameStore()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <IconButton icon="settings" onClick={() => setOpened(true)} />
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <section className="settings">
          <div className="settings__header">
            <h2 className="settings__title">{t('settings')}</h2>
            <IconButton icon="close" onClick={() => setOpened(false)} />
          </div>
          <div className="settings__content">
            <span className="settings__subtitle">{t('siteLanguage')}</span>
            <Select
              selectedValue={i18n.language}
              onSelect={(lang) => i18n.changeLanguage(lang)}
              options={siteLanguages}
            />
            <span className="settings__subtitle">{t('gameLanguage')}</span>
            <Select
              selectedValue={language}
              onSelect={(lang) => changeGameLanguage(lang as CountryLanguages)}
              options={ALL_COUNTRY_LANGUAGES.map((lang) => ({
                value: lang,
                label: gameLanguages[lang],
              }))}
            />
          </div>
        </section>
      </Modal>
    </>
  )
}
