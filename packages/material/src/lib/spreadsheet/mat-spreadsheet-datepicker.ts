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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-spreadsheet-datepicker',
  template: `
    <ng-container *ngIf="(_active$ | async) === true && !disable; else defaultTemplate">
      <mat-form-field appearance="outline">
        <!-- @todo: try to add type="date" -->
        <input
          matInput
          #input
          (dateChange)="_dateChange($event)"
          [matDatepicker]="picker"
          [value]="_date"
          [autocomplete]="autocomplete"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker (closed)="connectCell.setActiveFocus()" #picker></mat-datepicker>
      </mat-form-field>
    </ng-container>
    <ng-template #defaultTemplate>
      <div class="cdk-default-field cdk-default-date-field">
        <span>{{ _date | date: format:timezone:locale }}</span>
        <mat-icon class="cdk-date-icon">today</mat-icon>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetDatepickerComponent implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-datepicker') hostClass = true;

  @Input() connectCell!: CdkCellAble;
  @Input() disable = false;

  @Input() autocomplete = 'off';
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
