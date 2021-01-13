import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'spectacular-test-root',
  template: '<router-outlet></router-outlet>',
})
export class TestRootComponent {
  @ViewChild(RouterOutlet)
  routerOutlet?: RouterOutlet;

  getActiveComponent<T>(): T {
    if (!this.routerOutlet) {
      throw new Error(
        'TestRootComponent#getActiveComponent called before its view child is available.'
      );
    }

    return this.routerOutlet.component as T;
  }
}
