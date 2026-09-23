import { Settings } from 'components/settings'
import { ThemeSwitcher } from 'components/theme-switcher'
import './header.css'

export const Header = () => {
  return (
    <header className="header">
      <h1 className="logo__title">Flagdle</h1>
      <div className="header__settings">
        <ThemeSwitcher />
        <Settings />
      </div>
    </header>
  )
}
