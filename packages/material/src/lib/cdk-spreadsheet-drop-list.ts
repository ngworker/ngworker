import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Directive, ElementRef, Inject, OnDestroy, Optional, QueryList, SkipSelf } from '@angular/core';

import {
  CDK_DRAG_CONFIG,
  CDK_DROP_LIST,
  CDK_DROP_LIST_GROUP,
  CdkDropList,
  CdkDropListGroup,
  DragDrop,
  DragDropConfig,
} from '@angular/cdk/drag-drop';
import { TableDragDropManager } from './table-drag-drop-manager';
import { FocusHighlightable, TableSpreadsheetKeyManager } from './table-spreadsheet-key-manager';

/**
 * patched from: cdk/drag-drop/directives/drop-list.ts
 */
export const CDK_SPREADSHEET_DROP_LIST_PROVIDERS = [
  {provide: CDK_DROP_LIST_GROUP, useValue: undefined},
  {provide: CDK_DROP_LIST, useExisting: CdkDropList},
];

@Directive({
  selector: 'mat-table[cdkSpreadsheet], [cdkSpreadsheet][mat-table]',
  providers: CDK_SPREADSHEET_DROP_LIST_PROVIDERS,
})
export class CdkSpreadsheetDropListDirective<
  T extends FocusHighlightable = FocusHighlightable> extends CdkDropList implements OnDestroy {

  public keyManager!: TableSpreadsheetKeyManager<T>;
  public tableManager!: TableDragDropManager;

  constructor(
    public readonly cdkDropList: CdkDropList,
    // @note: everything down were patched from: cdk/drag-drop/directives/drop-list.ts
    // @todo: CDK_SPREADSHEET_TOKEN => get everything over factory
    public elementRef: ElementRef<HTMLElement>,
    public dragDrop: DragDrop,
    public changeDetectorRef: ChangeDetectorRef,
    public scrollDispatcher: ScrollDispatcher,
    @Optional() public dir?: Directionality,
    @Optional() @Inject(CDK_DROP_LIST_GROUP) @SkipSelf()
    public group?: CdkDropListGroup<CdkDropList>,
    @Optional() @Inject(CDK_DRAG_CONFIG) protected config?: DragDropConfig
  ) {
    super(elementRef, dragDrop, changeDetectorRef, scrollDispatcher, dir, group, config);
  }

  registerSpreadsheet(columns: string[], cellEditQueryList: QueryList<T>) {
    this.tableManager = new TableDragDropManager(
      this.cdkDropList,
      columns,
    );

    this.keyManager = new TableSpreadsheetKeyManager(
      cellEditQueryList,
      this.elementRef.nativeElement,
      this.tableManager.columnsUpdated,
    ).withWrap();
  }

  destroyManagers() {
    this.keyManager?.destroy();
    this.tableManager?.destroy();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroyManagers();
  }
}
