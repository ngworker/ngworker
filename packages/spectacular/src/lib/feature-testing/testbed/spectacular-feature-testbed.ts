import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TestRootComponent } from '../../test-root/test-root.component';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { CreateFeatureOptions } from './create-feature-options';

@Injectable({
  providedIn: 'root',
})
export class SpectacularFeatureTestbed {
  createFeature<TFeatureModule>({
    featureModule,
    featurePath,
    imports = [],
    providers = [],
    routerOptions = {},
  }: CreateFeatureOptions<TFeatureModule>): ComponentFixture<TestRootComponent> {
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

    const rootFixture = TestBed.createComponent(TestRootComponent);
    const router = TestBed.inject(Router);
    const initialNavigation = () => router.initialNavigation();

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
