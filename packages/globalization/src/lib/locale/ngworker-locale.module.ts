import { getLocaleCurrencyCode } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { createDefaultCurrencyCodeProvider } from './currency/create-default-currency-code-provider';
import { NgworkerLocaleRootModule } from './ngworker-locale-root.module';

export interface NgworkerLocaleOptions {
  readonly locale: string;
}

const angularDefaultLocaleCode = 'en';

@NgModule()
export class NgworkerLocaleModule {
  static forRoot({
    locale,
  }: NgworkerLocaleOptions):
    | ModuleWithProviders<NgworkerLocaleRootModule>
    | never {
    const currencyCode = getLocaleCurrencyCode(
      locale ?? angularDefaultLocaleCode
    );

    if (!currencyCode) {
      throw new Error(
        `Unable to determine currency code for locale "${locale}".`
      );
    }

    return {
      ngModule: NgworkerLocaleRootModule,
      providers: [createDefaultCurrencyCodeProvider(currencyCode)],
    };
  }

  constructor() {
    throw new Error(
      'Do not import NgworkerLocaleModule directly. Use NgworkerLocaleModule.forRoot.'
    );
  }
}
