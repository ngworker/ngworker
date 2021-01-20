import type { Observable } from 'rxjs';
export interface CreateCommonPipeTestHarnessOptions<TValue> {
  readonly template: string;
  readonly value: Observable<TValue> | TValue | null;
}
