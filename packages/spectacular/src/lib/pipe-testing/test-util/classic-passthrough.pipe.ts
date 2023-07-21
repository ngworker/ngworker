import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

export const classicPassthroughPipeName = 'testClassicPassthrough';

@Pipe({
  name: classicPassthroughPipeName,
})
export class ClassicPassthroughPipe<TValue> implements PipeTransform {
  transform(value: TValue | null): TValue | null {
    return value;
  }
}
