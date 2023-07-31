import { provideLocationMocks } from '@angular/common/testing';
import type { EnvironmentProviders, Provider } from '@angular/core';
import type { RouterFeatures, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { provideFeaturePath } from './feature-path.token';
import type { SpectacularFeatureTestingFeatures } from './spectacular-feature-testing-features';

/**
 * Options for `provideSpectacularFeatureTest`.
 */
export interface ProvideSpectacularFeatureTestOptions {
  /**
   * The path prefix used to load the routes of the specified Angular feature,
   * for example `'heroes'`.
   */
  readonly featurePath: string;
  /**
   * One or more feature routes to load.
   *
   * NOTE! It is unnecessary to lazy-load feature modules in tests, so we can
   * statically return an Angular module from the `loadChildren` callback.
   *
   * @example
   * ```typescript
   * [{ path: 'heroes', loadChildren: () => HeroesModule }]
   * ```
   */
  readonly routes: Routes;
}

/**
 * Provide dependencies needed by the Spectacular Feature testing API.
 */
export function provideSpectacularFeatureTest(
  options: ProvideSpectacularFeatureTestOptions,
  ...features: (SpectacularFeatureTestingFeatures | RouterFeatures)[]
): (EnvironmentProviders | Provider)[] {
  const { featurePath, routes } = options;

  return [
    provideFeaturePath(featurePath),
    provideRouter(routes),
    features.map(feature => feature.ɵproviders),
    provideLocationMocks(),
    SpectacularFeatureLocation,
    SpectacularFeatureRouter,
  ];
}
