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
  selector: 'mat-spreadsheet-select',
  styles: [
    `
      .mat-spreadsheet-select {
        width: 100%;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="(_active$ | async) === false; else template">
      {{ _renderDefault }}
    </ng-container>
    <ng-template #template>
      <mat-select
        [(ngModel)]="_selectChange"
        [placeholder]="optionDefault + ''"
        (selectionChange)="_selectionChange($event)"
      >
        <mat-option
          *ngFor="let option of options"
          [value]="optionValue ? option[optionValue] : option"
        >
          {{ option[optionRender] }}
        </mat-option>
      </mat-select>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetSelectOptionComponent<Item extends unknown = unknown>
  implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-select') hostClass = true;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  @Input() connectCell!: CdkCellAble;

  @Input() options!: Item[];
  @Input() optionRender!: keyof Item;
  @Input() optionValue!: keyof Item;
  @Input() optionDefault!: unknown;

  private _unsub$ = new Subject();

  /** @internal */
  _selectChange!: Item;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _selectionChange(change: MatSelectChange) {
    this.selectionChange.emit(change);
  }

  /** @internal */
  get _renderDefault() {
    return this._selectChange
      ? this._selectChange[this.optionRender]
        ? this._selectChange[this.optionRender]
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
