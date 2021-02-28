import {
  ContentChild,
  ContentChildren,
  Directive,
  HostBinding,
  QueryList,
} from '@angular/core';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { CDK_SPREADSHEET_MANAGER_PROVIDERS } from './cdk-spreadspeet-manager.factory';
import {
  CdkHeaderRowDefColumns,
  FocusHighlightable,
} from './cdk-spreadsheet.types';
import { MatCellEditDirective } from './mat-cell-edit.directive';
import { MatHeaderRowDef } from '@angular/material/table';

@Directive({
  selector: 'mat-table[matSpreadsheet], [matSpreadsheet][mat-table]',
  exportAs: 'matSpreadsheet',
  providers: CDK_SPREADSHEET_MANAGER_PROVIDERS,
})
export class MatSpreadsheetDirective extends CdkSpreadsheetDirective {
  @HostBinding('class.mat-spreadsheet') hostClass = true;

  @ContentChildren(MatCellEditDirective)
  cellEditQueryList!: QueryList<FocusHighlightable>;

  @ContentChild(MatHeaderRowDef)
  headerRowDef!: QueryList<MatHeaderRowDef> & CdkHeaderRowDefColumns;
}
