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

  private _nativeElement = this.elementRef.nativeElement;

  @Output() cellChange = new EventEmitter<CellChange>();

  @HostBinding('class.cdk-cell-edit') hostClass = true;
  @HostBinding('tabindex') tabindexAttr = '-1';
  @HostBinding('class.cdk-cell-edit-active') isActive = false;

  setActiveStyles() {
    this.isActive = true;
    this.focusActiveItem();
    this.cellChange.next({ active: true });
  }

  setInactiveStyles() {
    this.isActive = false;
    this.blurActiveItem();
    this.cellChange.next({ active: false });
  }

  focusActiveItem() {
    this._nativeElement.focus();
  }

  blurActiveItem() {
    this._nativeElement.blur();
  }
}
