import { ElementRef, InjectionToken, Provider, QueryList } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CDK_DROP_LIST, CdkDropList } from '@angular/cdk/drag-drop';
import { CdkTableDropList } from './cdk-table-drop-list';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import {
  CdkSpreadsheetKeyManager,
  FocusHighlightable,
} from './cdk-spreadsheet-key-manager';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';

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

export interface CdkSpreadsheetFactory<T extends FocusHighlightable> {
  create(
    columns: string[],
    queryList: QueryList<T>
  ): CdkSpreadsheetKeyManager<T>;
}

export function cdkSpreadsheetFactory<T extends FocusHighlightable>(
  dropList: CdkDropList
): CdkSpreadsheetFactory<T> {
  return {
    // @todo: can we determine the columns automatically?
    create: (columns: string[], queryList: QueryList<T>) => {
      const keyManager = new ActiveDescendantKeyManager<T>(
        queryList
      ).withWrap();

      const tableDragDropManager = new CdkTableDropList(
        dropList,
        queryList,
        columns
      );

      const keyManagerMapper = new CdkKeyManagerMapper(
        // @todo: pass this._table
        dropList.element,
        keyManager
      ).init();

      // @todo: columns (y)!
      // const dragDropSub = tableDragDropManager.change$.subscribe(change =>
      //   keyManagerMapper.setState(change)
      // );

      // @todo: columns (x)!
      const dragDropSub = tableDragDropManager.change$.subscribe(change =>
        keyManagerMapper.setState(change)
      );

      const spreadsheetManager = new CdkSpreadsheetKeyManager(keyManagerMapper);
      spreadsheetManager.onDestroy(() => {
        tableDragDropManager.destroy();
        dragDropSub.unsubscribe();
      });

      return spreadsheetManager;
    },
  };
}
