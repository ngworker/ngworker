import {
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostBinding,
  HostListener,
  QueryList,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { CdkCellEditable } from './cdk-spreadsheet.types';
import { MatSelect } from '@angular/material/select';

@Directive({
  selector: 'cdk-cell, th[cdk-cell]',
  exportAs: 'cdkCellEdit',
})
export class CdkCellEditDirective implements CdkCellEditable {
  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly _cdkColumnDef: CdkColumnDef
  ) {}

  private _emViewRef!: EmbeddedViewRef<unknown>;
  private _nativeElement = this.elementRef.nativeElement;

  @ContentChildren(MatSelect)
  matSelect!: QueryList<MatSelect>; // this.matSelect?.first?.selectionChange

  @ContentChild('inactive', { read: ViewContainerRef })
  private _vcrRef!: ViewContainerRef;

  @ContentChild('active', { read: TemplateRef })
  private _tplRef!: TemplateRef<unknown>;

  @HostBinding('class.cdk-cell-edit') hostClass = true;
  @HostBinding('tabindex') tabindexAttr = '-1';
  @HostBinding('class.cdk-cell-edit-active') isActive = false;

  @HostListener('click', ['$event']) onClick() {
    if (this._emViewRef) return;
    this._emViewRef = this._vcrRef?.createEmbeddedView(this._tplRef);
  }

  setActiveStyles() {
    this.isActive = true;
    this.focusActiveItem();

    this._emViewRef && this._vcrRef?.insert(this._emViewRef);
  }

  setInactiveStyles() {
    this.isActive = false;
    this.blurActiveItem();

    this._vcrRef?.detach();
  }

  focusActiveItem() {
    this._nativeElement.focus();
  }

  blurActiveItem() {
    this._nativeElement.blur();
  }
}
