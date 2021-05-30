import { CdkCellAble, CellChange } from './cdk-spreadsheet.types';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    <ng-container *ngIf="(_active$ | async) === false; else template">
      {{ value }}
    </ng-container>
    <ng-template #template>
      <input
        #input
        [(ngModel)]="value"
        (ngModelChange)="_inputChange(input.value)"
        [value]="value"
        [type]="type"
      />
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetInputComponent implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-input') hostClass = true;

  @Output() inputChange = new EventEmitter<string>();

  @Input() connectCell!: CdkCellAble;
  @Input() value: unknown = '';

  @Input() type = 'text';

  private _unsub$ = new Subject();

  /** @internal */
  _active$ = new BehaviorSubject<boolean>(false);

  /** @internal */
  _inputChange(value: string) {
    this.inputChange.emit(value);
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
