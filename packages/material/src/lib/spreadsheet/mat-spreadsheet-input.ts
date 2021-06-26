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
  // @todo: find a cleaner way
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-spreadsheet-input',
  exportAs: 'matSpreadsheetInput',
  template: `
    <ng-container *ngIf="(_active$ | async) === true && !disable; else defaultTemplate">
      <mat-form-field appearance="outline">
        <input
          #input
          matInput
          [(ngModel)]="value"
          (keyup.enter)="_inputChange(input.value)"
          [value]="value"
          [type]="type"
          [autocomplete]="autocomplete"
        />
      </mat-form-field>
    </ng-container>
    <ng-template #defaultTemplate>
      <!-- this is okay -->
      <div class="cdk-default-field" [ngClass]="disable ? 'disabled' : ''">
        <span>{{ value }}</span>
      </div>
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
  @Input() disable = false;

  @Input() autocomplete = 'off';
  @Input() value = '';
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
