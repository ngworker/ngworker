import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as dayjs from 'dayjs';

interface Item {
  position: number;
  name: string;
  date: string;
  street: string;
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

  columns = ['position', 'name', 'date', 'street', 'check2', 'check3'];
  dataSource = new MatTableDataSource<Item>();

  list = Array(10)
    .fill(0)
    .map((_, i) => ({
      position: i,
      name: `Foo ${i}`,
      date: `2020-12-0${i}T12:00:00Z`,
      street: `Musterstrasse ${i}`,
    }));

  onChange(item: unknown, element: unknown, key: keyof Item) {
    console.log('onChange', item, element, key);
    // Object.assign(element, { [key]: item[key] });
  }

  onAdd(item: unknown, element: unknown, key: keyof Item) {
    console.log('onAdd', item, element, key);
    // Object.assign(element, { [field]: item[field] });
  }

  onDateChange(date: string | Date | null) {
    if (!date) return;

    const fmDate = dayjs(date).format('YYYY-MM-DDThh:mm:ss[Z]');
    console.log('onDateChange', fmDate);
  }

  ngOnInit() {
    this.dataSource.data = Array(100)
      .fill(0)
      .map((_, i) => ({
        position: i,
        name: `Foo ${i}`,
        date: `2025-12-01T12:00:00Z`,
        street: `Musterstrasse ${i}`,
      }));
  }

  trackBy(_: number, item: Item) {
    return item.position;
  }
}
