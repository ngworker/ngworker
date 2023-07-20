import type { Provider } from '@angular/core';
import { InjectionToken } from '@angular/core';

/**
 * Internal dependency used to pass the feature route path to Spectacular
 * feature testing services.
 */
export const featurePathToken = new InjectionToken<string>(
  '__SPECTACULAR_INTERNAL_FEATURE_PATH__'
);

export function provideFeaturePath(featurePath: string): Provider {
  return {
    provide: featurePathToken,
    useValue: featurePath,
  };
}
