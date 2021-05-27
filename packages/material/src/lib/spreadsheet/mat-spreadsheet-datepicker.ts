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
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
    <div
      class="inactive"
      *ngIf="(_active$ | async) === false; else matCombobox"
    >
      <ng-content></ng-content>
    </div>
    <ng-template #matCombobox>
      <input
        (click)="picker.open()"
        (dateInput)="_dateChange($event)"
        [matDatepicker]="picker"
        [value]="'2020-12-01T12:00:00Z'"
        autocomplete="off"
      />
      <mat-datepicker #picker></mat-datepicker>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetDatepickerComponent implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-datepicker') hostClass = true;

  @Output() dateChange = new EventEmitter<MatAutocompleteSelectedEvent>();

  @Input() placeholder = '';
  @Input() panelOpen = false;
  @Input() connectCell!: CdkCellAble;

  private _unsub$ = new Subject();

  /** @internal */
  _selectChange: unknown;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _dateChange(change: unknown) {
    console.log(change);
    // this._selectChange = change;
    // this.dateChange.emit(change);
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
