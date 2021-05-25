import {
  ContentChildren,
  Directive,
  HostBinding,
  QueryList,
} from '@angular/core';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { CDK_SPREADSHEET_MANAGER_PROVIDERS } from './cdk-spreadspeet-manager.factory';
import { CdkCellAble } from './cdk-spreadsheet.types';
import { MatCellDirective } from './mat-cell.directive';

@Directive({
  selector: 'mat-table[matSpreadsheet], [matSpreadsheet][mat-table]',
  exportAs: 'matSpreadsheet',
  providers: CDK_SPREADSHEET_MANAGER_PROVIDERS,
})
export class MatSpreadsheetDirective extends CdkSpreadsheetDirective {
  @HostBinding('class.mat-spreadsheet') hostClass = true;

  @ContentChildren(MatCellDirective)
  cellQueryList!: QueryList<CdkCellAble>;
}
