import { ElementRef, InjectionToken, Provider, QueryList } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CdkTableDropList } from './cdk-table-drop-list';
import {
  CdkTableSpreadsheetKeyManager,
  FocusHighlightable,
} from './cdk-table-spreadsheet-key-manager';

export const CDK_SPREADSHEET_FACTORY = new InjectionToken<
  ActiveDescendantKeyManager<FocusHighlightable>
>('cdkSpreadsheetManager');

export const CDK_SPREADSHEET_MANAGER_PROVIDERS: Provider[] = [
  {
    provide: CDK_SPREADSHEET_FACTORY,
    deps: [CdkDropList],
    useFactory: cdkSpreadsheetFactory,
  },
];

export interface SpreadsheetFactory<T extends FocusHighlightable> {
  create(
    columns: string[],
    queryList: QueryList<T>,
    el: ElementRef
  ): CdkTableSpreadsheetKeyManager<T>;
}
export function cdkSpreadsheetFactory<T extends FocusHighlightable>(
  dropList: CdkDropList
): SpreadsheetFactory<T> {
  return {
    create: (columns: string[], queryList: QueryList<T>, el: ElementRef) => {
      const dragDropManager = new CdkTableDropList(dropList, columns);
      const deps = [el, queryList, dragDropManager.columns$] as const;
      const spreadsheetManager = new CdkTableSpreadsheetKeyManager(
        ...deps
      ).withWrap();

      spreadsheetManager.onDestroy(() => dragDropManager.destroy());
      return spreadsheetManager;
    },
  };
}
