import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Output,
} from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { CdkCellAble, CellChange } from './cdk-spreadsheet.types';

@Directive({
  selector: 'cdk-cell, th[cdk-cell]',
  exportAs: 'cdkCell',
})
export class CdkCellDirective implements CdkCellAble {
  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly _cdkColumnDef: CdkColumnDef
  ) {}

  @Output() cellChange = new EventEmitter<CellChange>();

  @HostBinding('class.cdk-cell-edit') hostClass = true;
  @HostBinding('tabindex') tabindexAttr = '-1';
  @HostBinding('class.cdk-cell-edit-active') isActive = false;

  setActiveStyles() {
    this.isActive = true;
    this.cellChange.next({ active: true });
  }

  setInactiveStyles() {
    this.isActive = false;
    this.cellChange.next({ active: false });
  }
}
