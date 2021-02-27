import { DEFAULT_CURRENCY_CODE, StaticProvider } from '@angular/core';

const currencyCodePattern = /^[A-Z]{3}$/;

export function createDefaultCurrencyCodeProvider(
  currencyCode: string
): StaticProvider {
  if (!currencyCodePattern.test(currencyCode)) {
    throw new Error(`Unsupported currency code: "${currencyCode}"`);
  }

  return {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: currencyCode,
  };
}
