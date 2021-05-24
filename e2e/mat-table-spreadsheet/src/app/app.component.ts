import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Item {
  position: number;
  name: string;
  check: string;
}

@Component({
  selector: 'mat-spreadsheet',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private _cdr: ChangeDetectorRef) {}

  columns = ['position', 'name', 'check', 'check1', 'check2', 'check3'];
  dataSource = new MatTableDataSource<Item>();

  list = Array(10)
    .fill(0)
    .map((_, i) => ({ position: i, name: `Foo ${i}`, check: `yes/no/${i}` }));

  onChange(item: Item, element: Item, field: keyof Item) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element[field] = item[field];
  }

  console(value: unknown) {
    console.log(value);
  }

  ngOnInit() {
    this.dataSource.data = Array(10)
      .fill(0)
      .map((_, i) => ({ position: i, name: `Foo ${i}`, check: `yes/no/${i}` }));
  }

  trackBy(_: number, item: Item) {
    return item.position;
  }
}
