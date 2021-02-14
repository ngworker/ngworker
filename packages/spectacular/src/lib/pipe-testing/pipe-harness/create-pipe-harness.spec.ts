import { Injectable, NgModule } from '@angular/core';

import { PassthroughPipe, passthroughPipeName } from '../test-util/passthrough.pipe';
import { createPipeHarness } from './create-pipe-harness';

describe(createPipeHarness.name, () => {
  describe('Configuration', () => {
    @Injectable()
    class JobService {}

    @NgModule({
      providers: [JobService],
    })
    class JobServiceModule {}

    it('adds the specified imports', () => {
      const harness = createPipeHarness({
        imports: [JobServiceModule],
        pipeType: PassthroughPipe,
        pipeName: passthroughPipeName,
        value: null,
      });

      const jobService = harness.inject(JobService);
      expect(jobService).toBeInstanceOf(JobService);
    });

    it('adds the specified providers', () => {
      const harness = createPipeHarness({
        providers: [JobService],
        pipeType: PassthroughPipe,
        pipeName: passthroughPipeName,
        value: null,
      });

      const jobService = harness.inject(JobService);
      expect(jobService).toBeInstanceOf(JobService);
    });
  });
});
