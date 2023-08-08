import { initialFeatureNavigationInitializer } from '../navigation/initial-feature-navigation.initializer';
import { makeSpectacularFeatureTestingFeature } from './make-spectacular-feature-testing-feature';
// Resolve @typescript-eslint/no-unused-vars: Used for TSDoc `@link` annotations.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { provideSpectacularFeatureTesting } from './provide-spectacular-feature-testing';
import type { SpectacularFeatureTestingFeature } from './spectacular-feature-testing-features';
import { SpectacularFeatureTestingFeatureKind } from './spectacular-feature-testing-features';

/**
 * A type alias that represents a feature which enables initial navigation to
 * the specified feature path.
 *
 * The type is used to describe the return value of the {@link withInitialFeatureNavigation}
 * function.
 *
 * @see {@link withInitialFeatureNavigation}
 * @see {@link provideSpectacularFeatureTesting}
 */
export type InitialFeatureNavigationFeature =
  SpectacularFeatureTestingFeature<SpectacularFeatureTestingFeatureKind.InitialFeatureNavigationFeature>;

/**
 * Navigate to the specified feature path when the test is initialized.
 *
 * @example
 * ```typescript
 * providers: [
 *   provideSpectacularFeatureTesting(
 *     {
 *       featurePath: 'heroes',
 *       routes: [
 *         { path: 'heroes', loadChildren: () => heroesRoutes },
 *       ],
 *     },
 *     withInitialFeatureNavigation(),
 *   ),
 * ],
 * ```
 */
export function withInitialFeatureNavigation(): InitialFeatureNavigationFeature {
  return makeSpectacularFeatureTestingFeature(
    SpectacularFeatureTestingFeatureKind.InitialFeatureNavigationFeature,
    [initialFeatureNavigationInitializer]
  );
}
