import { MatHeaderRowDef } from '@angular/material/table';
import { MatCellEditPluginDirective } from './mat-cell-edit.plugin.directive';
import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
} from '@angular/core';
import {
  CDK_SPREADSHEET_DROP_LIST_PROVIDERS,
  CdkSpreadsheetDropListDirective,
} from './cdk-spreadsheet-drop-list';
import { FocusHighlightable } from './table-spreadsheet-key-manager';

@Directive({
  selector: 'mat-table[cdkSpreadsheet], [cdkSpreadsheet][mat-table]',
  exportAs: 'cdkSpreadsheet',
  providers: CDK_SPREADSHEET_DROP_LIST_PROVIDERS,
})
export class MatTablePluginDirective
  extends CdkSpreadsheetDropListDirective<FocusHighlightable>
  implements AfterContentInit {
  @ContentChildren(MatCellEditPluginDirective)
  readonly matCellEditQueryList!: QueryList<MatCellEditPluginDirective>;

  @ContentChild(MatHeaderRowDef)
  readonly cdkHeaderRowDef!: QueryList<MatHeaderRowDef> & { columns: string[] };

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.keyManager.setActiveItem(event);
  }

  @HostListener('dblclick') onDblclick() {
    this.keyManager.activeItem?.show();
  }

  @HostListener('keydown', ['$event']) onKeydownArrow(event: KeyboardEvent) {
    this.keyManager.onKeydownArrow(event);
  }

  @HostListener('keydown.enter') onKeydownEnter() {
    this.keyManager.setNextItemActive();
  }

  ngAfterContentInit() {
    this.registerSpreadsheet(
      this.cdkHeaderRowDef.columns,
      this.matCellEditQueryList
    );
  }
}
