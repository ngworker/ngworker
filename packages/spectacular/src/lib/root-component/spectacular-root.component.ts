import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export const spectacularAppTagName = 'spectacular-app';

@Component({
  selector: spectacularAppTagName,
  template: '<router-outlet></router-outlet>',
})
export class SpectacularAppComponent {
  @ViewChild(RouterOutlet)
  routerOutlet?: RouterOutlet;

  getActiveComponent<TActiveComponent>(): TActiveComponent {
    if (!this.routerOutlet) {
      throw new Error(
        'SpectacularAppComponent#getActiveComponent called before its view child is available.'
      );
    }

    return this.routerOutlet.component as TActiveComponent;
  }
}
