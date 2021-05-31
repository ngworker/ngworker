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
      }
    `,
  ],
  template: `
    <ng-container *ngIf="(_active$ | async) === false; else template">
      <div class="cdk-default-field">{{ _date | date: format:timezone:locale }}</div>
    </ng-container>
    <ng-template #template>
      <mat-form-field appearance="outline">
        <input
          matInput
          (dateInput)="_dateChange($event)"
          [matDatepicker]="picker"
          [value]="_date"
          [autocomplete]="autocomplete"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker (closed)="connectCell.setActiveFocus()" #picker></mat-datepicker>
      </mat-form-field>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetDatepickerComponent implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-datepicker') hostClass = true;

  @Input() connectCell!: CdkCellAble;
  @Input() autocomplete = 'off';
  @Input() disabled = false;

  @Input() format = 'short';
  @Input() timezone = '';
  @Input() locale = 'en-US';

  @Output() dateChange = new EventEmitter<MatInputDate>();

  /** @internal */
  _date!: Date | string | null;
  @Input() set date(value: Date | string) {
    this._date = value ? new Date(value) : '';
  }

  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);
  /** @internal */
  private readonly _unsub$ = new Subject();

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
