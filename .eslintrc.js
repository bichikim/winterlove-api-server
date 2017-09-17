module.exports = {
  parser: "babel-eslint",
  plugins: ['html', 'vue'],
  env: {
    "browser": true,
    "es6": true,
    "amd": true,
  },
  extends: ["eslint:recommended", "google", "vue"],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    'vue/jsx-uses-vars': 2,
    'max-len': ['error', 140],
    'one-var': 'off',
    'no-console': 'off',
    'indent': ['error', 2],
    'linebreak-style': 'off',
    'comma-dangle': ['error', "always-multiline"],
    'camelcase': 'off',
    'space-before-function-paren': ['error', "never"],
    'object-curly-spacing': ['error', "never"],
    'keyword-spacing': ['error', {
      'overrides': {
        'if': {
          'before': false , 'after': false,
        },
        'for': {
          'before': false , 'after': false,
        },
        'while': {
          'before': false , 'after': false,
        },
        'switch': {
          'before': false , 'after': false,
        }
      }
    }],
    'space-before-blocks': ['error', 'never'],
  }
};