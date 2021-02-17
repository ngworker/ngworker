import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  QueryList,
} from '@angular/core';

import {
  FocusHighlightable,
  TableSpreadsheetKeyManager,
} from './table-spreadsheet-key-manager';

import { CDK_DROP_LIST, CdkDropList } from '@angular/cdk/drag-drop';
import { TableDragDropManager } from './table-drag-drop-manager';
import { MatCellEditPluginDirective } from './mat-cell-edit.plugin.directive';
import { MatHeaderRowDef } from '@angular/material/table';

export const CDK_SPREADSHEET_DROP_LIST_PROVIDERS = [
  { provide: CDK_DROP_LIST, useExisting: CdkDropList },
];

@Directive({
  selector: 'cdk-table[cdkSpreadsheet], [cdkSpreadsheet][cdk-table]',
  providers: CDK_SPREADSHEET_DROP_LIST_PROVIDERS,
})
export class CdkSpreadsheetDirective<
  T extends FocusHighlightable = FocusHighlightable
> implements OnDestroy, AfterContentInit {
  protected spreadsheetManager!: TableSpreadsheetKeyManager<T>;
  private _dragDropManager!: TableDragDropManager;

  constructor(
    private readonly _cdkDropList: CdkDropList,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {}

  @ContentChildren(MatCellEditPluginDirective)
  private _matCellEditQueryList!: QueryList<T>;

  @ContentChild(MatHeaderRowDef)
  private _cdkHeaderRowDef!: QueryList<MatHeaderRowDef> & {
    columns: string[];
  };

  @HostBinding('class.cdk-spreadsheet') hostClass = true;

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.spreadsheetManager.setActiveItem(event);
  }

  @HostListener('dblclick') onDblclick() {
    this.spreadsheetManager.activeItem?.show();
  }

  @HostListener('keydown', ['$event']) onKeydownArrow(event: KeyboardEvent) {
    this.spreadsheetManager.onKeydownArrow(event);
  }

  @HostListener('keydown.enter') onKeydownEnter() {
    this.spreadsheetManager.setNextItemActive();
  }

  private _registerSpreadsheet(columns: string[], queryList: QueryList<T>) {
    this._dragDropManager = new TableDragDropManager(
      this._cdkDropList,
      columns
    );

    this.spreadsheetManager = new TableSpreadsheetKeyManager(
      queryList,
      this._elementRef.nativeElement,
      this._dragDropManager.columnsUpdated
    ).withWrap();
  }

  ngAfterContentInit() {
    this._registerSpreadsheet(
      this._cdkHeaderRowDef.columns,
      this._matCellEditQueryList
    );
  }

  ngOnDestroy() {
    this.spreadsheetManager?.destroy();
    this._dragDropManager?.destroy();
  }
}
