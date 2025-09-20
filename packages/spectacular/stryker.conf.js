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
    configFile: 'jest.stryker.config.js',
    enableFindRelatedTests: true,
  },
  mutate: [
    'src/lib/**/*.ts',
    '!src/lib/**/*.spec.ts',
    '!src/lib/**/*.test.ts',
    '!src/lib/**/test-*.ts',
    '!src/lib/**/*.d.ts',
  ],
  ignorePatterns: [
    'node_modules',
    'dist',
    'coverage',
    'reports',
    'stryker-tmp',
  ],
  checkers: ['typescript'],
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
  disableTypeChecks: false,
  timeoutMS: 60000,
  timeoutFactor: 1.5,
};
