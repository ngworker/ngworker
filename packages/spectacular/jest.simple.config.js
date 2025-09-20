/* eslint-disable */
const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  displayName: 'spectacular-simple',
  coverageDirectory: '../../coverage/packages/spectacular',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/trim-leading-text.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts|js)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules'],
};
