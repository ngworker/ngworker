import { createPipeHarness } from '@ngworker/spectacular';

import { DummyPipe } from '../dummy.pipe';
import { createDefaultCurrencyCodeProvider } from './create-default-currency-code-provider';

describe('Currency', () => {
  const pipe = DummyPipe;
  const pipeName = 'currency';
  const template = `{{value | currency:null:'code'}}`;

  describe('Angular default', () => {
    /**
     * In Angular, the US Dollar is the default currency of the CurrencyPipe.
     *
     * In a future verison of Angular, the default currency will be based on the
     * application locale.
     */
    it(`the US Dollar is Angular's default currency code without a provider`, () => {
      const usDollar = 'USD';

      const harness = createPipeHarness({
        pipe,
        pipeName,
        template,
        value: 1234.56,
      });

      expect(harness.text).toBe(`${usDollar}1,234.56`);
    });
  });

  describe('User-defined', () => {
    it(`the Euro is the application's default currency code when passed`, () => {
      const euro = 'EUR';

      const harness = createPipeHarness({
        pipe,
        pipeName,
        providers: [createDefaultCurrencyCodeProvider(euro)],
        template,
        value: 6543.21,
      });

      expect(harness.text).toBe(`${euro}6,543.21`);
    });
  });
});
