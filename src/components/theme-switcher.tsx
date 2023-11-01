import { useTheme } from 'lib/hooks/use-theme'
import { IconButton } from './icon-button'

export const ThemeSwitcher = () => {
  const [theme, switchTheme] = useTheme()

  return (
    <IconButton
      icon={theme === 'dark' ? 'sun' : 'moon'}
      color={theme === 'dark' ? 'yellow' : 'gray'}
      onClick={switchTheme}
    />
  )
}
