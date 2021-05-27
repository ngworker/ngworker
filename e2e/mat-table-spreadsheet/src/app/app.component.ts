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
    Object.assign(element, { [field]: item[field] });
  }

  onAdd(item: Item, element: Item, field: keyof Item) {
    this.list.unshift(item);
    Object.assign(element, { [field]: item[field] });
  }

  console(...args: unknown[]) {
    console.log(args);
  }

  ngOnInit() {
    this.dataSource.data = Array(100)
      .fill(0)
      .map((_, i) => ({ position: i, name: `Foo ${i}`, check: `yes/no/${i}` }));
  }

  trackBy(_: number, item: Item) {
    return item.position;
  }
}
