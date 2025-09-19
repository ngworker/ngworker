const baseConfig = require('../../../../eslint.config.js');
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
        project: [
          'packages/examples/tour-of-heroes-standalone/crisis-center/tsconfig.*?.json',
        ],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app-crisis',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app-crisis',
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
