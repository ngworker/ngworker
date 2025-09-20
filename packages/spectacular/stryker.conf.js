/**
 * @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  
  // Enhanced Node.js arguments for ESM support
  testRunnerNodeArgs: [
    '--experimental-vm-modules',
    '--loader=ts-node/esm',
    '--experimental-specifier-resolution=node',
  ],
  
  coverageAnalysis: 'off',
  
  jest: {
    projectType: 'custom',
    configFile: 'jest.stryker.config.js',
    enableFindRelatedTests: true,
  },
  
  // Expanded mutation targets to include Angular code
  mutate: [
    'src/lib/pipe-testing/**/*.ts',
    'src/lib/feature-testing/util-text/**/*.ts',
    'src/lib/application-testing/util-dom/**/*.ts',
    'src/lib/application-testing/util-bootstrapping/**/*.ts',
    // Include some Angular-specific utilities
    'src/lib/shared/app-component/**/*.ts',
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
  
  // Enable TypeScript checker with ESM support
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
  concurrency: 1, // Reduced for debugging
  tempDirName: 'stryker-tmp',
  cleanTempDir: false, // Keep for debugging
  disableTypeChecks: false,
  timeoutMS: 120000,
  timeoutFactor: 2.0,
  
  // Additional ESM-related options
  symlinkNodeModules: true,
};
