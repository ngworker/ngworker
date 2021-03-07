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
import { MatCellEditDirective } from './mat-cell-edit.directive';
import { CdkHeaderDragDirective } from './cdk-header-drag.directive';

// @todo: remove mat- or cdk- from file name!

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
    CdkHeaderDragDirective,
    CdkCellEditDirective,
    CdkSpreadsheetDirective,

    MatSpreadsheetDirective,
    MatHeaderDragDirective,
    MatCellEditDirective,
  ],
  exports: [
    CdkHeaderDragDirective,
    CdkCellEditDirective,
    CdkSpreadsheetDirective,

    MatSpreadsheetDirective,
    MatHeaderDragDirective,
    MatCellEditDirective,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    DragDropModule,
  ],
})
export class CdkSpreadsheetModule {}
