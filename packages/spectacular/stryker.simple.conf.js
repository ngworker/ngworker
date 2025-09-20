/**
 * @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'off',
  jest: {
    projectType: 'custom',
    configFile: 'jest.simple.config.js',
    enableFindRelatedTests: false,
  },
  mutate: ['src/lib/feature-testing/util-text/trim-leading-text.ts'],
  ignorePatterns: [
    'node_modules',
    'dist',
    'coverage',
    'reports',
    'stryker-tmp',
    // Don't ignore the specific test file we need
    // '**/*.spec.ts',
    // '**/*.test.ts',
  ],
  checkers: [],
  htmlReporter: {
    fileName: 'mutation-report.html',
  },
  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
  logLevel: 'info',
  concurrency: 1,
  tempDirName: 'stryker-tmp',
  cleanTempDir: true,
  timeoutMS: 30000,
  timeoutFactor: 1.5,
};
