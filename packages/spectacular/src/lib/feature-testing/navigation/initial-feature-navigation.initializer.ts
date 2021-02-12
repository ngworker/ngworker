import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureRouter } from './spectacular-feature-router';

/**
 * Navigate to the default feature route.
 */
async function initialFeatureNavigation(
  featureRouter: SpectacularFeatureRouter,
  featurePath: string
): Promise<void> {
  const didNavigationSucceed = await featureRouter.navigate([featurePath]);

  if (!didNavigationSucceed) {
    throw new Error(`Navigation to "/${featurePath}" failed.`);
  }
}

/**
 * Navigate to the default feature route, synchronously.
 */
function initialFeatureNavigationFactory(
  featureRouter: SpectacularFeatureRouter,
  featurePath: string
): () => void {
  const initialFeatureNavigationSync = fakeAsync(() => {
    initialFeatureNavigation(featureRouter, featurePath);
    tick();
  });

  return () => initialFeatureNavigationSync();
}

/**
 * Navigate to the default feature route.
 */
export const initialFeatureNavigationInitializer: FactoryProvider = {
  deps: [SpectacularFeatureRouter, featurePathToken],
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: initialFeatureNavigationFactory,
};
