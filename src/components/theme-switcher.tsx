import { useTheme } from 'lib/hooks/use-theme'
import { IconButton } from './icon-button'
import { useTranslation } from 'react-i18next'

export const ThemeSwitcher = () => {
  const { t } = useTranslation()
  const [theme, switchTheme] = useTheme()

  return (
    <IconButton
      icon={theme === 'dark' ? 'sun' : 'moon'}
      aria-label={theme === 'dark' ? t('switchToLightTheme') : t('switchToDarkTheme')}
      color={theme === 'dark' ? 'yellow' : 'gray'}
      onClick={switchTheme}
    />
  )
}
