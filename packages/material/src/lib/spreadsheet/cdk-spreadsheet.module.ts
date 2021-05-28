import { NgModule } from '@angular/core';
import { CdkCellDirective } from './cdk-cell.directive';
import { MatSpreadsheetDirective } from './mat-spreadsheet.directive';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { MatTableModule } from '@angular/material/table';
import { MatCellDirective } from './mat-cell.directive';
import { MatSpreadsheetSelectOptionComponent } from './mat-spreadsheet-select-option';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSpreadsheetComboboxComponent } from './mat-spreadsheet-combobox';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSpreadsheetDatepickerComponent } from './mat-spreadsheet-datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSpreadsheetInputComponent } from './mat-spreadsheet-input';

@NgModule({
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de-DE' }],
  declarations: [
    CdkCellDirective,
    CdkSpreadsheetDirective,
    MatSpreadsheetDirective,
    MatCellDirective,
    MatSpreadsheetSelectOptionComponent,
    MatSpreadsheetComboboxComponent,
    MatSpreadsheetDatepickerComponent,
    MatSpreadsheetInputComponent,
  ],
  exports: [
    CdkCellDirective,
    CdkSpreadsheetDirective,
    MatSpreadsheetDirective,
    MatCellDirective,
    MatTableModule,
    MatSpreadsheetSelectOptionComponent,
    MatSpreadsheetComboboxComponent,
    MatSpreadsheetDatepickerComponent,
    MatSpreadsheetInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CdkSpreadsheetModule {}
