import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

const files = ['src/**/*.{ts,tsx}']

export default [
  { ignores: ['dist/**'] },
  { ...js.configs.recommended, files, languageOptions: { globals: globals.browser } },
  ...typescript.configs['flat/recommended'].map(config => ({ ...config, files })),
  { ...reactHooks.configs.flat.recommended, files },
  { ...reactRefresh.configs.vite, files },
  { ...prettier, files },
]
