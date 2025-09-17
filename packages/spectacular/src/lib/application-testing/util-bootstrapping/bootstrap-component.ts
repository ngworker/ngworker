import type { Type } from '@angular/core';
import { ApplicationRef, DestroyRef } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ensureFreshRootElement } from '../util-dom/ensure-fresh-root-element';
import { replaceComponentRefInComponentFixture } from './replace-component-ref-in-component-fixture';

export interface BootstrapComponentOptions<TRootComponent> {
  readonly component: Type<TRootComponent>;
  readonly tag: string;
}

/**
 * Create and attach a root element with the specified tag name to the DOM, then
 * bootstrap a component of the specified type.
 *
 * @param rootTag The tag name of the root element.
 * @param rootComponent The root component type.
 */
export async function bootstrapComponent<TRootComponent>({
  component,
  tag,
}: BootstrapComponentOptions<TRootComponent>): Promise<
  ComponentFixture<TRootComponent>
> {
  ensureFreshRootElement(tag);
  const application = TestBed.inject(ApplicationRef);
  const destroyRef = TestBed.inject(DestroyRef);

  const componentRef = application.bootstrap(component, tag);
  destroyRef.onDestroy(() => componentRef.destroy());

  const fixture = TestBed.createComponent(component);
  replaceComponentRefInComponentFixture(fixture, componentRef);

  return fixture;
}
