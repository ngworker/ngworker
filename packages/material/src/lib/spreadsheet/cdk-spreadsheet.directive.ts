import {
  AfterContentInit,
  ContentChildren,
  Directive,
  HostBinding,
  HostListener,
  Inject,
  QueryList,
} from '@angular/core';
import { CdkSpreadsheetKeyManager } from './cdk-spreadsheet-key-manager';
import { CdkCellDirective } from './cdk-cell.directive';
import {
  CDK_SPREADSHEET_FACTORY,
  CDK_SPREADSHEET_MANAGER_PROVIDERS,
  CdkSpreadsheetFactory,
} from './cdk-spreadspeet-manager.factory';
import { CdkCellAble } from './cdk-spreadsheet.types';

/**
 * Type-safe MatCellDef
 * https://nartc.me/blog/typed-mat-cell-def
 */

@Directive({
  selector: 'cdk-table[cdkSpreadsheet], [cdkSpreadsheet][cdk-table]',
  exportAs: 'cdkSpreadsheet',
  providers: CDK_SPREADSHEET_MANAGER_PROVIDERS,
})
export class CdkSpreadsheetDirective<CellEdit extends CdkCellAble = CdkCellAble>
  implements AfterContentInit {
  public spreadsheetManager!: CdkSpreadsheetKeyManager<CellEdit>;

  constructor(
    @Inject(CDK_SPREADSHEET_FACTORY)
    private _spreadsheetFactory: CdkSpreadsheetFactory<CellEdit>
  ) {}

  @HostBinding('class.cdk-spreadsheet') hostClass = true;

  @ContentChildren(CdkCellDirective) cellQueryList!: QueryList<CellEdit>;

  @HostListener('click', ['$event']) click(e: MouseEvent) {
    this.spreadsheetManager.setActiveItem(e.target as Element).exec(e);
  }

  @HostListener('keyup.esc', ['$event']) esc(e: KeyboardEvent) {
    this.spreadsheetManager.resetActiveItem().exec(e);
  }

  @HostListener('keydown', ['$event']) arrowKey(e: KeyboardEvent) {
    // const keyCode = e.keyCode as Direction;
    this.spreadsheetManager.onKeydownArrow(e) /*.exec(e)*/;
  }

  @HostListener('keydown.enter', ['$event']) enter(e: KeyboardEvent) {
    this.spreadsheetManager.setArrowDownItemActive().exec(e);
  }

  // prettier-ignore
  @HostListener('keydown.shift.enter', ['$event']) shiftEnter(e: KeyboardEvent) {
    this.spreadsheetManager.setArrowUpItemActive().exec(e);
  }

  @HostListener('keydown.tab', ['$event']) tab(e: KeyboardEvent) {
    this.spreadsheetManager.setArrowRightItemActive().exec(e);
  }

  @HostListener('keydown.shift.tab', ['$event']) shiftTab(e: KeyboardEvent) {
    this.spreadsheetManager.setArrowLeftItemActive().exec(e);
  }

  ngAfterContentInit() {
    this.spreadsheetManager = this._spreadsheetFactory.create(
      this.cellQueryList
    );
  }
}
