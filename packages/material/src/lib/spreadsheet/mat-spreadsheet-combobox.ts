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
import { TooltipPosition } from '@angular/material/tooltip/tooltip';

@Component({
  selector: 'mat-spreadsheet-combobox',
  styles: [
    `
      .mat-spreadsheet-combobox {
        width: 100%;
      }

      .mat-spreadsheet-combobox .add-icon {
        cursor: pointer;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="(_active$ | async) === false; else template">
      <div [title]="_renderDefault" class="cdk-default-field">{{ _renderDefault }}</div>
    </ng-container>
    <ng-template #template>
      <!-- @todo: create combobox component in libs/components -->
      <mat-form-field
        [appearance]="'outline'"
        [matTooltip]="tooltip"
        [matTooltipPosition]="tooltipPosition"
        [matTooltipDisabled]="!tooltip.length"
      >
        <input
          matInput
          #input
          #matAutocompleteTrigger="matAutocompleteTrigger"
          [readonly]="_readonly"
          [title]="_renderDefault"
          [matAutocomplete]="auto"
          [value]="_renderDefault"
          [autocomplete]="autocomplete"
          [type]="type"
        />
        <mat-icon
          class="add-icon"
          *ngIf="selectionAdd"
          (click)="_addSelection(input.value); input.value = ''"
          [color]="selectionAddIconColor"
          matSuffix
        >
          {{ selectionAddIcon }}
        </mat-icon>

        <mat-autocomplete
          #auto="matAutocomplete"
          (closed)="connectCell.setActiveFocus()"
          [displayWith]="_displayWith.bind(this)"
          (optionSelected)="_selectionChange($event)"
        >
          <mat-option *ngFor="let option of options" [value]="option">
            <div>{{ option[optionRender] }}</div>
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetComboboxComponent<Item extends unknown = unknown>
  implements OnInit, OnDestroy
{
  @HostBinding('class.mat-spreadsheet-combobox') hostClass = true;

  @Output() selectionChange = new EventEmitter<MatAutocompleteSelectedEvent>();
  @Output() selectionAdded = new EventEmitter<string>();

  @Input() connectCell!: CdkCellAble;

  @Input() selectionAdd = false;
  @Input() selectionAddIcon = 'add';
  @Input() selectionAddIconColor = 'primary';
  @Input() filter: unknown;

  @Input() options!: Item[];
  @Input() optionRender!: keyof Item;
  @Input() optionRenderDefault = '';

  @Input() tooltip = '';
  @Input() tooltipPosition: TooltipPosition = 'above';
  @Input() tooltipDisabled = true;

  _readonly = 'false';
  @Input() set readonly(value: boolean) {
    this._readonly = value ? 'true' : 'false';
  }

  @Input() type = 'text';
  @Input() autocomplete = 'off';

  private readonly _unsub$ = new Subject();

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
    this.selectionAdded.emit(value);
  }

  /** @internal */
  _displayWith(option: Item) {
    return option?.[this.optionRender] as unknown as string;
  }

  /** @internal */
  get _renderDefault() {
    const render = this._selectChange?.[this.optionRender];
    return render ? render : this.optionRenderDefault;
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
