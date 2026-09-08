const { FlatCompat } = require('@eslint/eslintrc');
const jestPlugin = require('eslint-plugin-jest');

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

module.exports = [
  ...compat.extends('expo'),
  {
    ignores: ['node_modules/', '.expo/', 'dist/'],
  },
  {
    files: ['**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
];