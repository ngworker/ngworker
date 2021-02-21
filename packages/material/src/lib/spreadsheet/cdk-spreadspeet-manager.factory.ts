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
    queryList: QueryList<T>,
    el: ElementRef
  ): CdkSpreadsheetKeyManager<T>;
}

export function cdkSpreadsheetFactory<T extends FocusHighlightable>(
  dropList: CdkDropList
): CdkSpreadsheetFactory<T> {
  return {
    create: (columns: string[], queryList: QueryList<T>, el: ElementRef) => {
      const tableDragDropManager = new CdkTableDropList(dropList, columns);
      const keyManager = new ActiveDescendantKeyManager<T>(
        queryList
      ).withWrap();

      const matrixManager = new CdkKeyManagerMapper<T>(
        el.nativeElement,
        keyManager,
        queryList,
        tableDragDropManager.columns$
      ).init();

      const spreadsheetManager = new CdkSpreadsheetKeyManager(
        matrixManager,
        tableDragDropManager.columns$,
        keyManager,
        queryList
      );

      spreadsheetManager.onDestroy(() => tableDragDropManager.destroy());
      return spreadsheetManager;
    },
  };
}
