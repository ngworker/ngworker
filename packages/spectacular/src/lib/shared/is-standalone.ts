import type { Type } from '@angular/core';
import * as _angularCore from '@angular/core';

const angularCore = _angularCore as unknown as {
  readonly isStandalone: (type: Type<unknown>) => boolean;
  readonly ɵisStandalone: (type: Type<unknown>) => boolean;
};

/**
 * Checks whether a given Component, Directive or Pipe is marked as standalone.
 * This will return false if passed anything other than a Component, Directive,
 * or Pipe class
 * See this guide for additional information: https://angular.io/guide/standalone-components
 *
 * @param type A reference to a Component, Directive or Pipe.
 *
 * @remarks This is here to support Angular 15.0 where the `isStandalone`
 *   function is named `ɵisStandalone` and considered internal.
 *
 * @deprecated To be removed in Spectacular 16.0.
 *
 * @internal
 */
export const isStandalone: (type: Type<unknown>) => boolean =
  angularCore['isStandalone'] ?? angularCore['ɵisStandalone'];
