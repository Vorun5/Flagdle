import { useTheme } from 'hooks/use-theme'
import { ReactComponent as SunIcon } from 'assets/icons/sun.svg'
import { ReactComponent as MoonIcon } from 'assets/icons/moon.svg'

export const ThemeSwitcher = () => {
    const [theme, switchTheme] = useTheme()
    const iconProps = {
        width: '30px',
        height: '30px',
    }

    return (
        <button type="button" className="theme-switcher" onClick={switchTheme}>
            {theme === 'dark' ? <SunIcon fill="yellow" {...iconProps} /> : <MoonIcon fill="gray" {...iconProps} />}
        </button>
    )
}
