import type { Observable } from 'rxjs';

export interface CreateCommonPipeHarnessOptions<TValue> {
  readonly template: string;
  readonly value: Observable<TValue> | TValue | null;
}
