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
import { tap } from 'rxjs/operators';

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
    queryList: QueryList<T>,
    el: ElementRef
  ): CdkSpreadsheetKeyManager<T>;
}

export function cdkSpreadsheetFactory<T extends FocusHighlightable>(
  dropList: CdkDropList
): CdkSpreadsheetFactory<T> {
  return {
    create: (columns: string[], queryList: QueryList<T>, elRef: ElementRef) => {
      const keyManager = new ActiveDescendantKeyManager<T>(
        queryList
      ).withWrap();

      const tableDragDropManager = new CdkTableDropList(dropList, columns);

      const keyManagerMapper = new CdkKeyManagerMapper<T>(
        elRef,
        keyManager,
        queryList,
        tableDragDropManager.change$
      ).init();

      // @todo: columns (x)!
      // const dragDropSub = tableDragDropManager.change$.subscribe(change =>
      //   keyManagerMapper.setState(change)
      // );

      // @todo: columns (y)!
      // const subscription = tableDragDropManager.change$.subscribe(change =>
      //   keyManagerMapper.setState(change)
      // );

      const spreadsheetManager = new CdkSpreadsheetKeyManager(keyManagerMapper);
      spreadsheetManager.onDestroy(() => {
        tableDragDropManager.destroy();
        // dragDropSub.unsubscribe();
      });

      return spreadsheetManager;
    },
  };
}
