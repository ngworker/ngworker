import { ElementRef, InjectionToken, Provider, QueryList } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import { CdkSpreadsheetDirective } from './cdk-spreadsheet.directive';
import { CdkSpreadsheetKeyManager } from './cdk-spreadsheet-key-manager';
import { cdkTableSnapshot } from './cdk-table-snapshot';
import { CdkCellAble } from './cdk-spreadsheet.types';

export const CDK_SPREADSHEET_FACTORY = new InjectionToken<CdkSpreadsheetDirective>(
  'cdkSpreadsheetManager'
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
  elementRef: ElementRef
): CdkSpreadsheetFactory<T> {
  return {
    create: (queryList: QueryList<T>) => {
      const activeDescendantKeyManager = new ActiveDescendantKeyManager<T>(
        queryList
      ).withWrap();

      const keyManagerMapper = new CdkKeyManagerMapper(
        cdkTableSnapshot(elementRef.nativeElement, '.cdk-cell'),
        activeDescendantKeyManager
      );

      return new CdkSpreadsheetKeyManager(keyManagerMapper);
    },
  };
}

// @marker: git commit hash: 44c7f6fe79e2377b4757499910636629bd200d26
