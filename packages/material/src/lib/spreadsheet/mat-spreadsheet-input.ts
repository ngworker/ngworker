import { CdkCellAble, CellChange } from './cdk-spreadsheet.types';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

@Component({
  selector: 'mat-spreadsheet-input',
  styles: [
    `
      .mat-spreadsheet-input {
        width: 100%;
        all: inherit;
      }
    `,
  ],
  template: `
    <div *ngIf="(_active$ | async) === false; else template">
      <ng-content></ng-content>
    </div>
    <ng-template #template>
      <input
        [(ngModel)]="_inputModelChange"
        #input
        (ngModelChange)="_inputChange(input.value)"
        [value]="placeholder"
        type="text"
      />
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetInputComponent<Item extends unknown = unknown>
  implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.mat-spreadsheet-input') hostClass = true;

  @Output() inputChange = new EventEmitter<Item>();

  @Input() placeholder = '';
  @Input() connectCell!: CdkCellAble;
  @Input() item!: Item;
  @Input() itemRenderKey!: keyof Item;

  private _unsub$ = new Subject();

  /** @internal */
  _inputModelChange: unknown;
  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _inputChange(change: string) {
    this._inputModelChange = change;
    this.inputChange.emit({ [this.itemRenderKey]: change } as Item);
  }

  ngOnInit() {
    this.connectCell.cellChange
      .pipe(takeUntil(this._unsub$))
      .subscribe((change: CellChange) => this._active$.next(change.active));
  }

  ngOnChanges(changes: SimpleChanges) {
    this._inputModelChange = changes.placeholder.currentValue;
  }

  ngOnDestroy() {
    this._unsub$.next();
  }
}
