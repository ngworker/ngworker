import type { Observable } from 'rxjs';
import { createPipeHarness } from '../pipe-harness/create-pipe-harness';
import type { SpectacularPipeHarness } from '../pipe-harness/spectacular-pipe-harness';
import {
  StandalonePassthroughPipe,
  standalonePassthroughPipeName,
} from './standalone-passthrough.pipe';

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
    pipe: StandalonePassthroughPipe,
    pipeName: standalonePassthroughPipeName,
    value,
    template,
  });
}
