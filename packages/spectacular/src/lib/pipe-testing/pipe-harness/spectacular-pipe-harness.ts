import type { Observable } from 'rxjs';

/**
 * A test harness for an Angular pipe. Includes an API to write a value and read
 * the rendered text.
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
}
