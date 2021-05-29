import { CdkCellAble, CellChange } from './cdk-spreadsheet.types';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

// @todo: this is a workaround
// https://www.angulararchitects.io/aktuelles/lazy-loading-locales-with-angular/
// https://angular.io/api/common/DatePipe
import en from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(en);

@Component({
  selector: 'mat-spreadsheet-datepicker',
  styles: [
    `
      .mat-spreadsheet-datepicker {
        width: 100%;
        all: inherit;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="(_active$ | async) === false; else template">
      <!-- @todo: find a clean way! -->
      {{ placeholder | date: 'd.MM.yyyy':'':'de-DE' }}
    </ng-container>
    <ng-template #template>
      <input
        (click)="picker.open()"
        (dateInput)="_dateChange($event)"
        [matDatepicker]="picker"
        [value]="placeholder"
        autocomplete="off"
      />
      <mat-datepicker #picker></mat-datepicker>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetDatepickerComponent<Item extends unknown = unknown>
  implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-datepicker') hostClass = true;

  @Output() dateChange = new EventEmitter<Item>();

  @Input() placeholder = '';
  @Input() panelOpen = false;
  @Input() connectCell!: CdkCellAble;
  @Input() item!: Item;
  @Input() itemRenderKey!: keyof Item;

  _value!: Date;
  @Input() set value(value: Date | string) {
    this._value = new Date(value);
  }

  private _unsub$ = new Subject();

  /** @internal */
  _selectChange: unknown;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _dateChange(change: MatDatepickerInputEvent<string>) {
    this._selectChange = change;
    this.dateChange.emit({ [this.itemRenderKey]: change.value } as Item);
  }

  ngOnInit() {
    this.connectCell.cellChange
      .pipe(takeUntil(this._unsub$))
      .subscribe((change: CellChange) => this._active$.next(change.active));
  }

  ngOnDestroy() {
    this._unsub$.next();
  }
}
