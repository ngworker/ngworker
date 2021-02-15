import { InjectionToken } from '@angular/core';

/**
 * Internal dependency used to pass the feature route path to Spectacular
 * feature testing services.
 */
export const featurePathToken = new InjectionToken(
  '__SPECTACULAR_INTERNAL_FEATURE_PATH__'
);
