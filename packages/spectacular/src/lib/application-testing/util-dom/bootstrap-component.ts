import { ApplicationRef, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ensureFreshRootElement } from './ensure-fresh-root-element';

/**
 * Create and attach a root element with the specified tag name to the DOM, then
 * bootstrap a component of the specified type.
 *
 * @param rootElementTagName The tag name of the root element.
 * @param rootComponentType The root component type.
 */
export function bootstrapComponent(
  rootElementTagName: string,
  rootComponentType: Type<unknown>
): void {
  const application = TestBed.inject(ApplicationRef);

  ensureFreshRootElement(rootElementTagName);
  application.bootstrap(rootComponentType);
}
