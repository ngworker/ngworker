/**
 * @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  testRunnerNodeArgs: ['--experimental-vm-modules'],
  coverageAnalysis: 'off',
  jest: {
    projectType: 'custom',
    configFile: 'jest.simple.config.js',
    enableFindRelatedTests: false,
  },
  mutate: [
    'src/lib/feature-testing/util-text/**/*.ts',
    'src/lib/application-testing/util-dom/**/*.ts',
    'src/lib/application-testing/util-bootstrapping/**/*.ts',
    // Exclude test files
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/**/*.d.ts',
  ],
  ignorePatterns: [
    'node_modules',
    'dist',
    'coverage',
    'reports',
    'stryker-tmp',
  ],
  checkers: [],
  tsconfigFile: 'tsconfig.json',
  typescriptChecker: {
    prioritizePerformanceOverAccuracy: true,
  },
  htmlReporter: {
    fileName: 'mutation-report.html',
  },
  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
  logLevel: 'info',
  concurrency: 2,
  tempDirName: 'stryker-tmp',
  cleanTempDir: true,
  disableTypeChecks: true,
  timeoutMS: 120000,
  timeoutFactor: 2.0,
};
