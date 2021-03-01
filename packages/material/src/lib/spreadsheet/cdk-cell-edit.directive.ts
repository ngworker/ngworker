import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CdkPortalFactory } from './cdk-portal.factory';
import { fromEvent, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FocusHighlightable } from './cdk-spreadsheet.types';
import { CdkColumnDef } from '@angular/cdk/table';
import { CdkCellEditComponent } from './cdk-cell-edit.component';

@Directive({
  selector: 'cdk-cell[cdkCellEdit], th[cdk-cell][cdkCellEdit]',
  providers: [CdkPortalFactory],
})
export class CdkCellEditDirective
  implements OnInit, OnDestroy, FocusHighlightable {
  runtimeComponent = CdkCellEditComponent;

  private readonly _unsub$ = new Subject();
  private readonly _element: HTMLElement = this.elementRef.nativeElement;

  private _cdkPortal: CdkPortalFactory | undefined;
  private _cellEditComp!: ComponentRef<CdkCellEditComponent>;

  constructor(
    readonly elementRef: ElementRef<HTMLElement>,
    private readonly _cdkPortalFactory: CdkPortalFactory,
    private readonly _cdkColumnDef: CdkColumnDef
  ) {}

  @HostBinding('class.cdk-cell-edit') hostClass = true;
  @HostBinding('tabindex') tabindexAttr = '-1';
  @HostBinding('class.cdk-cell-edit-active') isActive = false;

  @Output() cellChanged = new EventEmitter<Record<PropertyKey, unknown>>();

  @Input() cellMutate = true;
  @Input() cellEdit!: Record<PropertyKey, unknown>;
  @Input() cellEditKey = '';

  ngOnInit() {
    this._element.contentEditable = 'true';
  }

  show() {
    if (!this._cdkPortal) {
      this._cdkPortal = this._cdkPortalFactory.create(this._element);
    } else if (this._cdkPortal.isAttached(this._cellEditComp)) {
      return this._show();
    }

    const EditableComp = this.runtimeComponent;
    this._cellEditComp = this._cdkPortal.attachComponent(EditableComp, {
      value: this._getInnerText(),
    });

    this._registerEditableField();
  }

  hide() {
    this._cellEditComp.instance.show = false;
  }

  setActiveStyles() {
    this.isActive = true;
  }

  setInactiveStyles() {
    this.isActive = false;
  }

  focus() {
    this.elementRef.nativeElement.focus();
  }

  private _registerEditableField() {
    const { cellInputElement } = this._cellEditComp.instance;
    fromEvent(cellInputElement, 'change')
      .pipe(
        startWith(new Event('EMPTY')),
        tap(() => this._show()),
        filter(event => !!event.target),
        map(event => (event.target as HTMLInputElement).value),
        takeUntil(this._unsub$)
      )
      .subscribe(value => this.setState(value));
  }

  private _show() {
    this._cellEditComp.instance.show = true;
  }

  setState(value: string) {
    this._cellEditComp.instance.value = value;
    this._mutateInputValue(this._cdkColumnDef.name, value);
    this.hide();
  }

  private _mutateInputValue(key: string, value: string) {
    const keyExists = this.cellEdit[key] ?? false;
    if (keyExists === undefined) {
      throw new Error(
        `key: ${key} does not exists on ${JSON.stringify(this.cellEdit)}`
      );
    }

    if (this.cellEditKey && this.cellMutate) {
      this.cellEdit[this.cellEditKey] = value;
    }

    this.cellChanged.emit(this.cellEdit);
  }

  private _getInnerText() {
    const { innerText } = this._element;
    this._element.innerText = '';
    return innerText;
  }

  ngOnDestroy() {
    this._cdkPortalFactory.detachAll();
    this._unsub$.unsubscribe();
  }
}
