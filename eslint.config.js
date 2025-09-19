const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  { plugins: { '@nx': nxEslintPlugin } },
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
  ...compat
    .config({
      extends: ['plugin:@nx/typescript'],
      parserOptions: { project: './tsconfig.*?.json' },
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        ...config.rules,
      },
    })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map(config => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      ...config.rules,
    },
  })),
  ...compat.config({ env: { jest: true } }).map(config => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...config.rules,
    },
  })),
];
