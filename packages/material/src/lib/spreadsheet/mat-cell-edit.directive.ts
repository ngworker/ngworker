import { Directive, HostBinding } from '@angular/core';
import { CdkCellEditDirective } from './cdk-cell-edit.directive';

@Directive({
  selector: 'mat-cell, th[mat-cell]',
  exportAs: 'matCellEdit',
})
export class MatCellEditDirective extends CdkCellEditDirective {
  @HostBinding('class.mat-cell-edit') hostClass = true;
  @HostBinding('class.mat-cell-edit-active') isActive = false;
}
