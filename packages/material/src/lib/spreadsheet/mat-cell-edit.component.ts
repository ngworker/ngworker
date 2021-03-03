import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CdkCellEditComponent } from './cdk-cell-edit.component';

@Component({
  selector: 'mat-cell-edit',
  styles: [
    `
      .mat-cell-edit input {
        all: inherit;
      }
    `,
  ],
  template: `
    <div [class.mat-cell-raw-show]="showCellRaw">{{ value }}</div>
    <input
      #cellInputRef
      (keyup.enter)="cellInputRef.blur()"
      [class.mat-cell-edit-show]="showCellEdit"
      [value]="value"
      type="text"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatCellEditComponent extends CdkCellEditComponent {
  @HostBinding('class.mat-cell-edit') hostClass = true;
}
