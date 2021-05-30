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
      }
    `,
  ],
  template: `
    <ng-container *ngIf="(_active$ | async) === false; else template">
      <div>{{ _renderDefault }}</div>
    </ng-container>
    <ng-template #template>
      <mat-form-field appearance="outline">
        <input
          matInput
          #input
          #matAutocompleteTrigger="matAutocompleteTrigger"
          (keydown.enter)="_addSelection(input.value)"
          [matAutocomplete]="auto"
          [value]="_renderDefault + ''"
          [type]="type"
        />
        <mat-icon
          *ngIf="selectionAdd"
          (click)="_addSelection(input.value)"
          [color]="selectionAddIconColor"
          matSuffix
        >
          {{ selectionAddIcon }}
        </mat-icon>

        <mat-autocomplete
          (closed)="connectCell.setActiveFocus()"
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
      </mat-form-field>
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

  @Input() selectionAdd = false;
  @Input() selectionAddIcon = 'add';
  @Input() selectionAddIconColor = 'primary';

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
    this._selectChange = change.option.value as Item;
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
