import { Provider } from '@angular/core';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { provideFeaturePath } from './feature-path.token';

/**
 * Options for `provideSpectacularFeatureTest`.
 */
export interface ProvideSpectacularFeatureTestOptions {
  /**
   * The path prefix used to load the routes of the specified Angular feature,
   * for example `'heroes'`.
   */
  readonly featurePath: string;
}

/**
 * Provide dependencies needed by the Spectacular Feature testing API.
 */
export function provideSpectacularFeatureTest(
  options: ProvideSpectacularFeatureTestOptions
): Provider[] {
  const { featurePath } = options;

  return [
    provideFeaturePath(featurePath),
    SpectacularFeatureLocation,
    SpectacularFeatureRouter,
  ];
}
