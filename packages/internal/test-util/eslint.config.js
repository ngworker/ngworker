const baseConfig = require('../../../eslint.config.js');
const typescriptParser = require('@typescript-eslint/parser');
const angularEslint = require('@angular-eslint/eslint-plugin');
const angularTemplateParser = require('@angular-eslint/template-parser');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['packages/internal/test-util/tsconfig.*?.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ngworker',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ngworker',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
    rules: {},
  },
];
