import { Directive, HostBinding } from '@angular/core';
import { CdkCellDirective } from './cdk-cell.directive';

@Directive({
  selector: 'mat-cell, td[mat-cell]',
  exportAs: 'matCellSheet',
})
export class MatCellDirective extends CdkCellDirective {
  @HostBinding('class.mat-cell-edit') hostClass = true;
  @HostBinding('class.mat-cell-edit-active') isActive = false;
}
