/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting' // TODO: remove?
  ],
  rules: {
    "comma-spacing": ["warn", {
      "before": false,
      "after": true
    }],
    "key-spacing": ["warn", {
      "beforeColon": false,
      "afterColon": true
    }],
    "space-before-function-paren": ["warn", "always"],
    "vue/key-spacing": ["warn", {
      "beforeColon": false,
      "afterColon": true
    }],
    "vue/mustache-interpolation-spacing": ["warn", "always"],
    "vue/comma-spacing": ["warn"],
    "vue/html-indent": ["warn", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    "vue/html-closing-bracket-newline": ["warn", {
      "singleline": "never",
      "multiline": "always",
      "selfClosingTag": {
        "singleline": "never",
        "multiline": "always"
      }
    }],
    "vue/html-closing-bracket-spacing": ["warn", {
      "selfClosingTag": "always"
    }],
    "vue/singleline-html-element-content-newline": ["warn", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true
    }],
    "vue/multiline-html-element-content-newline": ["warn", {
      "ignoreWhenEmpty": true,
      "allowEmptyLines": false
    }],
    "vue/max-attributes-per-line": ["warn", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1,
      }
    }],
    "vue/multi-word-component-names": "off",
    "vue/attributes-order": ["warn", {
      "alphabetical": true
    }]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
