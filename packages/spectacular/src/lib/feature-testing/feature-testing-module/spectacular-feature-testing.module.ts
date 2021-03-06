import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { featurePathToken } from '../configuration/feature-path.token';
import { SpectacularFeatureTestingModuleOptions } from './spectacular-feature-testing-module-options';
import { SpectacularFeatureTestingRootModule } from './spectacular-feature-testing-root.module';

/**
 * Configure the `RouterTestingModule` and provide Spectactular services for
 * testing feature modules.
 *
 * NOTE! Do not import directly. Use `SpectacularFeatureTestingModule.withFeature`.
 *
 * NOTE! Prefer to use `createFeatureHarness`. This Angular module is a low
 * level building block in case you need more control over your test setup.
 */
@NgModule()
export class SpectacularFeatureTestingModule {
  /**
   * Configures the `RouterTestingModule` and provides Spectactular
   * services for testing feature modules
   */
  static withFeature<TFeatureModule>({
    featureModule,
    featurePath,
    routerOptions = {},
  }: SpectacularFeatureTestingModuleOptions<TFeatureModule>): ModuleWithProviders<SpectacularFeatureTestingRootModule> {
    const {
      providers: routerTestingProviders = [],
    } = RouterTestingModule.withRoutes(
      [{ path: featurePath, loadChildren: () => featureModule }],
      routerOptions
    );

    return {
      ngModule: SpectacularFeatureTestingRootModule,
      providers: [
        ...routerTestingProviders,
        {
          provide: featurePathToken,
          useValue: featurePath,
        },
      ],
    };
  }

  constructor() {
    throw new Error(
      'Do not import SpectacularFeatureTestingModule directly. Use SpectacularFeatureTestingModule.withFeature.'
    );
  }
}
