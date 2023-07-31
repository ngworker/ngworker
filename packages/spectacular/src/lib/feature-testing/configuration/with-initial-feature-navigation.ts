import { initialFeatureNavigationInitializer } from '../navigation/initial-feature-navigation.initializer';
import { makeSpectacularFeatureTestingFeature } from './make-spectacular-feature-testing-feature';
import type { SpectacularFeatureTestingFeature } from './spectacular-feature-testing-features';

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
export function withInitialFeatureNavigation(): SpectacularFeatureTestingFeature<'InitialFeatureNavigation'> {
  return makeSpectacularFeatureTestingFeature('InitialFeatureNavigation', [
    initialFeatureNavigationInitializer,
  ]);
}
