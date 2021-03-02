import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CdkCellEditComponent } from './cdk-cell-edit.component';

@Component({
  selector: 'mat-cell-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <!--  @todo: kann eventuell raus: (keyup.enter)="cellInputRef.blur()" -->
    <div [class.mat-cell-raw-show]="showCellRaw">{{ value }}</div>
    <input
      #cellInputRef
      (keyup.enter)="cellInputRef.blur()"
      [class.mat-cell-edit-show]="showCellEdit"
      [value]="value"
      type="text"
    />
  `,
})
export class MatCellEditComponent extends CdkCellEditComponent {
  @HostBinding('class.mat-cell-edit') hostClass = true;
}
