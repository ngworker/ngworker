import { AbstractType, InjectFlags, InjectionToken, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';

/**
 * A harness for testing an Angular feature module.
 */
export interface SpectacularFeatureHarness {
  /**
   * Resolve a dependency based on the specified dependency injection token.
   *
   * @param token The token representing the dependency, that is a class or an
   *   `InjectionToken`.
   * @param notFoundValue The default value in case the specified dependency
   *   has not been provided. Optional. Default is `null`.
   * @param flags Dependency injection options, for example
   *   `InjectFlags.Optional | InjectFlags.SkipSelf`. Optional. Default is
   *   `InjectFlags.Default`.
   */
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
  /**
   * A subset of Angular's `Location` service adjusted to the Angular feature
   * module under test.
   */
  readonly location: SpectacularFeatureLocation;
  /**
   * The bootstrapped component.
   */
  readonly rootComponent: SpectacularAppComponent;
  /**
   * The component fixture for the bootstrapped component.
   */
  readonly rootFixture: ComponentFixture<SpectacularAppComponent>;
  /**
   * A subset of Angular's `Router` API adjusted to the Angular feature module
   * under test.
   */
  readonly router: SpectacularFeatureRouter;
}
