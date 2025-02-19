import type { Type } from '@angular/core';
import { ApplicationInitStatus, ApplicationRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ensureFreshRootElement } from '../util-dom/ensure-fresh-root-element';

export interface BootstrapComponentOptions<TRootComponent> {
  readonly component: Type<TRootComponent>;
  readonly tag: string;
}

async function waitForApplicationInitializers(): Promise<void> {
  const applicationInitStatus = TestBed.inject(ApplicationInitStatus);
  await applicationInitStatus.donePromise;
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
  await waitForApplicationInitializers();

  ensureFreshRootElement(tag);
  const application = TestBed.inject(ApplicationRef);
  const componentRef = application.bootstrap(component, tag);
  const fixture = TestBed.runInInjectionContext(
    () => new ComponentFixture<TRootComponent>(componentRef)
  );

  return fixture;
}
