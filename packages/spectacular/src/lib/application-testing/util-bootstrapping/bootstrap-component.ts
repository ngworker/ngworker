import type { NgZone, Type } from '@angular/core';
import { ApplicationInitStatus, ApplicationRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ensureFreshRootElement } from '../util-dom/ensure-fresh-root-element';

export interface BootstrapComponentOptions<TRootComponent> {
  readonly autoDetectChanges?: boolean;
  readonly component: Type<TRootComponent>;
  readonly ngZone: NgZone | null;
  readonly tag: string;
}

async function waitForApplicationInitializers(): Promise<void> {
  const applicationInitStatus = TestBed.runInInjectionContext(() => TestBed.inject(ApplicationInitStatus));
  await TestBed.runInInjectionContext(() => applicationInitStatus.donePromise);
}

/**
 * Create and attach a root element with the specified tag name to the DOM, then
 * bootstrap a component of the specified type.
 *
 * @param rootTag The tag name of the root element.
 * @param rootComponent The root component type.
 */
export async function bootstrapComponent<TRootComponent>({
  autoDetectChanges = false,
  component,
  ngZone,
  tag,
}: BootstrapComponentOptions<TRootComponent>): Promise<
  ComponentFixture<TRootComponent>
> {
  await waitForApplicationInitializers();

  TestBed.runInInjectionContext(() => ensureFreshRootElement(tag));
  const application = TestBed.runInInjectionContext(() => TestBed.inject(ApplicationRef));
  const componentRef = TestBed.runInInjectionContext(() => application.bootstrap(component, tag));
  const fixture = TestBed.runInInjectionContext(() => new ComponentFixture<TRootComponent>(
    componentRef,
    ngZone,
    autoDetectChanges
  ));

  return fixture;
}
