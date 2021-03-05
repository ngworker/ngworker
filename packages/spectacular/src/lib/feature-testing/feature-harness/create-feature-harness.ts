import { TestBed } from '@angular/core/testing';

import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { initialFeatureNavigationInitializer } from '../navigation/initial-feature-navigation.initializer';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { CreateFeatureHarnessOptions } from './create-feature-harness-options';
import { SpectacularFeatureHarness } from './spectacular-feature-harness';

/**
 * Configure `SpectacularFeatureTestingModule`, bootstrap `SpectacularAppComponent`
 * and navigate to the default feature route.
 */
export function createFeatureHarness<TFeatureModule>({
  featureModule,
  featurePath,
  imports = [],
  providers = [],
  routerOptions = {},
}: CreateFeatureHarnessOptions<TFeatureModule>): SpectacularFeatureHarness {
  TestBed.configureTestingModule({
    imports: [
      ...imports,
      SpectacularFeatureTestingModule.withFeature({
        featureModule,
        featurePath,
        routerOptions,
      }),
    ],
    providers: [...providers, initialFeatureNavigationInitializer],
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
