import type { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import type { ExtraOptions, Routes } from '@angular/router';
import { withRouterConfig } from '@angular/router';
import { provideSpectacularFeatureTesting } from '../configuration/provide-spectacular-feature-testing';
import { SpectacularFeatureTestingRootModule } from './spectacular-feature-testing-root.module';

/**
 * Feature testing options for `SpectacularFeatureTestingModule.withFeature`.
 *
 * @deprecated Deprecated in favor of `provideSpectacularFeatureTest`. To be
 *   removed in Spectacular version 16.
 */
export interface SpectacularFeatureTestingModuleOptions {
  /**
   * The path prefix used to load the routes of the specified Angular feature
   * module, for example `'heroes'`.
   */
  readonly featurePath: string;
  /**
   * Optional Angular `Router` options.
   */
  readonly routerOptions?: ExtraOptions;
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
 * Configure the `RouterTestingModule` and provide Spectactular services for
 * testing feature modules.
 *
 * NOTE! Do not import directly. Use `SpectacularFeatureTestingModule.withFeature`.
 *
 * NOTE! Prefer to use `createFeatureHarness`. This Angular module is a low
 * level building block in case you need more control over your test setup.
 *
 * @deprecated Deprecated in favor of `provideSpectacularFeatureTest`. To be
 *   removed in Spectacular version 16.
 */
@NgModule()
export class SpectacularFeatureTestingModule {
  /**
   * Configure the `RouterTestingModule` and provide Spectactular
   * services for testing feature modules.
   *
   * @deprecated Deprecated in favor of `provideSpectacularFeatureTest`. To be
   *   removed in Spectacular version 16.
   */
  static withFeature(
    options: SpectacularFeatureTestingModuleOptions
  ): ModuleWithProviders<SpectacularFeatureTestingRootModule> {
    const { featurePath, routerOptions = {}, routes } = options;

    return {
      ngModule: SpectacularFeatureTestingRootModule,
      providers: [
        provideSpectacularFeatureTesting(
          {
            featurePath,
            routes,
          },
          withRouterConfig(routerOptions)
        ),
      ],
    };
  }

  constructor() {
    throw new Error(
      'Do not import SpectacularFeatureTestingModule directly. Use SpectacularFeatureTestingModule.withFeature.'
    );
  }
}
