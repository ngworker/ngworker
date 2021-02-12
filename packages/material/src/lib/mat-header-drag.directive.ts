import { Directive, OnInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Directive({
  selector: 'mat-header-cell[cdkColumnDrag]',
})
export class MatHeaderDragDirective extends CdkDrag implements OnInit {
  ngOnInit() {
    this.boundaryElement = '.mat-header-row';
  }
}
