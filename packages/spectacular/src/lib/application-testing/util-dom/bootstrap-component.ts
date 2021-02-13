import { ApplicationRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapComponentOptions } from './bootstrap-component-options';
import { ensureFreshRootElement } from './ensure-fresh-root-element';

/**
 * Create and attach a root element with the specified tag name to the DOM, then
 * bootstrap a component of the specified type.
 *
 * @param rootTag The tag name of the root element.
 * @param rootComponent The root component type.
 */
export function bootstrapComponent<TRootComponent>({
  autoDetectChanges = false,
  component,
  ngZone,
  tag,
}: BootstrapComponentOptions<TRootComponent>): ComponentFixture<TRootComponent> {
  const application = TestBed.inject(ApplicationRef);

  ensureFreshRootElement(tag);
  const componentRef = application.bootstrap(component);
  const fixture = new ComponentFixture<TRootComponent>(
    componentRef,
    ngZone,
    autoDetectChanges
  );

  return fixture;
}
