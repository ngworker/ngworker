import type { ComponentRef, DebugElement } from '@angular/core';
import { getDebugNode } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';

/**
 * Replace the {@link ComponentRef} contained in the specified {@link ComponentFixture}
 * with the specified {@link ComponentRef}.
 *
 * @remarks The existing {@link ComponentRef} is destroyed before being replaced.
 */
export function replaceComponentRefInComponentFixture<TRootComponent>(
  fixture: ComponentFixture<TRootComponent> & { initialize?: () => void },
  componentRef: ComponentRef<TRootComponent>
) {
  /**
   * Destroy existing {@link ComponentRef}
   */
  fixture.componentRef.destroy();

  /**
   * Imitate {@link ComponentFixture['constructor']}
   *
   * @see https://github.com/angular/angular/blob/18.2.x/packages/core/testing/src/component_fixture.ts
   */
  fixture.componentRef = componentRef;
  const elementRef = componentRef.location;
  fixture.elementRef = elementRef;
  fixture.debugElement = getDebugNode(elementRef.nativeElement) as DebugElement;
  fixture.componentInstance = componentRef.instance;
  fixture.nativeElement = elementRef.nativeElement;

  /**
   * Initialize the {@link ComponentFixture} implementation, that is
   * `PseudoApplicationComponentFixture` or `ScheduledComponentFixture`
   *
   * @see https://github.com/angular/angular/blob/18.2.x/packages/core/testing/src/component_fixture.ts
   */
  fixture.initialize?.();
}
