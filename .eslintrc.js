module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "max-len": [1, { "code": 120 }],
    "linebreak-style": "off",
    "no-return-assign": "off",
    "no-explicit-any": "off",
    "no-underscore-dangle": "off",
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "no-param-reassign": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-this-alias": "off",
    "arrow-parens": "off",
    "no-restricted-globals": "off",
    "no-plusplus": "off",
    "no-nested-ternary": "off",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "no-shadow": "off",
  },
};