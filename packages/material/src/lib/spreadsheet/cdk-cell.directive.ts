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
  exportAs: 'cdkCellSheet',
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

    // @todo: inject .scroll-container otherwise entire window
    // check if element is in viewport oterwise jump like in excel
    // this.elementRef.nativeElement
    //   .closest('.scroll-container')
    //   ?.scrollTo({ top: 1900 });
  }

  setInactiveStyles() {
    this.isActive = false;
    this.cellChange.next({ active: false });
  }
}
