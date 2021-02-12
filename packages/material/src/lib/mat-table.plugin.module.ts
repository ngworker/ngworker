import { NgModule } from '@angular/core';
import { MatCellEditPluginDirective } from './mat-cell-edit.plugin.directive';
import { MatTablePluginDirective } from './mat-table.plugin.directive';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { MatHeaderDragDirective } from './mat-header-drag.directive';
import { CdkSpreadsheetDropListDirective } from './cdk-spreadsheet-drop-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

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
    MatTablePluginDirective,
    MatCellEditPluginDirective,
    MatHeaderDragDirective,
    CdkSpreadsheetDropListDirective,
  ],
  exports: [
    MatTablePluginDirective,
    MatCellEditPluginDirective,
    MatHeaderDragDirective,
    CdkSpreadsheetDropListDirective,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    DragDropModule,
  ],
})
export class MatTablePluginModule {}
