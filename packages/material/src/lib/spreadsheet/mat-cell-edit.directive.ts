import { Directive, HostBinding } from '@angular/core';
import { CdkPortalFactory } from './cdk-portal.factory';
import { MatCellEditComponent } from './mat-cell-edit.component';
import { CdkCellEditDirective } from './cdk-cell-edit.directive';

@Directive({
  selector: 'mat-cell[matCellEdit], th[mat-cell][matCellEdit]',
  providers: [CdkPortalFactory],
})
export class MatCellEditDirective extends CdkCellEditDirective {
  runtimeComponent = MatCellEditComponent;

  @HostBinding('class.mat-cell-edit') hostClass = true;
  @HostBinding('class.mat-cell-edit-active') isActive = false;
}
