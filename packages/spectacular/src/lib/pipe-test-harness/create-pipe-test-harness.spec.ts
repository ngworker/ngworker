import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  PercentPipe,
} from '@angular/common';

import { createPipeTestHarness } from './create-pipe-test-harness';
import { createCommonPipeTestHarness } from './test-util/create-common-pipe-test-harness';

describe(createPipeTestHarness.name, () => {
  describe(DecimalPipe.name, () => {
    const {
      getText,
      setTemplate,
      setValue,
      testCaseSetup,
    } = createCommonPipeTestHarness({
      template: `{{ value | number:'1.1' }}`,
      value: 123456789,
    });

    beforeEach(() => {
      testCaseSetup();
    });

    it('reads the rendered text', () => {
      expect(getText()).toBe('123,456,789.0');
    });

    it('updates the value', () => {
      setValue(987654321);

      expect(getText()).toBe('987,654,321.0');
    });

    it('updates the template', () => {
      setTemplate(`{{ value | number:'1.2' }}`);

      expect(getText()).toBe('123,456,789.00');
    });
  });

  describe(CurrencyPipe.name, () => {
    const {
      getText,
      setTemplate,
      setValue,
      testCaseSetup,
    } = createCommonPipeTestHarness({
      template: `{{ value | currency }}`,
      value: 1234.56,
    });

    beforeEach(() => {
      testCaseSetup();
    });

    it('reads the rendered text', () => {
      expect(getText()).toBe('$1,234.56');
    });

    it('updates the value', () => {
      setValue(6543.21);

      expect(getText()).toBe('$6,543.21');
    });

    it('updates the template', () => {
      setTemplate(`{{ value | currency:'EUR' }}`);

      expect(getText()).toBe('€1,234.56');
    });
  });

  describe(PercentPipe.name, () => {
    const {
      getText,
      setTemplate,
      setValue,
      testCaseSetup,
    } = createCommonPipeTestHarness({
      template: `{{ value | percent:'4.3-5' }}`,
      value: 1.3495,
    });

    beforeEach(() => {
      testCaseSetup();
    });

    it('reads the rendered text', () => {
      expect(getText()).toBe('0,134.950%');
    });

    it('updates the value', () => {
      setValue(5.9431);

      expect(getText()).toBe('0,594.310%');
    });

    it('updates the template', () => {
      setTemplate(`{{ value | percent:'1.1-3' }}`);

      expect(getText()).toBe('134.95%');
    });
  });

  describe(DatePipe.name, () => {
    const {
      getText,
      setTemplate,
      setValue,
      testCaseSetup,
    } = createCommonPipeTestHarness({
      template: `{{ value | date:'medium':'UTC' }}`,
      value: new Date('2021-07-07T17:00:00Z'),
    });

    beforeEach(() => {
      testCaseSetup();
    });

    it('reads the rendered text', () => {
      expect(getText()).toBe('Jul 7, 2021, 5:00:00 PM');
    });

    it('updates the value', () => {
      setValue(new Date('2021-12-12T11:00:00Z'));

      expect(getText()).toBe('Dec 12, 2021, 11:00:00 AM');
    });

    it('updates the template', () => {
      setTemplate(`{{ value | date:'medium':'PST' }}`);

      expect(getText()).toBe('Jul 7, 2021, 9:00:00 AM');
    });
  });
});
