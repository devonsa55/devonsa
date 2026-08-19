import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'node_lib/**', 'node_modules_test/**', 'run_dir/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
)
