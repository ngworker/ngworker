import { Directive, OnInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-header-cell[cdkColumnDrag]',
})
export class MatHeaderDragDirective extends CdkDrag implements OnInit {
  ngOnInit() {
    this.boundaryElement = '.mat-header-row';
  }
}
