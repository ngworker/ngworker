import {
  AfterContentInit,
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
import {
  CDK_SPREADSHEET_FACTORY,
  CDK_SPREADSHEET_MANAGER_PROVIDERS,
} from './cdk-spreadspeet-manager.factory';
import {
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
  cellQueryList!: QueryList<T>;

  @HostListener('click', ['$event']) click(e: MouseEvent) {
    this.spreadsheetManager.editMode('blank').setActiveItem(e).exec();
  }

  @HostListener('dblclick') dblclick() {
    this.spreadsheetManager.editMode('mutable').lockArrowKeys().exec();
  }

  @HostListener('keyup', ['$event']) onWrite(e: KeyboardEvent) {
    this.spreadsheetManager.writeActiveItem(e).exec();
  }

  @HostListener('keyup.esc') esc() {
    this.spreadsheetManager.unlockArrowKeys().resetActiveItem().exec();
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
      .prevDef(e)
      .exec();
  }

  @HostListener('keydown.shift.enter', ['$event']) shiftEnter(e: Event) {
    this.spreadsheetManager
      .unlockArrowKeys()
      .setArrowUpItemActive()
      .prevDef(e)
      .exec();
  }

  @HostListener('keydown.tab', ['$event']) tab(e: Event) {
    this.spreadsheetManager
      .unlockArrowKeys()
      .setArrowRightItemActive()
      .prevDef(e)
      .exec();
  }

  @HostListener('keydown.shift.tab', ['$event']) shiftTab(e: Event) {
    this.spreadsheetManager
      .unlockArrowKeys()
      .setArrowLeftItemActive()
      .prevDef(e)
      .exec();
  }

  ngAfterContentInit() {
    this.spreadsheetManager = this._spreadsheetFactory.create(
      this.cellQueryList
    );
  }

  ngOnDestroy() {
    this.spreadsheetManager.destroy();
  }
}
