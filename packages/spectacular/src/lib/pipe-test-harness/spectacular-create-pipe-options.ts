import { PipeTransform, Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface SpectacularCreatePipeOptions<TPipeValue> {
  /**
   * The name of the Angular pipe-under-test, for example `camelize`.
   */
  readonly pipeName: string;
  /**
   * The type of the Angular pipe-under-test, for example `CamelizePipe`.
   */
  readonly pipeType: Type<PipeTransform>;
  /**
   * The template used to test the Angular pipe, for example
   * `'{{ value | camelize }}'`.
   *
   * NOTE! The `value` property is in context of the template.
   */
  readonly template?: string;
  /**
   * The initial value passed through the Angular pipe.
   */
  readonly value: Observable<TPipeValue> | TPipeValue | null;
}
