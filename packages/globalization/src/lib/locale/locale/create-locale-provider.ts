import { LOCALE_ID, ValueProvider } from '@angular/core';

export function createLocaleProvider(localeCode: string): ValueProvider {
  return {
    provide: LOCALE_ID,
    useValue: localeCode,
  };
}
