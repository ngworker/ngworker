import { createPipeHarness } from '../pipe-harness/create-pipe-harness';
import { SpectacularPipeHarness } from '../pipe-harness/spectacular-pipe-harness';
import { CreateCommonPipeHarnessOptions } from './create-common-pipe-harness-options';
import { PassthroughPipe } from './passthrough.pipe';

/**
 * Wraps `createPipeHarness` and allows the consumer to test the built-in
 * Angular pipes exported by `CommonModule`.
 */
export function createCommonPipeHarness<TValue>({
  template,
  value,
}: CreateCommonPipeHarnessOptions<TValue>): SpectacularPipeHarness<TValue> {
  return createPipeHarness({
    pipe: PassthroughPipe,
    value,
    template,
  });
}
