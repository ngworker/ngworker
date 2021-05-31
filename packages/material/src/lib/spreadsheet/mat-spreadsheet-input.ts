import { CdkCellAble, CellChange } from './cdk-spreadsheet.types';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mat-spreadsheet-input',
  exportAs: 'matSpreadsheetInput',
  styles: [
    `
      .mat-spreadsheet-input {
        width: 100%;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="(_active$ | async) === false; else template">
      <div class="cdk-default-field">{{ value }}</div>
    </ng-container>
    <ng-template #template>
      <mat-form-field appearance="outline">
        <input
          #input
          matInput
          [(ngModel)]="value"
          (ngModelChange)="_inputChange(input.value)"
          [value]="value"
          [type]="type"
          [autocomplete]="autocomplete"
        />
      </mat-form-field>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetInputComponent implements OnInit, OnDestroy {
  @HostBinding('class.mat-spreadsheet-input') hostClass = true;
  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  @Output() inputChange = new EventEmitter<string>();

  @Input() connectCell!: CdkCellAble;
  @Input() autocomplete = 'off';
  @Input() value: unknown = '';
  @Input() disabled = false;

  @Input() type = 'text';

  private readonly _unsub$ = new Subject();

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
