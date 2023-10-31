import { ThemeSwitcher } from 'components/theme-switcher'
import 'styles/header.css'

export const Header = () => {
  return (
    <header className="header">
      <h1 className="logo__title">Flagdle</h1>
      <div className="header__setting">
        <ThemeSwitcher />
      </div>
    </header>
  )
}
