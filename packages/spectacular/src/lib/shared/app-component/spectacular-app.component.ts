import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   */
  getActiveComponent<TActiveComponent>(): TActiveComponent {
    if (!this.routerOutlet) {
      throw new Error(
        'SpectacularAppComponent#getActiveComponent called before its view child is available.',
      );
    }

    return this.routerOutlet.component as TActiveComponent;
  }
}
