import type { EnvironmentProviders, Provider } from '@angular/core';
import type { RouterFeatures, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { provideFeaturePath } from './feature-path.token';
import type { SpectacularFeatureTestingFeatures } from './spectacular-feature-testing-features';

/**
 * Options for {@link provideSpectacularFeatureTesting}.
 */
export interface ProvideSpectacularFeatureTestingOptions {
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
export function provideSpectacularFeatureTesting(
  options: ProvideSpectacularFeatureTestingOptions,
  ...features: (SpectacularFeatureTestingFeatures | RouterFeatures)[]
): (EnvironmentProviders | Provider)[] {
  const { featurePath, routes } = options;

  return [
    provideFeaturePath(featurePath),
    provideRouter(routes),
    features.map(feature => feature.ɵproviders),
    SpectacularFeatureLocation,
    SpectacularFeatureRouter,
  ];
}
