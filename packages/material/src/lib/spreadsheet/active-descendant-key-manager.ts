import { InjectionToken, Provider, QueryList } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { FocusHighlightable } from './cdk-table-spreadsheet-key-manager';

export const KEY_MANAGER = new InjectionToken<
  ActiveDescendantKeyManager<FocusHighlightable>
>('ActiveDescendantKeyManager');

export const ACTIVE_DESCENDANT_KEY_MANAGER_PROVIDERS: Provider[] = [
  {
    provide: KEY_MANAGER,
    useFactory: KeyManagerFactory,
  },
];

export function KeyManagerFactory() {
  return (queryList: QueryList<FocusHighlightable>) => {
    return new ActiveDescendantKeyManager(queryList);
  };
}
