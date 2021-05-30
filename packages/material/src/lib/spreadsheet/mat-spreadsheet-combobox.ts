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
  selector: 'mat-spreadsheet-combobox',
  styles: [
    `
      .mat-spreadsheet-combobox {
        width: 100%;
        all: inherit;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="(_active$ | async) === false; else template">
      {{ _renderDefault }}
    </ng-container>
    <ng-template #template>
      <input
        #input
        [(ngModel)]="_selectChange"
        #matAutocompleteTrigger="matAutocompleteTrigger"
        (keydown.enter)="add && _addSelection(input.value)"
        [matAutocomplete]="auto"
        [value]="optionDefault + ''"
        [type]="type"
      />
      <mat-icon
        *ngIf="add"
        (click)="_addSelection(input.value)"
        color="primary"
        matSuffix
      >
        add
      </mat-icon>

      <mat-autocomplete
        #auto="matAutocomplete"
        [displayWith]="_displayWith.bind(this)"
        (optionSelected)="_selectionChange($event)"
      >
        <mat-option
          *ngFor="let option of options"
          [value]="optionValue ? option[optionValue] : option"
        >
          {{ option[optionRender] }}
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

  @Output() selectionChange = new EventEmitter<MatAutocompleteSelectedEvent>();
  @Output() selectionAdded = new EventEmitter<Item>();

  @Input() connectCell!: CdkCellAble;
  @Input() add = false;
  @Input() options!: Item[];
  @Input() optionRender!: keyof Item;
  @Input() optionValue!: keyof Item;
  @Input() optionDefault!: unknown;
  @Input() type = 'text';

  private _unsub$ = new Subject();

  /** @internal */
  _selectChange!: Item;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _selectionChange(change: MatAutocompleteSelectedEvent) {
    this.selectionChange.emit(change);
  }

  /** @internal */
  _addSelection(value: string) {
    this.selectionAdded.emit(value as Item);
  }

  /** @internal */
  _displayWith(option: Item) {
    return (option?.[this.optionRender] as unknown) as string;
  }

  /** @internal */
  get _renderDefault() {
    return this._selectChange
      ? this._selectChange?.[this.optionRender]
        ? this._selectChange?.[this.optionRender]
        : this._selectChange
      : this.optionDefault;
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
