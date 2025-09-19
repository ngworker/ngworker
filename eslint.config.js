const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@typescript-eslint': typescriptEslint,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allowCircularSelfDependency: false,
          banTransitiveDependencies: true,
          checkNestedExternalImports: true,
          enforceBuildableLibDependency: true,
          allow: ['@docusaurus/**', '@site/**', '@theme/**'],
          depConstraints: [
            {
              sourceTag: 'scope:internal',
              onlyDependOnLibsWithTags: ['scope:internal'],
            },
            {
              sourceTag: 'type:e2e',
              onlyDependOnLibsWithTags: ['type:package', 'type:e2e-util'],
            },
            {
              sourceTag: 'type:e2e-util',
              onlyDependOnLibsWithTags: ['type:e2e-util'],
            },
            {
              sourceTag: 'type:package',
              onlyDependOnLibsWithTags: ['scope:internal'],
            },
            {
              sourceTag: 'type:tool',
              onlyDependOnLibsWithTags: ['type:tool'],
            },
            {
              sourceTag: 'type:docs',
              onlyDependOnLibsWithTags: ['type:docs'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.*?.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {},
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    languageOptions: {
      globals: {
        jest: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
      },
    },
    rules: {},
  },
  {
    files: ['eslint.config.js', '**/eslint.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
