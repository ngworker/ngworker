import type { Provider } from '@angular/core';
import type { provideSpectacularFeatureTesting } from './provide-spectacular-feature-testing';
import type { InitialFeatureNavigationFeature } from './with-initial-feature-navigation';

/**
 * The list of tree-shakable Spectacular Feature Testing features as a union
 * type to uniquely type each feature.
 */
export enum SpectacularFeatureTestingFeatureKind {
  InitialFeatureNavigationFeature = 'InitialFeatureNavigationFeature',
}

/**
 * A type that represents a tree-shakable Spectacular Feature Testing feature.
 */
export interface SpectacularFeatureTestingFeature<
  TFeatureKind extends SpectacularFeatureTestingFeatureKind
> {
  /**
   * For debugging purposes.
   *
   * @internal
   */
  readonly ɵbrand: 'SpectacularFeatureTestingFeature';
  /**
   * The feature name.
   *
   * @example 'InitialFeatureNavigationFeature'
   *
   * @internal
   */
  readonly ɵkind: TFeatureKind;
  /**
   * Feature providers.
   *
   * @internal
   */
  readonly ɵproviders: Provider[];
}

/**
 * A type alias that represents all tree-shakable Spectacular Feature Testing
 * features available for use with {@link provideSpectacularFeatureTesting}.
 * Features can be enabled by adding special functions to the {@link provideSpectacularFeatureTesting}
 * call.
 *
 * See documentation for each symbol to find its corresponding function name.
 * See also {@link provideSpectacularFeatureTesting} documentation on how to use
 * those functions.
 *
 * @see {@link provideSpectacularFeatureTesting}
 */
export type SpectacularFeatureTestingFeatures = InitialFeatureNavigationFeature;
