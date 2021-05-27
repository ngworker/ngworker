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
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

@Component({
  selector: 'mat-spreadsheet-combobox',
  styles: [
    `
      .mat-spreadsheet-combobox {
        width: 100%;
        all: inherit;
      }

      .mat-spreadsheet-combobox mat-form-field {
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
        #input
        #matAutocompleteTrigger="matAutocompleteTrigger"
        type="text"
        matInput
        [matAutocomplete]="auto"
      />
      <!--      <mat-icon (click)="add(input)" color="primary" matSuffix> add</mat-icon>-->

      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="_selectionChange($event)"
      >
        <mat-option
          *ngFor="let item of list"
          [value]="listOptionValue ? item[listOptionValue] : item"
        >
          {{ item[listOptionRenderKey] }}
        </mat-option>
      </mat-autocomplete>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetComboboxComponent<Item extends unknown = unknown>
  implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-combobox') hostClass = true;

  /** @internal */
  @ViewChild(MatAutocompleteTrigger)
  _autocompleteTrigger!: MatAutocompleteTrigger;

  @Output() selectionChange = new EventEmitter<MatAutocompleteSelectedEvent>();
  @Output() addChange = new EventEmitter<Item>();

  @Input() placeholder = '';
  @Input() panelOpen = false;
  @Input() connectCell!: CdkCellAble;
  @Input() cellDef: unknown;
  @Input() list!: Item[];
  @Input() listOptionRenderKey!: keyof Item;
  @Input() listOptionValue!: keyof Item;

  private _unsub$ = new Subject();

  /** @internal */
  _selectChange: unknown;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _selectionChange(change: MatAutocompleteSelectedEvent) {
    this._selectChange = change;
    this._autocompleteTrigger.closePanel();
    this.connectCell.setActiveStyles();
    this.selectionChange.emit(change);
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
