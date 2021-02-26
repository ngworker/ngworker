import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mat-spreadsheet',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  // @note: browser with 943px when when using 149px of columns
  columns = ['position', 'name', 'check', 'check1', 'check2', 'check3'];
  dataSource = Array(15)
    .fill(0)
    .map(_ => ({ position: 0, name: 'Foo', check: 'yes/no' }));
  matCellClicked(event: unknown) {
    console.log('matCellClicked', event);
  }

  matCellChanged(event: unknown) {
    console.log('matCellChanged', event);
  }
}
