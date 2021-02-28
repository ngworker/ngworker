import { InjectionToken, Provider, QueryList } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CDK_DROP_LIST, CdkDropList } from '@angular/cdk/drag-drop';
import { CdkTableDropList } from './cdk-table-drop-list';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { CdkSpreadsheetKeyManager } from './cdk-spreadsheet-key-manager';
import {
  CdkHeaderRowDefColumns,
  CdkSpreadsheetFactory,
  FocusHighlightable,
} from './cdk-spreadsheet.types';

export const CDK_SPREADSHEET_FACTORY = new InjectionToken<CdkSpreadsheetDirective>(
  'cdkSpreadsheetManager'
);

export const CDK_SPREADSHEET_MANAGER_PROVIDERS: Provider[] = [
  { provide: CDK_DROP_LIST, useExisting: CdkDropList },
  {
    provide: CDK_SPREADSHEET_FACTORY,
    deps: [CdkDropList],
    useFactory: cdkSpreadsheetFactory,
  },
];

export function cdkSpreadsheetFactory<T extends FocusHighlightable>(
  dropList: CdkDropList
): CdkSpreadsheetFactory<T> {
  return {
    create: (headerRowDef: CdkHeaderRowDefColumns, queryList: QueryList<T>) => {
      const tableDragDropManager = new CdkTableDropList(
        dropList,
        queryList,
        headerRowDef
      );

      const activeDescendantKeyManager = new ActiveDescendantKeyManager<T>(
        queryList
      ).withWrap();

      const keyManagerMapper = new CdkKeyManagerMapper(
        dropList.element,
        tableDragDropManager.table,
        activeDescendantKeyManager
      );

      // on x-axis move
      tableDragDropManager.change$.subscribe(change =>
        keyManagerMapper.setState(change)
      );

      const spreadsheetManager = new CdkSpreadsheetKeyManager(keyManagerMapper);
      spreadsheetManager.onDestroy(() => tableDragDropManager.destroy());

      return spreadsheetManager;
    },
  };
}
