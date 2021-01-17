import { NavigationExtras, UrlTree } from '@angular/router';

/**
 * A test harness for an Angular feature module. Includes an API to test
 * as-a-user.
 */
export interface FeatureTestHarness {
  /**
   * Click the button with the specified label.
   *
   * @param label The label of the button.
   */
  clickButton(label: string): void;
  /**
   * Trigger change detection.
   */
  detectChanges(): void;
  /**
   * Enter the specified text in the element matching the specified query.
   *
   * @param text The text to enter.
   * @param query A query matching the target text box.
   */
  enterTextInElement(text: string, query: string): void;
  /**
   * Read the path part of the current URL.
   */
  getPath(): string;
  /**
   * Read the text of the element matching the specified query.
   *
   * @param query A query matching the target element.
   */
  getText(query: string): string;
  /**
   * Patched wrapper for `Router#navigate`.
   *
   * Navigate based on the provided array of commands and a starting point. If
   * no starting route is provided, the navigation is absolute.
   *
   * @param commands An array of URL fragments with which to construct the
   *   target URL. If the path is static, can be the literal URL string. For a
   *   dynamic path, pass an array of path segments, followed by the parameters
   *   for each segment. The fragments are applied to the current URL or the one
   *   provided in the relativeTo property of the options object, if supplied.
   * @param extras An options object that determines how the URL should be
   *   constructed or interpreted. Optional. Default is
   *   `{ skipLocationChange: false }`.
   * @returns A Promise that resolves to true when navigation succeeds, to false
   *   when navigation fails, or is rejected on error.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
  /**
   * Patched wrapper for `Router#navigateByUrl`.
   *
   * Navigates to a view using an absolute route path.
   *
   * @param url An absolute path for a defined route. The function does not
   *   apply any delta to the current URL.
   * @param extras An object containing properties that modify the navigation
   *   strategy. Optional. Default is `{ skipLocationChange: false }`.
   */
  navigateByUrl(
    url: string | UrlTree,
    extras?: NavigationExtras
  ): Promise<boolean>;
  /**
   * The feature test harness setup which configures the Angular testing module.
   *
   * Call this as part of a `beforeEach` hook.
   */
  testCaseSetup(): void;
}
