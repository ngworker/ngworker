import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';

import { SpectacularAppComponent } from '../../application-testing/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularCreateFeatureOptions } from './spectacular-create-feature-options';

export class SpectacularFeatureTestbed {
  static createFeature<TFeatureModule>({
    featureModule,
    featurePath,
    imports = [],
    providers = [],
    routerOptions = {},
  }: SpectacularCreateFeatureOptions<TFeatureModule>): ComponentFixture<SpectacularAppComponent> {
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

    // NOTE(LayZeeDK): We might want to convert this to an asynchronous method
    //   to support non-Angular CLI setups. Some of them might not be able to
    //   handle running this statement synchronously.
    TestBed.compileComponents();

    const rootFixture = TestBed.createComponent(SpectacularAppComponent);
    const router = TestBed.inject(Router);
    const initialNavigation = fakeAsync(() => {
      router.navigate([featurePath]);
      tick();
    });

    if (rootFixture.ngZone !== null) {
      rootFixture.ngZone.run(initialNavigation);
    } else {
      initialNavigation();
    }

    // NOTE(LayZeeDK): We might need to use something like the asynchronous
    //   `rootFixture.whenStable` to wait for all side effects triggered by the
    //   initial navigation.
    rootFixture.detectChanges();

    return rootFixture;
  }
}
