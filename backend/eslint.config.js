import { Linter } from 'eslint';
import airbnbBase from 'eslint-config-airbnb-base';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';

export default /** @type {Linter.FlatConfig[]} */ ([
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'class-methods-use-this': 'off',
      'max-len': ['error', { code: 100, ignoreComments: true }],
      'no-console': 'warn',
    },
  },
]);
