import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SpectacularAppComponent } from '../../application-testing/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';
import { SpectacularCreateFeatureHarnessOptions } from './spectacular-create-feature-harness-options';
import { SpectacularFeatureHarness } from './spectacular-feature-harness';

export function createFeatureHarness<TFeatureModule>({
  featureModule,
  featurePath,
  imports = [],
  providers = [],
  routerOptions = {},
}: SpectacularCreateFeatureHarnessOptions<TFeatureModule>): SpectacularFeatureHarness {
  TestBed.configureTestingModule({
    imports: [
      ...imports,
      SpectacularFeatureTestingModule.withFeature({
        featureModule,
        featurePath,
        routerOptions,
      }),
    ],
    providers,
  });
  // NOTE(LayZeeDK): We might want to convert this to an asynchronous function
  //   to support non-Angular CLI setups. Some of them might not be able to
  //   handle running this statement synchronously.
  TestBed.compileComponents();

  const rootFixture = TestBed.createComponent(SpectacularAppComponent);
  const location = TestBed.inject(SpectacularFeatureLocation);
  const router = TestBed.inject(SpectacularFeatureRouter);
  // fakeAsync is used to keep this function synchronous
  const initialNavigation = fakeAsync(() => {
    router.navigate([featurePath]);
    tick();
  });

  rootFixture.autoDetectChanges(true);
  initialNavigation();

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
