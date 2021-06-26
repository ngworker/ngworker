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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSpreadsheetCollapseComponent } from './mat-spreadsheet-collapse';
import { CdkSpreadsheetCollapseComponent } from './cdk-spreadsheet-collapse';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de-DE' }],
  declarations: [
    CdkCellDirective,
    CdkSpreadsheetDirective,
    CdkSpreadsheetCollapseComponent,
    MatSpreadsheetDirective,
    MatCellDirective,
    MatSpreadsheetSelectOptionComponent,
    MatSpreadsheetComboboxComponent,
    MatSpreadsheetDatepickerComponent,
    MatSpreadsheetInputComponent,
    MatSpreadsheetCollapseComponent,
  ],
  exports: [
    CdkCellDirective,
    CdkSpreadsheetDirective,
    CdkSpreadsheetCollapseComponent,
    MatSpreadsheetDirective,
    MatCellDirective,
    MatTableModule,
    MatSpreadsheetSelectOptionComponent,
    MatSpreadsheetComboboxComponent,
    MatSpreadsheetDatepickerComponent,
    MatSpreadsheetInputComponent,
    MatSpreadsheetCollapseComponent,
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
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CdkSpreadsheetModule {}
