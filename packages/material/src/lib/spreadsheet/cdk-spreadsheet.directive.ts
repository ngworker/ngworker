import {
  AfterContentInit,
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
import {
  CDK_SPREADSHEET_FACTORY,
  CDK_SPREADSHEET_MANAGER_PROVIDERS,
  CdkSpreadsheetFactory,
} from './cdk-spreadspeet-manager.factory';
import { CdkCellEditable } from './cdk-spreadsheet.types';

/**
 * Type-safe MatCellDef
 * https://nartc.me/blog/typed-mat-cell-def
 */

@Directive({
  selector: 'cdk-table[cdkSpreadsheet], [cdkSpreadsheet][cdk-table]',
  exportAs: 'cdkSpreadsheet',
  providers: CDK_SPREADSHEET_MANAGER_PROVIDERS,
})
export class CdkSpreadsheetDirective<
  CellEdit extends CdkCellEditable = CdkCellEditable
> implements OnDestroy, AfterContentInit {
  public spreadsheetManager!: CdkSpreadsheetKeyManager<CellEdit>;

  constructor(
    @Inject(CDK_SPREADSHEET_FACTORY)
    private _spreadsheetFactory: CdkSpreadsheetFactory<CellEdit>
  ) {}

  @HostBinding('class.cdk-spreadsheet') hostClass = true;

  @ContentChildren(CdkCellEditDirective)
  cellQueryList!: QueryList<CellEdit>;

  @HostListener('click', ['$event.target']) click(element: Element) {
    this.spreadsheetManager.setActiveItem(element).exec();
  }

  @HostListener('dblclick') dblclick() {
    this.spreadsheetManager.lockArrowKeys().exec();
  }

  @HostListener('keyup.esc') esc() {
    this.spreadsheetManager.unlockArrowKeys().resetActiveItem().exec();
  }

  @HostListener('keydown', ['$event']) arrowKey(e: KeyboardEvent) {
    if (this.spreadsheetManager.arrowKeyLocked) return;
    this.spreadsheetManager.onKeydownArrow(e)?.exec(e);
  }

  @HostListener('keydown.enter', ['$event']) enter(e: Event) {
    this.spreadsheetManager.unlockArrowKeys().setArrowDownItemActive().exec(e);
  }

  @HostListener('keydown.shift.enter', ['$event']) shiftEnter(e: Event) {
    this.spreadsheetManager.unlockArrowKeys().setArrowUpItemActive().exec(e);
  }

  @HostListener('keydown.tab', ['$event']) tab(e: Event) {
    this.spreadsheetManager.unlockArrowKeys().setArrowRightItemActive().exec(e);
  }

  @HostListener('keydown.shift.tab', ['$event']) shiftTab(e: Event) {
    this.spreadsheetManager.unlockArrowKeys().setArrowLeftItemActive().exec(e);
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
