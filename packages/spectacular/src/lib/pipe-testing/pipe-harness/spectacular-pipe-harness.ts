import { AbstractType, InjectFlags, InjectionToken, Type } from '@angular/core';

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
   * @param flags Dependency injection options, for example
   *   `InjectFlags.Optional | InjectFlags.SkipSelf`. Optional. Default is
   *   `InjectFlags.Default`.
   */
  abstract inject<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  abstract inject<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T>,
    notFoundValue: null,
    flags?: InjectFlags
  ): T | null;
}
