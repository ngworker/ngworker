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
import { MatSelect, MatSelectChange } from '@angular/material/select';
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
    <div class="inactive" *ngIf="(_active$ | async) === false; else matSelect">
      <ng-content></ng-content>
    </div>
    <ng-template #matSelect>
      <mat-select
        [(ngModel)]="_selectChange"
        [placeholder]="placeholder + ''"
        (selectionChange)="_selectionChange($event)"
      >
        <mat-option
          *ngFor="let item of list"
          [value]="listOptionValue ? item[listOptionValue] : item"
        >
          {{ item[listOptionRenderKey] }}
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

  /** @internal */
  @ViewChild(MatSelect) _matSelect!: MatSelect;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  @Input() placeholder = '';
  @Input() panelOpen = false;
  @Input() connectCell!: CdkCellAble;
  @Input() list!: Item[];
  @Input() listOptionRenderKey!: keyof Item;
  @Input() listOptionValue!: keyof Item;

  private _unsub$ = new Subject();

  /** @internal */
  _selectChange: unknown;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _selectionChange(change: MatSelectChange) {
    this._selectChange = change.value;
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
