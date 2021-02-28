import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, FactoryProvider, LOCALE_ID } from '@angular/core';

import { angularDefaultLocaleCode } from './angular-default-locale-code';

function registerLocaleFactory(localeCode: string): () => Promise<void> {
  return localeCode === angularDefaultLocaleCode
    ? () => Promise.resolve()
    : () =>
        import(
          `@angular/common/locales/${localeCode}`
        ).then(({ default: localeData }) =>
          registerLocaleData(localeData, localeCode)
        );
}

export const localeInitializer: FactoryProvider = {
  deps: [LOCALE_ID],
  multi: true,
  provide: APP_INITIALIZER,
  useFactory: registerLocaleFactory,
};
