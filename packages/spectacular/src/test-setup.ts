// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/14.2/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};
import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';
