import { Provider } from '@angular/core';
import { provideFeaturePath } from './provide-feature-path';

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

export function provideSpectacularFeatureTest({
  featurePath,
}: ProvideSpectacularFeatureTestOptions): Provider[] {
  return [provideFeaturePath(featurePath)];
}
