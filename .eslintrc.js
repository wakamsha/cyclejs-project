module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    Office: 'readonly',
  },
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'sort-imports-es6-autofix'],
  rules: {
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/no-namespace': ['off'],
    'class-methods-use-this': ['off'],
    'consistent-return': ['off'],
    'default-case': ['off'],
    'func-names': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/no-unresolved': ['off'],
    'import/order': ['off'],
    'import/prefer-default-export': ['off'],
    'no-alert': ['off'],
    'no-await-in-loop': ['off'],
    'no-case-declarations': ['error'],
    'no-console': ['off'],
    'no-inner-declarations': ['off'],
    'no-multi-assign': ['off'],
    'no-plusplus': ['off'],
    'no-restricted-syntax': ['off'],
    'no-return-assign': ['off'],
    'no-param-reassign': ['off'],
    'no-throw-literal': ['off'],
    'no-underscore-dangle': ['off'],
    'no-useless-constructor': ['off'],
    'no-shadow': ['off'],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'max-classes-per-file': ['error', 3],
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
  },
};
