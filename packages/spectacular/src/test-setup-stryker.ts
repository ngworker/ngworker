// Stryker-specific test setup that handles ESM properly
// This setup avoids the jest-preset-angular/setup-jest import that causes ESM issues

// Set up global configuration for ngJest
// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/14.2/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};

// Import testing library matchers
import '@testing-library/jest-dom';

// Import Zone.js for Angular testing
import 'zone.js';
import 'zone.js/testing';

// Manually set up Angular testing environment to avoid ESM issues
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment only if not already initialized
declare const window: any;
if (typeof window !== 'undefined' && !window.ngTestingInitialized) {
  try {
    getTestBed().initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
    );
    window.ngTestingInitialized = true;
  } catch (error) {
    // If initialization fails, it might already be initialized
    console.warn('Angular testing environment initialization warning:', error);
  }
}