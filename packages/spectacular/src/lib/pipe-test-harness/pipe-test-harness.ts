import type { Observable } from 'rxjs';

/**
 * A test harness for an Angular pipe. Includes an API to write a value and read
 * the rendered text.
 */
export interface PipeTestHarness<TValue> {
  /**
   * Read the text rendered in the Angular pipe test template.
   */
  getText(): string;
  /**
   * Replace the pipe test template.
   *
   * NOTE! The `value` property is in context of the specified template.
   *
   * @param template The template used to test the Angular pipe, for example
   *   `'{{ value | camelize }}'`.
   */
  setTemplate(template: string): void;
  /**
   * Update the value passed through the Angular pipe.
   *
   * @param value The new value.
   */
  setValue(value: TValue | Observable<TValue> | null): void;
  /**
   * The Angular pipe test harness setup which configures the Angular testing
   * module.
   *
   * Call this as part of a `beforeEach` hook.
   */
  testCaseSetup(): void;
}
