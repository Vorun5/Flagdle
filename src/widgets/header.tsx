import { ThemeSwitcher } from 'components/theme-switcher'

export const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <h1 className='logo__title'>Flagdle</h1>
            </div>
            <div className="header__setting">
                <ThemeSwitcher />
            </div>
        </header>
    )
}
