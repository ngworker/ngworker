const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/packages/spectacular',
    '<rootDir>/tools',
    '<rootDir>/packages/examples/tour-of-heroes/crisis-center',
    '<rootDir>/packages/internal/test-util',
  ],
};
