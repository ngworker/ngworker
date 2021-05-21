import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mat-spreadsheet',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  columns = ['position', 'name', 'check', 'check1', 'check2', 'check3'];
  dataSource = Array(200)
    .fill(0)
    .map(_ => ({ position: 0, name: 'Foo', check: 'yes/no' }));

  list = Array(10)
    .fill(0)
    .map(_ => ({ position: 0, name: 'Foo', check: 'yes/no' }));

  foo(event: unknown) {
    console.log(event);
  }
}
