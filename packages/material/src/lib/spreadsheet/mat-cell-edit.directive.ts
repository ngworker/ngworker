import { Directive, HostBinding } from '@angular/core';
import { CdkCellEditDirective } from './cdk-cell-edit.directive';

@Directive({
  selector:
    'mat-cell, mat-cell[matCellEdit], th[mat-cell], th[mat-cell][matCellEdit]',
})
export class MatCellEditDirective extends CdkCellEditDirective {
  @HostBinding('class.mat-cell-edit') hostClass = true;
  @HostBinding('class.mat-cell-edit-active') isActive = false;
}
