import type { InjectFlags, InjectOptions, ProviderToken } from '@angular/core';
import type { Observable } from 'rxjs';

/**
 * A harness for testing an Angular pipe.
 *
 * Includes an API to write a value and read the rendered text.
 */
export abstract class SpectacularPipeHarness<TValue> {
  /**
   * Replace the pipe component template.
   *
   * NOTE! The `value` property is in context of the specified template.
   *
   * @param template The component template used to test the Angular pipe, for
   *   example `'{{ value | camelize }}'`.
   */
  abstract set template(template: string);
  /**
   * Read the text rendered in the pipe component template.
   */
  abstract get text(): string;
  /**
   * Update the value passed through the Angular pipe.
   *
   * @param value The new value.
   */
  abstract set value(value: TValue | Observable<TValue> | null);
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
  abstract inject<T>(
    token: ProviderToken<T>,
    notFoundValue: undefined,
    options: InjectOptions & {
      optional?: false;
    }
  ): T;
  abstract inject<T>(
    token: ProviderToken<T>,
    notFoundValue: null | undefined,
    options: InjectOptions
  ): T | null;
  abstract inject<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    options?: InjectOptions
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
  abstract inject<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
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
  abstract inject<T>(
    token: ProviderToken<T>,
    notFoundValue: null,
    flags?: InjectFlags
  ): T | null;
}
