import type { Observable } from 'rxjs';

export interface CreateCommonPipeArguments<TPipeValue> {
  readonly template: string;
  readonly value: Observable<TPipeValue> | TPipeValue | null;
}
