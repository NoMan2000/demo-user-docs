// eslint-disable-next-line no-undef
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', '@blueprintjs'],
    extends: [
    'react-app',
    'react-app/jest',
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
    ],
    rules: {
        'no-debugger': 0,
        "@typescript-eslint/ban-types": 1,
    }
}