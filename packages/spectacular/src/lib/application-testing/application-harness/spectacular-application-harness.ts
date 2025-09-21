import type { InjectFlags, InjectOptions, ProviderToken } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import type { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';

/**
 * A harness for testing application-level software artifacts.
 */
export interface SpectacularApplicationHarness {
  /**
   * Resolve a dependency based on the specified dependency injection token.
   *
   * @param token The token representing the dependency, that is a class or an
   *   `InjectionToken`.
   * @param notFoundValue The default value in case the specified dependency
   *   has not been provided. Optional. Default is `null`.
   * @param options Dependency injection options. Optional.
   * @returns {T} The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws {Error} When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`
   */
  inject<T>(
    token: ProviderToken<T>,
    notFoundValue: undefined,
    options: InjectOptions & {
      optional?: false;
    },
  ): T;
  inject<T>(
    token: ProviderToken<T>,
    notFoundValue: null | undefined,
    options: InjectOptions,
  ): T | null;
  inject<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    options?: InjectOptions,
  ): T;
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
   * @returns {T} The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws {Error} When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`
   * @deprecated Use object-based flags (`InjectOptions`) instead.
   */
  inject<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
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
   * @returns {T} The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws {Error} When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`
   * @deprecated Use object-based flags (`InjectOptions`) instead.
   */
  inject<T>(
    token: ProviderToken<T>,
    notFoundValue: null,
    flags?: InjectFlags,
  ): T | null;
  /**
   * The bootstrapped component.
   */
  readonly rootComponent: SpectacularAppComponent;
  /**
   * The component fixture for the bootstrapped component.
   */
  readonly rootFixture: ComponentFixture<SpectacularAppComponent>;
}
