/* eslint-disable */
const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  displayName: 'spectacular-stryker',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup-stryker.ts'],
  coverageDirectory: '../../coverage/packages/spectacular',
  
  // ESM support configuration
  extensionsToTreatAsEsm: ['.ts'],
  
  // Module resolution for Angular ESM modules
  moduleNameMapper: {
    '^@angular/(.*)$': '<rootDir>/../../node_modules/@angular/$1',
  },
  
  // Transform configuration optimized for Stryker
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.(html|svg)$',
        tsconfig: '<rootDir>/tsconfig.spec.json',
        useESM: true,
      },
    ],
  },
  
  // Transform ignore patterns for ESM modules
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|@ngrx|@ngworker|@stryker-mutator|.*\\.mjs$))',
  ],
  
  // Test environment configuration
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
  
  // File matching
  rootDir: '.',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'mjs'],
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/src/**/*.test.ts'],
  
  // Serializers for Angular testing
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot', 
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
