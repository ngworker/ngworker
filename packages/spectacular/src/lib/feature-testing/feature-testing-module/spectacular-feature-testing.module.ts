import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideSpectacularFeatureTest } from '../configuration/provide-spectacular-feature-test';
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
  static withFeature({
    featurePath,
    routerOptions = {},
    routes,
  }: SpectacularFeatureTestingModuleOptions): ModuleWithProviders<SpectacularFeatureTestingRootModule> {
    const { providers: routerTestingProviders = [] } =
      RouterTestingModule.withRoutes(routes, routerOptions);

    return {
      ngModule: SpectacularFeatureTestingRootModule,
      providers: [
        ...routerTestingProviders,
        ...provideSpectacularFeatureTest({ featurePath }),
      ],
    };
  }

  constructor() {
    throw new Error(
      'Do not import SpectacularFeatureTestingModule directly. Use SpectacularFeatureTestingModule.withFeature.'
    );
  }
}
