import { NgModule } from '@angular/core';
import { CdkCellEditDirective } from './cdk-cell-edit.directive';
import { MatSpreadsheetDirective } from './mat-spreadsheet.directive';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { MatTableModule } from '@angular/material/table';
import { MatCellEditDirective } from './mat-cell-edit.directive';
import { MatCellDefDirective } from './mat-cell-def.directive';

@NgModule({
  declarations: [
    CdkCellEditDirective,
    CdkSpreadsheetDirective,
    MatSpreadsheetDirective,
    MatCellEditDirective,
    MatCellDefDirective,
  ],
  exports: [
    CdkCellEditDirective,
    CdkSpreadsheetDirective,
    MatSpreadsheetDirective,
    MatCellEditDirective,
    MatTableModule,
    MatCellDefDirective,
  ],
})
export class CdkSpreadsheetModule {}
