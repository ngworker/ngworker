import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

async function registerLocale(localeCode: string): Promise<void> {
  const localeData = await import(`@angular/common/locales/${localeCode}`).then(
    amdModule => amdModule.default
  );
  registerLocaleData(localeData, localeCode);
}

export function createLocaleInitializer(localeCode: string): FactoryProvider {
  return {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: () => (): Promise<void> => registerLocale(localeCode),
  };
}
