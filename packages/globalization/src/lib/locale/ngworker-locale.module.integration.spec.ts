import { registerLocaleData } from '@angular/common';
import danishLocaleData from '@angular/common/locales/da';
import germanLocaleData from '@angular/common/locales/de';
import { createPipeHarness } from '@ngworker/spectacular';

import { DummyPipe } from './dummy.pipe';
import { NgworkerLocaleModule } from './ngworker-locale.module';

describe(NgworkerLocaleModule.name, () => {
  describe('Currency', () => {
    const pipe = DummyPipe;
    const pipeName = 'currency';
    const template = `{{value | currency:null:'code'}}`;

    it(`the US Dollar is the application's default currency code when the English locale is used`, () => {
      const usDollar = 'USD';
      const englishLocaleCode = 'en';

      const harness = createPipeHarness({
        imports: [
          NgworkerLocaleModule.forRoot({
            locale: englishLocaleCode,
          }),
        ],
        pipe,
        pipeName,
        template,
        value: 9876.54,
      });

      expect(harness.text).toBe(`${usDollar}9,876.54`);
    });

    it(`the Euro is the application's default currency code when the German locale is used`, () => {
      const euro = 'EUR';
      const germanLocaleCode = 'de';
      registerLocaleData(germanLocaleData);

      const harness = createPipeHarness({
        imports: [
          NgworkerLocaleModule.forRoot({
            locale: germanLocaleCode,
          }),
        ],
        pipe,
        pipeName,
        template,
        value: 9876.54,
      });

      expect(harness.text).toBe(`${euro}9,876.54`);
    });

    it(`the Danish Krone is the application's default currency code when the Danish locale is used`, () => {
      const danishKrone = 'DKK';
      const danishLocaleCode = 'da';
      registerLocaleData(danishLocaleData);

      const harness = createPipeHarness({
        imports: [
          NgworkerLocaleModule.forRoot({
            locale: danishLocaleCode,
          }),
        ],
        pipe,
        pipeName,
        template,
        value: 7654.32,
      });

      expect(harness.text).toBe(`${danishKrone}7,654.32`);
    });
  });
});
