import { NgModule } from '@angular/core';
import { CdkCellEditDirective } from './cdk-cell-edit.directive';
import { MatSpreadsheetDirective } from './mat-spreadsheet.directive';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { MatHeaderDragDirective } from './mat-header-drag.directive';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CdkCellEditComponent } from './cdk-cell-edit.component';
import { MatCellEditComponent } from './mat-cell-edit.component';
import { MatCellEditDirective } from './mat-cell-edit.directive';

// @todo: wenn alles fertig ist, dann cdk- oder mat- aus den filenames rausnehmen

@NgModule({
  imports: [
    DragDropModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [CdkDropList],
  declarations: [
    MatSpreadsheetDirective,
    CdkCellEditDirective,
    MatHeaderDragDirective,
    CdkSpreadsheetDirective,
    CdkCellEditComponent,
    MatCellEditComponent,
    // MatCellEditDirective,
  ],
  exports: [
    MatSpreadsheetDirective,
    CdkCellEditDirective,
    MatHeaderDragDirective,
    CdkSpreadsheetDirective,
    CdkCellEditComponent,
    MatCellEditComponent,
    // MatCellEditDirective,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    DragDropModule,
  ],
})
export class CdkSpreadsheetModule {}
