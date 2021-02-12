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
import { CdkPortalService } from './cdk-portal.service';
import { fromEvent, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { ObjectValue } from './mat-table.plugin.models';
import { FocusHighlightable } from './table-spreadsheet-key-manager';

const EMPTY_EVENT = new Event('EMPTY');

@Directive({
  selector: 'mat-cell, th[mat-cell]',
  providers: [CdkPortalService],
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
    private readonly cdkPortalService: CdkPortalService
  ) {}

  readonly _unsub$ = new Subject();
  readonly _element: HTMLElement = this.elementRef.nativeElement;
  readonly _elementClass = this._element.getAttribute('class');

  private _isActive = false;
  private _columnName: string | undefined;
  private _cdkPortalElService!: CdkPortalService;
  private _matTableCellRef!: ComponentRef<MatCellEditPluginComponent>;

  @Output() matCellChanged = new EventEmitter<ObjectValue>();
  @Output() matCellClick = new EventEmitter<MatCellEditPluginDirective>();

  @Input() matCellMutate = true;
  @Input() matCellEdit!: ObjectValue;

  @HostBinding('class.mat-cell-edit-active') get isActive() {
    return this._isActive;
  }

  @HostListener('click') onClick() {
    this.matCellClick.emit(this);
  }

  show() {
    this._columnName = this._getMatColumnName();
    if (typeof this._columnName === 'undefined') {
      throw new Error(`Could not find matColumnDef "${this._columnName}"`);
    }

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
    fromEvent(matCellInputElement, 'change')
      .pipe(
        startWith(EMPTY_EVENT),
        tap(_ => this._show()),
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
    this._mutateInputValue(this._columnName as string, value);
    this.hide();
  }

  private _mutateInputValue(key: string, value: string) {
    this.matCellEdit[key] = value;
    if (this.matCellMutate) {
      this.matCellChanged.emit(this.matCellEdit);
    }
  }

  private _getInnerText() {
    const { innerText } = this._element;
    this._element.innerText = '';
    return innerText;
  }

  private _getMatColumnName() {
    // @todo: bad bad bad!!!!!
    return this._elementClass?.match(/mat-cell-(.*)/)?.[1];
  }

  ngOnDestroy() {
    this.cdkPortalService.detachAll();
    this._unsub$.unsubscribe();
  }
}
