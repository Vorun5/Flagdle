import { GameLanguageSwitcher } from 'components/game-language-switcher'
import { SiteLanguageSwitcher } from 'components/site-language-switcher'
import { ThemeSwitcher } from 'components/theme-switcher'
import './header.css'

export const Header = () => {
  return (
    <header className="header">
      <h1 className="logo__title">Flagdle</h1>
      <GameLanguageSwitcher />
      <div className="header__actions">
        <ThemeSwitcher />
        <SiteLanguageSwitcher />
      </div>
    </header>
  )
}
