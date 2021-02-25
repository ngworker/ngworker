import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatCellEditPluginComponent } from './mat-cell-edit.plugin.component';
import { CdkPortal } from './cdk-portal';
import { fromEvent, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { MatColumnDef } from '@angular/material/table';
import { FocusHighlightable } from './cdk-spreadsheet.types';

@Directive({
  selector: 'mat-cell[matCellEdit], th[mat-cell][matCellEdit]',
  providers: [CdkPortal],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'mat-cell-edit',
    tabindex: '-1',
  },
})
export class MatCellEditPluginDirective
  implements OnDestroy, FocusHighlightable {
  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdkPortalService: CdkPortal,
    // @todo: use CdkColumnDef
    private readonly matColumnDef: MatColumnDef
  ) {}

  readonly _unsub$ = new Subject();
  readonly _element: HTMLElement = this.elementRef.nativeElement;

  private _isActive = false;
  private _cdkPortalElService!: CdkPortal;
  private _matTableCellRef!: ComponentRef<MatCellEditPluginComponent>;

  @Output() matCellChanged = new EventEmitter<Record<PropertyKey, unknown>>();
  @Output() matCellClick = new EventEmitter<MatCellEditPluginDirective>();

  @Input() matCellMutate = true;
  @Input() matCellEdit!: Record<PropertyKey, unknown>;
  @Input() matCellEditKey!: string;

  @HostBinding('class.mat-cell-edit-active') get isActive() {
    return this._isActive;
  }

  @HostListener('click') onClick() {
    this.matCellClick.emit(this);
  }

  show() {
    if (!this._cdkPortalElService) {
      this._cdkPortalElService = this.cdkPortalService.create(this._element);
    }

    if (this._cdkPortalElService.isAttached(this._matTableCellRef)) {
      this._show();
      return;
    }

    const value = this._getInnerText();
    this._matTableCellRef = this._cdkPortalElService.attachComponent(
      MatCellEditPluginComponent,
      { value }
    );

    this._registerEditableField();
  }

  hide() {
    this._matTableCellRef.instance.show = false;
  }

  setActiveStyles() {
    this._isActive = true;
  }

  setInactiveStyles() {
    this._isActive = false;
  }

  focus() {
    this.elementRef.nativeElement.focus();
  }

  private _registerEditableField() {
    const { matCellInputElement } = this._matTableCellRef.instance;
    // @todo: move into an helper
    fromEvent(matCellInputElement, 'change')
      .pipe(
        startWith(new Event('EMPTY')),
        tap(() => this._show()),
        filter(event => !!event.target),
        map(event => (event.target as HTMLInputElement).value),
        takeUntil(this._unsub$)
      )
      .subscribe(value => this._updateStates(value));
  }

  private _show() {
    this._matTableCellRef.instance.show = true;
  }

  private _updateStates(value: string) {
    this._matTableCellRef.instance.value = value;
    this._mutateInputValue(this.matColumnDef.name, value);
    this.hide();
  }

  private _mutateInputValue(key: string, value: string) {
    const keyExists = this.matCellEdit[key] ?? false;
    if (keyExists === undefined) {
      throw new Error(
        `key: ${key} does not exists on ${JSON.stringify(this.matCellEdit)}`
      );
    }

    // @todo: when no "matCellEditKey" then show that is readonly
    // @solution: add mat-cell-edit--readonly
    if (this.matCellEditKey && this.matCellMutate) {
      this.matCellEdit[this.matCellEditKey] = value;
    }

    this.matCellChanged.emit(this.matCellEdit);
  }

  private _getInnerText() {
    const { innerText } = this._element;
    this._element.innerText = '';
    return innerText;
  }

  ngOnDestroy() {
    this.cdkPortalService.detachAll();
    this._unsub$.unsubscribe();
  }
}
