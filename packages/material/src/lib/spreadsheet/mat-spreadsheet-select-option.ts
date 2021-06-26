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
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';

@Component({
  // @todo: find a cleaner way
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-spreadsheet-select',
  template: `
    <ng-container *ngIf="(_active$ | async) === true && !disable; else defaultTemplate">
      <mat-form-field appearance="outline">
        <mat-select
          (closed)="connectCell.setActiveFocus()"
          [(ngModel)]="_selectChange"
          [placeholder]="optionRenderDefault + ''"
          (selectionChange)="_selectionChange($event)"
        >
          <mat-option
            *ngFor="let option of options"
            [value]="optionValue ? option[optionValue] : option"
          >
            {{ option[optionRender] }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>
    <ng-template #defaultTemplate>
      <div class="cdk-default-field">
        <span>{{ _renderDefault }}</span>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetSelectOptionComponent<Item extends unknown = unknown>
  implements OnInit, OnDestroy
{
  @HostBinding('class.mat-spreadsheet-select') hostClass = true;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  @Input() connectCell!: CdkCellAble;
  @Input() disable = false;

  @Input() options!: Item[];
  @Input() optionRender!: keyof Item;
  @Input() optionValue!: keyof Item;
  @Input() optionRenderDefault = '';

  private readonly _unsub$ = new Subject();

  /** @internal */
  _selectChange!: Item;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _selectionChange(change: MatSelectChange) {
    this._selectChange = change.value;
    this.selectionChange.emit(change);
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
