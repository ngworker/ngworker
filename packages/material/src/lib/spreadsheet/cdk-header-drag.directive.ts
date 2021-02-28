import { Directive, OnInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Directive({
  selector: 'cdk-header-cell[cdkColumnDrag], cdkColumnDrag[cdk-header-cell]',
})
export class CdkHeaderDragDirective extends CdkDrag implements OnInit {
  ngOnInit() {
    this.boundaryElement = '.cdk-header-row';
  }
}
