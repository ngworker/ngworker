const nx = require('@nx/eslint-plugin');

module.exports = [
  { plugins: { '@nx': nx } },
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
  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.*?.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
    },
  },
  // JavaScript files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {},
  },
  // Test files
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
];
