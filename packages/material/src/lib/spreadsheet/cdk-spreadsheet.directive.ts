import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { CdkSpreadsheetKeyManager } from './cdk-spreadsheet-key-manager';
import { CdkCellEditDirective } from './cdk-cell-edit.directive';
import { CdkHeaderRowDef } from '@angular/cdk/table';
import {
  CDK_SPREADSHEET_FACTORY,
  CDK_SPREADSHEET_MANAGER_PROVIDERS,
} from './cdk-spreadspeet-manager.factory';
import {
  CdkHeaderRowDefColumns,
  CdkSpreadsheetFactory,
  FocusHighlightable,
} from './cdk-spreadsheet.types';

@Directive({
  selector: 'cdk-table[cdkSpreadsheet], [cdkSpreadsheet][cdk-table]',
  exportAs: 'cdkSpreadsheet',
  providers: CDK_SPREADSHEET_MANAGER_PROVIDERS,
})
export class CdkSpreadsheetDirective<
  T extends FocusHighlightable = FocusHighlightable
> implements OnDestroy, AfterContentInit {
  protected spreadsheetManager!: CdkSpreadsheetKeyManager<T>;

  constructor(
    @Inject(CDK_SPREADSHEET_FACTORY)
    private _spreadsheetFactory: CdkSpreadsheetFactory<T>
  ) {}

  @HostBinding('class.cdk-spreadsheet') hostClass = true;

  @ContentChildren(CdkCellEditDirective)
  cellEditQueryList!: QueryList<T>;

  @ContentChild(CdkHeaderRowDef)
  headerRowDef!: QueryList<CdkHeaderRowDef> & CdkHeaderRowDefColumns;

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.spreadsheetManager.setActiveItem(event);
  }

  @HostListener('keypress', ['$event']) onWrite(event: KeyboardEvent) {
    // @HostListener('keyup', ['$event']) onWrite(event: KeyboardEvent) {
    console.log(event);
    this.spreadsheetManager.writeActiveItem(event);
  }

  @HostListener('keyup.esc') onEsc() {
    this.spreadsheetManager.leaveActiveMode();
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
  @HostListener('keydown.tab', ['$event']) onKeydownTab(event: KeyboardEvent) {
    event.preventDefault();
    // @todo: move on x axis
    // this.spreadsheetManager.setNextItemActive('');
  }
  ngAfterContentInit() {
    this.spreadsheetManager = this._spreadsheetFactory.create(
      this.headerRowDef,
      this.cellEditQueryList
    );
  }

  ngOnDestroy() {
    this.spreadsheetManager.destroy();
  }
}
