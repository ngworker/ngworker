import { Component, Type, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * The tag name of `SpectacularAppComponent`'s DOM element.
 */
export const spectacularAppTag = 'spectacular-app';

/**
 * The root component which is bootstrapped for a Spectacular test.
 */
@Component({
  standalone: true,
  selector: spectacularAppTag,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class SpectacularAppComponent {
  /**
   * The router outlet of the root component.
   *
   * @see `getActiveComponent`.
   */
  @ViewChild(RouterOutlet)
  routerOutlet?: RouterOutlet;

  /**
   * Get the active top-level routed component, for example a page component.
   *
   * @returns The activated component instance of the {@link RouterOutlet}.
   * @throws {@link Error} When the {@link RouterOutlet} is not activated.
   */
  getActiveComponent<TActiveComponent = unknown>(): TActiveComponent;
  /**
   * Get the active top-level routed component, for example a page component.
   *
   * @param requiredRoutedComponentType After navigation completes, the required type for the
   *     activated component of the `RouterOutlet`. If the outlet is not activated or a different
   *     component is activated, this function will throw an error.
   * @returns The activated component instance of the {@link RouterOutlet}.
   * @throws {@link Error} When the activated component is not of the specified type.
   * @throws {@link Error} When the {@link RouterOutlet} is not activated.
   */
  getActiveComponent<TActiveComponent>(
    requiredRoutedComponentType: Type<TActiveComponent>
  ): TActiveComponent;
  getActiveComponent<TActiveComponent>(
    requiredRoutedComponentType?: Type<TActiveComponent>
  ): TActiveComponent {
    if (!this.routerOutlet) {
      throw new Error(
        'SpectacularAppComponent#getActiveComponent called before its view child is available.'
      );
    }

    const activatedComponent = this.routerOutlet.component as TActiveComponent;

    if (
      requiredRoutedComponentType !== undefined &&
      !(activatedComponent instanceof requiredRoutedComponentType)
    ) {
      const actualComponentName =
        activatedComponent?.constructor?.name ?? 'unknown type';
      throw new Error(
        `Unexpected routed component type. Expected ${requiredRoutedComponentType.name} but got ${actualComponentName}`
      );
    }

    return activatedComponent;
  }
}
