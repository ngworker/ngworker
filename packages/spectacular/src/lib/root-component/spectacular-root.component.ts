import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export const testRootTagName = 'spectacular-test-root';

@Component({
  selector: testRootTagName,
  template: '<router-outlet></router-outlet>',
})
export class SpectacularRootComponent {
  @ViewChild(RouterOutlet)
  routerOutlet?: RouterOutlet;

  getActiveComponent<TActiveComponent>(): TActiveComponent {
    if (!this.routerOutlet) {
      throw new Error(
        'SpectacularRootComponent#getActiveComponent called before its view child is available.'
      );
    }

    return this.routerOutlet.component as TActiveComponent;
  }
}
