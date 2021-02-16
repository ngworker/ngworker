import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  OnDestroy,
  Optional,
  QueryList,
} from '@angular/core';

import {
  FocusHighlightable,
  TableSpreadsheetKeyManager,
} from './table-spreadsheet-key-manager';

import { CDK_DROP_LIST, CdkDropList, DragDrop } from '@angular/cdk/drag-drop';
import { TableDragDropManager } from './table-drag-drop-manager';

export const CDK_SPREADSHEET_DROP_LIST_PROVIDERS = [
  { provide: CDK_DROP_LIST, useExisting: CdkDropList },
];

@Directive({
  selector: 'mat-table[cdkSpreadsheet], [cdkSpreadsheet][mat-table]',
  providers: CDK_SPREADSHEET_DROP_LIST_PROVIDERS,
})
export class CdkSpreadsheetDropListDirective<
    T extends FocusHighlightable = FocusHighlightable
  >
  extends CdkDropList
  implements OnDestroy {
  public keyManager!: TableSpreadsheetKeyManager<T>;
  public tableManager!: TableDragDropManager;

  constructor(
    private readonly cdkDropList: CdkDropList,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly dragDrop: DragDrop,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly scrollDispatcher: ScrollDispatcher,
    @Optional() private readonly dir?: Directionality
  ) {
    super(elementRef, dragDrop, changeDetectorRef, scrollDispatcher, dir);
  }

  registerSpreadsheet(columns: string[], cellEditQueryList: QueryList<T>) {
    this.tableManager = new TableDragDropManager(this.cdkDropList, columns);
    this.keyManager = new TableSpreadsheetKeyManager(
      cellEditQueryList,
      this.elementRef.nativeElement,
      this.tableManager.columnsUpdated
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
