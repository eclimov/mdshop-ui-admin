module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    "ecmaVersion": 2020
  },
  extends: [
    'standard',
    'eslint:recommended',
    '@vue/standard',
    'plugin:vue/recommended',
    'plugin:vue-scoped-css/recommended'
  ],
  rules: {}
}
