import { Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';

import { PassthroughPipe } from '../test-util/passthrough.pipe';
import { createPipeHarness } from './create-pipe-harness';

describe(createPipeHarness.name, () => {
  describe('Configuration', () => {
    @Injectable()
    class PipeService {}

    @NgModule({
      providers: [PipeService],
    })
    class PipeServiceModule {}

    it('adds the specified imports', () => {
      const harness = createPipeHarness({
        imports: [PipeServiceModule],
        pipe: PassthroughPipe,
        value: null,
      });

      const jobService = harness.inject(PipeService);
      expect(jobService).toBeInstanceOf(PipeService);
    });

    it('adds the specified providers', () => {
      const harness = createPipeHarness({
        providers: [PipeService],
        pipe: PassthroughPipe,
        value: null,
      });

      const jobService = harness.inject(PipeService);
      expect(jobService).toBeInstanceOf(PipeService);
    });

    it('adds the specified declarables', () => {
      @Pipe({
        name: 'testRepeat',
      })
      class RepeatPipe implements PipeTransform {
        transform(value: string, times: number): string {
          return value.repeat(times);
        }
      }

      const harness = createPipeHarness({
        declarations: [RepeatPipe],
        pipe: PassthroughPipe,
        template: `{{ value | testPassthrough | testRepeat:4 }}`,
        value: 'Boom',
      });

      expect(harness.text).toBe('BoomBoomBoomBoom');
    });
  });
});
