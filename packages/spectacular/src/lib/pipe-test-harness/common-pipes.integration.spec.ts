import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

import { SpectactularPipeFixture } from './spectacular-pipe-fixture';
import { SpectacularPipeTestbed } from './spectacular-pipe-testbed';
import { createCommonPipeOptions } from './test-util/create-common-pipe-options';

describe('Pipe testing API', () => {
  describe(DecimalPipe.name, () => {
    beforeEach(() => {
      fixture = SpectacularPipeTestbed.createPipe<number>(
        createCommonPipeOptions({
          template: `{{ value | number:'1.1' }}`,
          value: 123456789,
        })
      );
    });

    let fixture: SpectactularPipeFixture<number>;

    it('reads the rendered text', () => {
      expect(fixture.getText()).toBe('123,456,789.0');
    });

    it('updates the value', () => {
      fixture.setValue(987654321);

      expect(fixture.getText()).toBe('987,654,321.0');
    });

    it('updates the template', () => {
      fixture = SpectacularPipeTestbed.overrideTemplate(
        `{{ value | number:'1.2' }}`
      );

      expect(fixture.getText()).toBe('123,456,789.00');
    });
  });

  describe(CurrencyPipe.name, () => {
    beforeEach(() => {
      fixture = SpectacularPipeTestbed.createPipe<number>(
        createCommonPipeOptions({
          template: `{{ value | currency }}`,
          value: 1234.56,
        })
      );
    });

    let fixture: SpectactularPipeFixture<number>;

    it('reads the rendered text', () => {
      expect(fixture.getText()).toBe('$1,234.56');
    });

    it('updates the value', () => {
      fixture.setValue(6543.21);

      expect(fixture.getText()).toBe('$6,543.21');
    });

    it('updates the template', () => {
      fixture = SpectacularPipeTestbed.overrideTemplate(
        `{{ value | currency:'EUR' }}`
      );

      expect(fixture.getText()).toBe('€1,234.56');
    });
  });

  describe(PercentPipe.name, () => {
    beforeEach(() => {
      fixture = SpectacularPipeTestbed.createPipe<number>(
        createCommonPipeOptions({
          template: `{{ value | percent:'4.3-5' }}`,
          value: 1.3495,
        })
      );
    });

    let fixture: SpectactularPipeFixture<number>;

    it('reads the rendered text', () => {
      expect(fixture.getText()).toBe('0,134.950%');
    });

    it('updates the value', () => {
      fixture.setValue(5.9431);

      expect(fixture.getText()).toBe('0,594.310%');
    });

    it('updates the template', () => {
      fixture = SpectacularPipeTestbed.overrideTemplate(
        `{{ value | percent:'1.1-3' }}`
      );

      expect(fixture.getText()).toBe('134.95%');
    });
  });

  describe(DatePipe.name, () => {
    beforeEach(() => {
      fixture = SpectacularPipeTestbed.createPipe<Date>(
        createCommonPipeOptions({
          template: `{{ value | date:'medium':'UTC' }}`,
          value: new Date('2021-07-07T17:00:00Z'),
        })
      );
    });

    let fixture: SpectactularPipeFixture<Date>;

    it('reads the rendered text', () => {
      expect(fixture.getText()).toBe('Jul 7, 2021, 5:00:00 PM');
    });

    it('updates the value', () => {
      fixture.setValue(new Date('2021-12-12T11:00:00Z'));

      expect(fixture.getText()).toBe('Dec 12, 2021, 11:00:00 AM');
    });

    it('updates the template', () => {
      fixture = SpectacularPipeTestbed.overrideTemplate(
        `{{ value | date:'medium':'PST' }}`
      );

      expect(fixture.getText()).toBe('Jul 7, 2021, 9:00:00 AM');
    });
  });
});
