import type { Observable } from 'rxjs';
import { createPipeHarness } from '../pipe-harness/create-pipe-harness';
import type { SpectacularPipeHarness } from '../pipe-harness/spectacular-pipe-harness';
import { PassthroughPipe, passthroughPipeName } from './passthrough.pipe';

export interface CreateCommonPipeHarnessOptions<TValue> {
  readonly template: string;
  readonly value: Observable<TValue> | TValue | null;
}

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
    pipeName: passthroughPipeName,
    value,
    template,
  });
}
