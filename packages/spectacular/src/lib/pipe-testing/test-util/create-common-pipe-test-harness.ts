import { createPipeTestHarness } from '../pipe-harness/create-pipe-test-harness';
import { SpectacularPipeHarness } from '../pipe-harness/spectacular-pipe-harness';
import { CreateCommonPipeTestHarnessOptions } from './create-common-pipe-test-harness-options';
import { PassthroughPipe, passthroughPipeName } from './passthrough.pipe';

/**
 * Wraps `createPipeTestHarness` and allows the consumer to test the built-in
 * Angular pipes exported by `CommonModule`.
 */
export function createCommonPipeTestHarness<TValue>({
  template,
  value,
}: CreateCommonPipeTestHarnessOptions<TValue>): SpectacularPipeHarness<TValue> {
  return createPipeTestHarness({
    pipeName: passthroughPipeName,
    pipeType: PassthroughPipe,
    value,
    template,
  });
}
