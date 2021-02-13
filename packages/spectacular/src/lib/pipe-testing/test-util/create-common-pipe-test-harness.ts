import { createPipeTestHarness } from '../create-pipe-test-harness';
import { PipeTestHarness } from '../pipe-test-harness';
import { CreateCommonPipeTestHarnessOptions } from './create-common-pipe-test-harness-options';
import { PassthroughPipe, passthroughPipeName } from './passthrough.pipe';

/**
 * Wraps `createPipeTestHarness` and allows the consumer to test the built-in
 * Angular pipes exported by `CommonModule`.
 */
export function createCommonPipeTestHarness<TValue>({
  template,
  value,
}: CreateCommonPipeTestHarnessOptions<TValue>): PipeTestHarness<TValue> {
  return createPipeTestHarness({
    pipeName: passthroughPipeName,
    pipeType: PassthroughPipe,
    value,
    template,
  });
}
