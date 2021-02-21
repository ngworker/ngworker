import { InjectionToken, Provider, QueryList } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { FocusHighlightable } from './cdk-spreadsheet-key-manager';

export const CDK_KEY_MANAGER_FACTORY = new InjectionToken<
  ActiveDescendantKeyManager<FocusHighlightable>
>('activeDescendantKeyManager');

export const CDK_KEY_MANAGER_PROVIDERS: Provider[] = [
  {
    provide: CDK_KEY_MANAGER_FACTORY,
    useFactory: keyManagerFactory,
  },
];

export interface CdkKeyManagerFactory<T extends FocusHighlightable> {
  create(queryList: QueryList<T>): ActiveDescendantKeyManager<T>;
}
export function keyManagerFactory<
  T extends FocusHighlightable
>(): CdkKeyManagerFactory<T> {
  return {
    create: (queryList: QueryList<T>) => {
      // @todo: move this into cdk-spreadsheet-manager.factory
      return new ActiveDescendantKeyManager<T>(queryList).withWrap();
    },
  };
}
