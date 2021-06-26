import { ElementRef, InjectionToken, Provider, QueryList } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { CdkSpreadsheetKeyManager } from './cdk-spreadsheet-key-manager';
import { cdkTableSnapshot } from './cdk-table-snapshot';
import { CdkCellAble } from './cdk-spreadsheet.types';

export const CDK_SPREADSHEET_FACTORY = new InjectionToken<CdkSpreadsheetDirective>(
  'cdkSpreadsheetManager',
);

export const CDK_SPREADSHEET_MANAGER_PROVIDERS: Provider[] = [
  {
    provide: CDK_SPREADSHEET_FACTORY,
    deps: [ElementRef],
    useFactory: cdkSpreadsheetFactory,
  },
];

export interface CdkSpreadsheetFactory<CellEdit extends CdkCellAble> {
  create(queryList: QueryList<CellEdit>): CdkSpreadsheetKeyManager<CellEdit>;
}

export function cdkSpreadsheetFactory<T extends CdkCellAble>(
  elementRef: ElementRef,
): CdkSpreadsheetFactory<T> {
  return {
    create: (queryList: QueryList<T>) => {
      const activeDescendantKeyManager = new ActiveDescendantKeyManager<T>(queryList).withWrap();

      const keyManagerMapper = new CdkKeyManagerMapper(
        cdkTableSnapshot(elementRef.nativeElement, '.mat-cell'),
        activeDescendantKeyManager,
      );

      // @todo:
      // - unsubscribe
      // - move into CdkKeyManagerMapper
      queryList.changes.subscribe(() => {
        // @todo: cdkTableSnapshot can be used in CdkKeyManagerMapper
        keyManagerMapper.initTableState(cdkTableSnapshot(elementRef.nativeElement, '.mat-cell'));
      });

      return new CdkSpreadsheetKeyManager(keyManagerMapper);
    },
  };
}

// @marker: git commit hash: 44c7f6fe79e2377b4757499910636629bd200d26
// https://github.com/ngworker/ngworker/blob/a0fdad721faeb14ece4e31969911b2a9bcedd769/packages/material/src/lib/spreadsheet/cdk-table-drop-list.ts
// https://github.com/ngworker/ngworker/blob/a0fdad721faeb14ece4e31969911b2a9bcedd769/packages/material/src/lib/spreadsheet/cdk-spreadspeet-manager.factory.ts
// https://github.com/ngworker/ngworker/blob/a0fdad721faeb14ece4e31969911b2a9bcedd769/packages/material/src/lib/spreadsheet/cdk-key-manager-mapper.ts
