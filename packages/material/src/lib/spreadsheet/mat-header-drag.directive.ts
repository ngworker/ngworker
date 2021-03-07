import { Directive, OnInit } from '@angular/core';
import { CdkHeaderDragDirective } from './cdk-header-drag.directive';

@Directive({
  selector: 'mat-header-cell[matColumnDrag], matColumnDrag[mat-header-cell]',
})
export class MatHeaderDragDirective
  extends CdkHeaderDragDirective
  implements OnInit {
  ngOnInit() {
    this.boundaryElement = '.mat-header-row';
  }
}
