import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { FocusHighlightable } from './cdk-spreadsheet.types';

@Directive({
  selector:
    'cdk-cell, cdk-cell[cdkCellEdit], th[cdk-cell], th[cdk-cell][cdkCellEdit]',
})
export class CdkCellEditDirective implements OnInit, FocusHighlightable {
  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly _cdkColumnDef: CdkColumnDef
  ) {}

  @HostBinding('class.cdk-cell-edit') hostClass = true;
  @HostBinding('tabindex') tabindexAttr = '-1';
  @HostBinding('contentEditable') contentEditable = 'true';
  @HostBinding('class.cdk-cell-edit-active') isActive = false;

  @Output() cellChanged = new EventEmitter<Record<PropertyKey, unknown>>();

  @Input() cellEdit!: Record<PropertyKey, unknown>;
  // @todo: when nothing defined then take from "_cdkColumnDef.name"
  @Input() cellEditKey = '';

  setActiveStyles() {
    this.isActive = true;
  }

  setInactiveStyles() {
    this.isActive = false;
  }

  focusActiveItem() {
    this.elementRef.nativeElement.focus();
  }

  blurActiveItem() {
    this.elementRef.nativeElement.blur();
  }

  writeActiveItem(value: string) {
    this.setCellValue(this._cdkColumnDef.name, value);
  }

  private setCellValue(key: string, value: string) {
    const keyExists = this.cellEdit[key];
    if (keyExists === undefined) {
      throw new Error(
        `key: ${key} does not exists on ${JSON.stringify(this.cellEdit)}`
      );
    }

    if (this.cellEditKey) {
      this.cellEdit[this.cellEditKey] = value;
    }

    this.cellChanged.emit(this.cellEdit);
  }

  ngOnInit() {
    if (!this.cellEdit) {
      this.contentEditable = 'false';
    }
  }
}
