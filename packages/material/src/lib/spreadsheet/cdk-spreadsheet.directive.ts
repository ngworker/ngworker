import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  HostBinding,
  HostListener,
  Inject,
  Input,
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
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

// @note: copied from table.d.ts
type CdkTableDataSourceInput<T = Record<PropertyKey, unknown>> =
  | DataSource<T>
  | Observable<ReadonlyArray<T> | T[]>
  | ReadonlyArray<T>
  | T[];

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

  @Input() dataSource!: CdkTableDataSourceInput;

  @HostBinding('class.cdk-spreadsheet') hostClass = true;

  @ContentChildren(CdkCellEditDirective)
  cellEditQueryList!: QueryList<T>;

  @ContentChild(CdkHeaderRowDef)
  headerRowDef!: QueryList<CdkHeaderRowDef> & CdkHeaderRowDefColumns;

  @HostListener('click', ['$event']) click(e: MouseEvent) {
    this.spreadsheetManager.editMode('blank').setActiveItem(e);
  }

  @HostListener('dblclick') dblclick() {
    this.spreadsheetManager.editMode('mutable').lockArrowKeys();
  }

  @HostListener('keyup', ['$event']) onWrite(e: KeyboardEvent) {
    this.spreadsheetManager.writeActiveItem(e);
  }

  @HostListener('keyup.esc') esc() {
    this.spreadsheetManager.unlockArrowKeys().resetActiveItem();
  }

  @HostListener('keydown', ['$event']) arrowKey(e: KeyboardEvent) {
    if (!this.spreadsheetManager.arrowKeyLocked) {
      this.spreadsheetManager.onKeydownArrow(e);
    }
  }

  @HostListener('keydown.enter', ['$event']) enter(e: Event) {
    this.spreadsheetManager
      .unlockArrowKeys()
      .setArrowDownItemActive()
      .prevDefault(e);
  }

  @HostListener('keydown.shift.enter', ['$event']) shiftEnter(e: Event) {
    this.spreadsheetManager
      .unlockArrowKeys()
      .setArrowUpItemActive()
      .prevDefault(e);
  }

  @HostListener('keydown.tab', ['$event']) tab(e: Event) {
    this.spreadsheetManager
      .unlockArrowKeys()
      .setArrowRightItemActive()
      .prevDefault(e);
  }

  @HostListener('keydown.shift.tab', ['$event']) shiftTab(e: Event) {
    this.spreadsheetManager
      .unlockArrowKeys()
      .setArrowLeftItemActive()
      .prevDefault(e);
  }

  ngAfterContentInit() {
    this.spreadsheetManager = this._spreadsheetFactory.create(
      this.headerRowDef,
      this.cellEditQueryList
    );

    // @todo: clone initial dataSource
    console.log(this.dataSource);
  }

  ngOnDestroy() {
    this.spreadsheetManager.destroy();
  }
}
