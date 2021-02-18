import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy,
  QueryList,
} from '@angular/core';

import {
  CdkTableSpreadsheetKeyManager,
  FocusHighlightable,
} from './cdk-table-spreadsheet-key-manager';

import { CDK_DROP_LIST, CdkDropList } from '@angular/cdk/drag-drop';
import { MatCellEditPluginDirective } from './mat-cell-edit.plugin.directive';
import { MatHeaderRowDef } from '@angular/material/table';
import {
  CDK_SPREADSHEET_FACTORY,
  SpreadsheetFactory,
} from './cdk-spreadspeet-manager.factory';

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
  protected spreadsheetManager!: CdkTableSpreadsheetKeyManager<T>;

  constructor(
    @Inject(CDK_SPREADSHEET_FACTORY)
    private _spreadsheetFactory: SpreadsheetFactory<T>,
    private _elementRef: ElementRef<HTMLElement>
  ) {}

  @HostBinding('class.cdk-spreadsheet') hostClass = true;

  @ContentChildren(MatCellEditPluginDirective)
  private _matCellEditQueryList!: QueryList<T>;

  @ContentChild(MatHeaderRowDef)
  private _cdkHeaderRowDef!: QueryList<MatHeaderRowDef> & {
    columns: string[];
  };

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

  ngAfterContentInit() {
    this.spreadsheetManager = this._spreadsheetFactory.create(
      this._cdkHeaderRowDef.columns,
      this._matCellEditQueryList,
      this._elementRef
    );
  }

  ngOnDestroy() {
    this.spreadsheetManager.destroy();
  }
}
