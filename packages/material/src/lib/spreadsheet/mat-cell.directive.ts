import { Directive, HostBinding } from '@angular/core';
import { CdkCellDirective } from './cdk-cell.directive';

@Directive({
  // @todo: find a cleaner way
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-cell, td[mat-cell]',
  exportAs: 'matCellSheet',
})
export class MatCellDirective extends CdkCellDirective {
  @HostBinding('class.mat-cell-edit') hostClass = true;
  @HostBinding('class.mat-cell-edit-active') isActive = false;
}
