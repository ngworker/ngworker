import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

export interface CdkCollapse {
  groupId: number | null;
  collapsed: boolean | null;
  parent: boolean | null;
}

@Component({
  // @todo: find a cleaner way
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cdk-spreadsheet-collapse',
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdkSpreadsheetCollapseComponent {
  constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('class.cdk-spreadsheet-collapse') hostClass = true;
  @HostBinding('class.cdk-spreadsheet-collapsible') collapsibleClass = true;
  @HostBinding('class.cdk-spreadsheet-collapsed') get collapsedClass() {
    return this._collapse.collapsed ?? false;
  }

  @Output() collapseChange: EventEmitter<CdkCollapse> = new EventEmitter();

  /** @internal */
  _collapse!: CdkCollapse;
  @Input() set collapse(collapse: CdkCollapse) {
    if (collapse?.collapsed === undefined && collapse?.groupId && collapse?.parent === undefined) {
      throw new Error('collapsible and groupId are missing');
    }

    /*
     * @todo: this is a bad hack. It is related to cdkSpreatsheetCollapse!
     * - avoid rending/displaying rows, cell by dom manipulation
     * - this code should be removed after MVP!
     * - ticket: https://code.avodaq.com/service-solutions/avodaq-frontend/avodaq-frontend/-/issues/61
     */
    const rowElement = this._elementRef.nativeElement.closest('.cdk-row');
    rowElement?.setAttribute('parent', collapse.parent ? 'true' : 'false');
    rowElement?.setAttribute('groupId', `${collapse.groupId}`);

    this.collapsibleClass = collapse.parent ?? false;
    this._collapse = collapse;
  }

  /** @internal */
  _collapseChange() {
    this._collapse.collapsed = !this._collapse.collapsed;

    this.collapseChange.emit({
      collapsed: this._collapse.collapsed,
      groupId: this._collapse.groupId,
      parent: this._collapse.parent,
    });
  }
}
