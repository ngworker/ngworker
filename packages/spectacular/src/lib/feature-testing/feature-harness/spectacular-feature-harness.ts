import { AbstractType, InjectFlags, InjectionToken, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { SpectacularAppComponent } from '../../application-testing/app-component/spectacular-app.component';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';

export interface SpectacularFeatureHarness {
  inject<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  inject<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T>,
    notFoundValue: null,
    flags?: InjectFlags
  ): T | null;
  readonly location: SpectacularFeatureLocation;
  readonly rootComponent: SpectacularAppComponent;
  readonly rootFixture: ComponentFixture<SpectacularAppComponent>;
  readonly router: SpectacularFeatureRouter;
}
