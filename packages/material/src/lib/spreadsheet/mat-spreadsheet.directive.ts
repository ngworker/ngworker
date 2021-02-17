import { Directive, HostBinding } from '@angular/core';
import {
  CDK_SPREADSHEET_DROP_LIST_PROVIDERS,
  CdkSpreadsheetDirective,
} from './cdk-spreadsheet.directive';

@Directive({
  selector: 'mat-table[matSpreadsheet], [matSpreadsheet][mat-table]',
  exportAs: 'matSpreadsheet',
  providers: CDK_SPREADSHEET_DROP_LIST_PROVIDERS,
})
export class MatSpreadsheetDirective extends CdkSpreadsheetDirective {
  @HostBinding('class.mat-spreadsheet') hostClass = true;
}
