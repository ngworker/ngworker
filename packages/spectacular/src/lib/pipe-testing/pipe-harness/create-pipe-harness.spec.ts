import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

import { createCommonPipeHarness } from '../test-util/create-common-pipe-harness';
import { createPipeHarness } from './create-pipe-harness';
import { SpectacularPipeHarness } from './spectacular-pipe-harness';

describe(createPipeHarness.name, () => {
  describe(DecimalPipe.name, () => {
    beforeEach(() => {
      harness = createCommonPipeHarness({
        template: `{{ value | number:'1.1' }}`,
        value: 123456789,
      });
    });

    let harness: SpectacularPipeHarness<number>;

    it('reads the rendered text', () => {
      expect(harness.getText()).toBe('123,456,789.0');
    });

    it('updates the value', () => {
      harness.setValue(987654321);

      expect(harness.getText()).toBe('987,654,321.0');
    });

    it('updates the template', () => {
      harness.setTemplate(`{{ value | number:'1.2' }}`);

      expect(harness.getText()).toBe('123,456,789.00');
    });
  });

  describe(CurrencyPipe.name, () => {
    beforeEach(() => {
      harness = createCommonPipeHarness({
        template: `{{ value | currency }}`,
        value: 1234.56,
      });
    });

    let harness: SpectacularPipeHarness<number>;

    it('reads the rendered text', () => {
      expect(harness.getText()).toBe('$1,234.56');
    });

    it('updates the value', () => {
      harness.setValue(6543.21);

      expect(harness.getText()).toBe('$6,543.21');
    });

    it('updates the template', () => {
      harness.setTemplate(`{{ value | currency:'EUR' }}`);

      expect(harness.getText()).toBe('€1,234.56');
    });
  });

  describe(PercentPipe.name, () => {
    beforeEach(() => {
      harness = createCommonPipeHarness({
        template: `{{ value | percent:'4.3-5' }}`,
        value: 1.3495,
      });
    });

    let harness: SpectacularPipeHarness<number>;

    it('reads the rendered text', () => {
      expect(harness.getText()).toBe('0,134.950%');
    });

    it('updates the value', () => {
      harness.setValue(5.9431);

      expect(harness.getText()).toBe('0,594.310%');
    });

    it('updates the template', () => {
      harness.setTemplate(`{{ value | percent:'1.1-3' }}`);

      expect(harness.getText()).toBe('134.95%');
    });
  });

  describe(DatePipe.name, () => {
    beforeEach(() => {
      harness = createCommonPipeHarness({
        template: `{{ value | date:'medium':'UTC' }}`,
        value: new Date('2021-07-07T17:00:00Z'),
      });
    });

    let harness: SpectacularPipeHarness<Date>;

    it('reads the rendered text', () => {
      expect(harness.getText()).toBe('Jul 7, 2021, 5:00:00 PM');
    });

    it('updates the value', () => {
      harness.setValue(new Date('2021-12-12T11:00:00Z'));

      expect(harness.getText()).toBe('Dec 12, 2021, 11:00:00 AM');
    });

    it('updates the template', () => {
      harness.setTemplate(`{{ value | date:'medium':'PST' }}`);

      expect(harness.getText()).toBe('Jul 7, 2021, 9:00:00 AM');
    });
  });
});
