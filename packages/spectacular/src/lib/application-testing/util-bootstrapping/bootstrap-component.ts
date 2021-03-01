import { ApplicationRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ensureFreshRootElement } from '../util-dom/ensure-fresh-root-element';
import { BootstrapComponentOptions } from './bootstrap-component-options';

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

  try {
    const componentRef = application.bootstrap(component, tag);
    const fixture = new ComponentFixture<TRootComponent>(
      componentRef,
      ngZone,
      autoDetectChanges
    );

    return fixture;
  } catch (error) {
    const errorMessage = (error as Error)?.message ?? String(error);

    if (!errorMessage.includes('ngDoBootstrap')) {
      throw error;
    }

    const fixture = TestBed.createComponent(component);

    return fixture;
  }
}
