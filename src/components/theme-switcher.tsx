import { useTheme } from 'hooks/use-theme'
import { Icons } from './icons'

export const ThemeSwitcher = () => {
  const [theme, switchTheme] = useTheme()
  const iconProps = {
    width: '30px',
    height: '30px',
  }

  return (
    <button type="button" className="theme-switcher" onClick={switchTheme}>
      {theme === 'dark' ? (
        <Icons icon="sun" color="yellow" {...iconProps} />
      ) : (
        <Icons icon="moon" color="gray" {...iconProps} />
      )}
    </button>
  )
}
