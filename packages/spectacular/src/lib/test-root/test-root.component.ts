import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export const testRootTagName = 'spectacular-test-root';

@Component({
  selector: testRootTagName,
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
