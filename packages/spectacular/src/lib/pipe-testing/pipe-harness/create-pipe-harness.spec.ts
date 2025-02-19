import { Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  ClassicPassthroughPipe,
  classicPassthroughPipeName,
} from '../test-util/classic-passthrough.pipe';
import {
  StandalonePassthroughPipe,
  standalonePassthroughPipeName,
} from './../test-util/standalone-passthrough.pipe';
import { createPipeHarness } from './create-pipe-harness';

@Injectable()
class PipeService {}

@NgModule({
  providers: [PipeService],
})
class PipeServiceModule {}

describe(createPipeHarness.name, () => {
  describe('[Classic]', () => {
    describe('Configuration', () => {
      it('adds the specified imports', () => {
        const harness = createPipeHarness({
          imports: [PipeServiceModule],
          pipe: ClassicPassthroughPipe,
          pipeName: classicPassthroughPipeName,
          value: null,
        });

        const jobService = harness.inject(PipeService);
        expect(jobService).toBeInstanceOf(PipeService);
      });

      it('adds the specified providers', () => {
        const harness = createPipeHarness({
          providers: [PipeService],
          pipe: ClassicPassthroughPipe,
          pipeName: classicPassthroughPipeName,
          value: null,
        });

        const pipeService = harness.inject(PipeService);
        expect(pipeService).toBeInstanceOf(PipeService);
      });

      it('[Classic] adds the specified classic declarables', () => {
        @Pipe({
          name: 'testRepeat',
        })
        class ClassicRepeatPipe implements PipeTransform {
          transform(value: string, times: number): string {
            return value.repeat(times);
          }
        }

        const harness = createPipeHarness({
          declarations: [ClassicRepeatPipe],
          pipe: ClassicPassthroughPipe,
          pipeName: classicPassthroughPipeName,
          template: `{{ value | ${classicPassthroughPipeName} | testRepeat:4 }}`,
          value: 'Boom',
        });

        expect(harness.text).toBe('BoomBoomBoomBoom');
      });

      it('[Classic] adds the specified standalone declarables', () => {
        @Pipe({
          standalone: true,
          name: 'testRepeat',
        })
        class StandaloneRepeatPipe implements PipeTransform {
          transform(value: string, times: number): string {
            return value.repeat(times);
          }
        }

        const harness = createPipeHarness({
          imports: [StandaloneRepeatPipe],
          pipe: ClassicPassthroughPipe,
          pipeName: classicPassthroughPipeName,
          template: `{{ value | ${classicPassthroughPipeName} | testRepeat:3 }}`,
          value: 'Boom',
        });

        expect(harness.text).toBe('BoomBoomBoom');
      });
    });
  });

  describe('[Standalone]', () => {
    describe('Configuration', () => {
      it('adds the specified imports', () => {
        const harness = createPipeHarness({
          imports: [PipeServiceModule],
          pipe: StandalonePassthroughPipe,
          pipeName: standalonePassthroughPipeName,
          value: null,
        });

        const pipeService = harness.inject(PipeService);
        expect(pipeService).toBeInstanceOf(PipeService);
      });

      it('adds the specified providers', () => {
        const harness = createPipeHarness({
          providers: [PipeService],
          pipe: StandalonePassthroughPipe,
          pipeName: standalonePassthroughPipeName,
          value: null,
        });

        const jobService = harness.inject(PipeService);
        expect(jobService).toBeInstanceOf(PipeService);
      });

      it('adds the specified classic declarables', () => {
        @Pipe({
          name: 'testClassicRepeat',
        })
        class ClassicRepeatPipe implements PipeTransform {
          transform(value: string, times: number): string {
            return value.repeat(times);
          }
        }

        const harness = createPipeHarness({
          declarations: [ClassicRepeatPipe],
          pipe: StandalonePassthroughPipe,
          pipeName: standalonePassthroughPipeName,
          template: `{{ value | ${standalonePassthroughPipeName} | testClassicRepeat:4 }}`,
          value: 'Boom',
        });

        expect(harness.text).toBe('BoomBoomBoomBoom');
      });

      it('adds the specified standalone declarables', () => {
        @Pipe({
          standalone: true,
          name: 'testStandaloneRepeat',
        })
        class StandaloneRepeatPipe implements PipeTransform {
          transform(value: string, times: number): string {
            return value.repeat(times);
          }
        }

        const harness = createPipeHarness({
          imports: [StandaloneRepeatPipe],
          pipe: StandalonePassthroughPipe,
          pipeName: standalonePassthroughPipeName,
          template: `{{ value | ${standalonePassthroughPipeName} | testStandaloneRepeat:3 }}`,
          value: 'Boom',
        });

        expect(harness.text).toBe('BoomBoomBoom');
      });
    });
  });
});
