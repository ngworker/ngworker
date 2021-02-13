import { createPipeHarness } from '../pipe-harness/create-pipe-test-harness';
import { SpectacularPipeHarness } from '../pipe-harness/spectacular-pipe-harness';
import { CreateCommonPipeHarnessOptions } from './create-common-pipe-harness-options';
import { PassthroughPipe, passthroughPipeName } from './passthrough.pipe';

/**
 * Wraps `createPipeTestHarness` and allows the consumer to test the built-in
 * Angular pipes exported by `CommonModule`.
 */
export function createCommonPipeHarness<TValue>({
  template,
  value,
}: CreateCommonPipeHarnessOptions<TValue>): SpectacularPipeHarness<TValue> {
  return createPipeHarness({
    pipeName: passthroughPipeName,
    pipeType: PassthroughPipe,
    value,
    template,
  });
}
