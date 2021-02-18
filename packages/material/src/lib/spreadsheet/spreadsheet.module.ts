import { NgModule } from '@angular/core';
import { MatCellEditPluginDirective } from './mat-cell-edit.plugin.directive';
import { MatSpreadsheetDirective } from './mat-spreadsheet.directive';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { MatHeaderDragDirective } from './mat-header-drag.directive';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CDK_SPREADSHEET_MANAGER_PROVIDERS } from './cdk-spreadspeet-manager.factory';

@NgModule({
  imports: [
    DragDropModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [CdkDropList, ...CDK_SPREADSHEET_MANAGER_PROVIDERS],
  declarations: [
    MatSpreadsheetDirective,
    MatCellEditPluginDirective,
    MatHeaderDragDirective,
    CdkSpreadsheetDirective,
  ],
  exports: [
    MatSpreadsheetDirective,
    MatCellEditPluginDirective,
    MatHeaderDragDirective,
    CdkSpreadsheetDirective,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    DragDropModule,
  ],
})
export class MatSpreadsheetModule {}
