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
// - https://www.angulararchitects.io/aktuelles/lazy-loading-locales-with-angular/
// - https://angular.io/api/common/DatePipe
import en from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(en);

// @todo:
// - find a scalable way for formatting date. See template!

type MatInputDate = MatDatepickerInputEvent<Date | string>;

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
      {{ _date | date: format:'':locale }}
    </ng-container>
    <ng-template #template>
      <input
        (click)="picker.open()"
        (dateInput)="_dateChange($event)"
        [matDatepicker]="picker"
        [value]="_date"
        [autocomplete]="_autoComplete"
      />
      <mat-datepicker #picker></mat-datepicker>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetDatepickerComponent implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-datepicker') hostClass = true;

  @Input() connectCell!: CdkCellAble;
  @Input() format = 'short';
  @Input() locale = 'en-US';

  @Output() dateChange = new EventEmitter<MatInputDate>();

  /** @internal */
  _autoComplete = 'off';
  @Input() set autocomplete(value: boolean) {
    this._autoComplete = value ? '' : 'off';
  }

  /** @internal */
  _date!: Date | string | null;
  @Input() set date(value: Date | string) {
    this._date = new Date(value);
  }

  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);
  /** @internal */
  private _unsub$ = new Subject();

  /** @internal */
  _dateChange(change: MatInputDate) {
    this._date = change.value;
    this.dateChange.emit(change);
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
