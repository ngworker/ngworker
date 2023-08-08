import type { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExtraOptions, Routes, withRouterConfig } from '@angular/router';
import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { provideSpectacularFeatureTesting } from '../configuration/provide-spectacular-feature-testing';
import { withInitialFeatureNavigation } from '../configuration/with-initial-feature-navigation';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import type { SpectacularFeatureHarness } from './spectacular-feature-harness';

/**
 * Feature harness options.
 */
export interface CreateFeatureHarnessOptions
  extends Pick<NgModule, 'imports' | 'providers'> {
  /**
   * The route path used to load the routes of the specified Angular feature
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
 * Configure feature testing environment, bootstrap `SpectacularAppComponent`,
 * and navigate to the default feature route.
 */
export function createFeatureHarness(
  options: CreateFeatureHarnessOptions
): SpectacularFeatureHarness {
  const {
    featurePath,
    imports = [],
    providers = [],
    routerOptions = {},
    routes,
  } = options;

  TestBed.configureTestingModule({
    imports: [...imports],
    providers: [
      ...providers,
      provideSpectacularFeatureTesting(
        {
          featurePath,
          routes,
        },
        withInitialFeatureNavigation(),
        withRouterConfig(routerOptions)
      ),
    ],
  });
  // NOTE(LayZeeDK): We might want to convert this to an asynchronous function
  //   to support non-Angular CLI setups. Some of them might not be able to
  //   handle running this statement synchronously.
  TestBed.compileComponents();

  const rootFixture = TestBed.createComponent(SpectacularAppComponent);
  const location = TestBed.inject(SpectacularFeatureLocation);
  const router = TestBed.inject(SpectacularFeatureRouter);

  rootFixture.autoDetectChanges(true);

  return {
    inject: TestBed.inject.bind(TestBed),
    location,
    get rootComponent() {
      return rootFixture.componentInstance;
    },
    rootFixture,
    router,
  };
}
