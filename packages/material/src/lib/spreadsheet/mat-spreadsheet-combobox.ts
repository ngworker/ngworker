import { CdkCellAble, CellChange } from './cdk-spreadsheet.types';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TooltipPosition } from '@angular/material/tooltip/tooltip';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-spreadsheet-combobox',
  template: `
    <ng-container *ngIf="(_active$ | async) === true && !disable; else defaultTemplate">
      <mat-form-field
        [appearance]="'outline'"
        [matTooltip]="tooltip"
        [matTooltipPosition]="tooltipPosition"
        [matTooltipDisabled]="tooltipDisabled"
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

        <button
          matSuffix
          mat-icon-button
          aria-label="add item button"
          class="add-item-icon"
          *ngIf="selectionAdd && _readonly === 'false'"
          (click)="input.value && _addSelection(input.value); input.value = ''"
          [color]="selectionAddIconColor"
        >
          <mat-icon>{{ selectionAddIcon }}</mat-icon>
        </button>

        <mat-autocomplete
          #auto="matAutocomplete"
          (closed)="connectCell.setActiveFocus()"
          [panelWidth]="'auto'"
          [displayWith]="_displayWith.bind(this)"
          (optionSelected)="_selectionChange($event)"
        >
          <mat-option *ngFor="let option of options" [value]="option">
            <div>{{ option[optionRender] }}</div>
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </ng-container>
    <ng-template #defaultTemplate>
      <div [title]="_renderDefault" class="cdk-default-field">
        <span>{{ _renderDefault }}</span>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetComboboxComponent<Item extends unknown = unknown>
  implements OnInit, OnChanges, OnDestroy
{
  @HostBinding('class.mat-spreadsheet-combobox.h-full') hostClass = true;

  @Output() selectionChange = new EventEmitter<MatAutocompleteSelectedEvent>();
  @Output() selectionAdded = new EventEmitter<string>();

  @Input() connectCell!: CdkCellAble;
  @Input() disable = false;

  @Input() selectionAdd = false;
  @Input() selectionAddIcon = 'add';
  @Input() selectionAddIconColor: ThemePalette = 'primary';
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

  ngOnChanges(changes: SimpleChanges) {
    const optionRenderDefault = changes?.optionRenderDefault;
    if (this._selectChange && optionRenderDefault) this._selectChange = undefined as Item;
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
