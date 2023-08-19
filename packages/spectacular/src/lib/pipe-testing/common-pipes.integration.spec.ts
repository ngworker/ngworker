import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  PercentPipe,
} from '@angular/common';
import { DEFAULT_CURRENCY_CODE, ValueProvider } from '@angular/core';
import {
  createPipeHarness,
  CreatePipeHarnessOptions,
} from './pipe-harness/create-pipe-harness';

describe('Common pipes', () => {
  describe(DecimalPipe.name, () => {
    function decimalPipeSetup() {
      const harness = createPipeHarness({
        parameters: ['1.1'],
        pipe: DecimalPipe,
        pipeName: 'number',
        value: 123456789,
      });

      return {
        harness,
      };
    }

    it('reads the rendered text', () => {
      const { harness } = decimalPipeSetup();

      expect(harness.text).toBe('123,456,789.0');
    });

    it('updates the value', () => {
      const { harness } = decimalPipeSetup();

      harness.value = 987654321;

      expect(harness.text).toBe('987,654,321.0');
    });

    it('updates the decimal representation', () => {
      const { harness } = decimalPipeSetup();

      harness.parameters = ['1.3'];

      expect(harness.text).toBe('123,456,789.000');
    });

    it('updates the template', () => {
      const { harness } = decimalPipeSetup();

      harness.template = `{{ value | number:'1.2' }}`;

      expect(harness.text).toBe('123,456,789.00');
    });
  });

  describe(CurrencyPipe.name, () => {
    function currencyPipeSetup({
      providers,
    }: Pick<CreatePipeHarnessOptions<CurrencyPipe>, 'providers'> = {}) {
      const harness = createPipeHarness({
        pipe: CurrencyPipe,
        pipeName: 'currency',
        providers,
        value: 1234.56,
      });

      return {
        harness,
      };
    }

    it('reads the rendered text', () => {
      const { harness } = currencyPipeSetup();

      expect(harness.text).toBe('$1,234.56');
    });

    it('updates the value', () => {
      const { harness } = currencyPipeSetup();

      harness.value = 6543.21;

      expect(harness.text).toBe('$6,543.21');
    });

    it('updates the currency code [dependency injection]', () => {
      const euroProvider: ValueProvider = {
        provide: DEFAULT_CURRENCY_CODE,
        useValue: 'EUR',
      };
      const { harness } = currencyPipeSetup({
        providers: [euroProvider],
      });

      expect(harness.text).toBe('€1,234.56');
    });

    it('updates the currency code [parameter]', () => {
      const { harness } = currencyPipeSetup();

      harness.parameters = ['EUR'];

      expect(harness.text).toBe('€1,234.56');
    });

    it('updates the currency indicator', () => {
      const { harness } = currencyPipeSetup();

      harness.parameters = ['USD', 'code'];

      expect(harness.text).toBe('USD1,234.56');
    });

    it('updates the decimal representation', () => {
      const { harness } = currencyPipeSetup();

      harness.parameters = ['USD', 'symbol', '1.3-3'];

      expect(harness.text).toBe('$1,234.560');
    });

    it('updates the template', () => {
      const { harness } = currencyPipeSetup();

      harness.template = `{{ value | currency:'EUR' }}`;

      expect(harness.text).toBe('€1,234.56');
    });
  });

  describe(PercentPipe.name, () => {
    function percentPipeSetup() {
      const harness = createPipeHarness({
        parameters: ['4.3-5'],
        pipe: PercentPipe,
        pipeName: 'percent',
        value: 1.3495,
      });

      return {
        harness,
      };
    }

    it('reads the rendered text', () => {
      const { harness } = percentPipeSetup();

      expect(harness.text).toBe('0,134.950%');
    });

    it('updates the value', () => {
      const { harness } = percentPipeSetup();

      harness.value = 5.9431;

      expect(harness.text).toBe('0,594.310%');
    });

    it('updates the decimal representation', () => {
      const { harness } = percentPipeSetup();

      harness.parameters = ['1.1-1'];

      expect(harness.text).toBe('135.0%');
    });

    it('updates the template', () => {
      const { harness } = percentPipeSetup();

      harness.template = `{{ value | percent:'1.1-3' }}`;

      expect(harness.text).toBe('134.95%');
    });
  });

  describe(DatePipe.name, () => {
    function datePipeSetup() {
      const harness = createPipeHarness({
        pipe: DatePipe,
        pipeName: 'date',
        template: `{{ value | date:'medium':'UTC' }}`,
        value: new Date('2021-07-07T17:00:00Z'),
      });

      return {
        harness,
      };
    }

    it('reads the rendered text', () => {
      const { harness } = datePipeSetup();

      expect(harness.text).toBe('Jul 7, 2021, 5:00:00 PM');
    });

    it('updates the value', () => {
      const { harness } = datePipeSetup();

      harness.value = new Date('2021-12-12T11:00:00Z');

      expect(harness.text).toBe('Dec 12, 2021, 11:00:00 AM');
    });

    it('updates the template', () => {
      const { harness } = datePipeSetup();

      harness.template = `{{ value | date:'medium':'PST' }}`;

      expect(harness.text).toBe('Jul 7, 2021, 9:00:00 AM');
    });
  });
});
