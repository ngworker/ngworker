import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

export const standalonePassthroughPipeName = 'testStandalonePassthrough';

@Pipe({
  standalone: true,
  name: standalonePassthroughPipeName,
})
export class StandalonePassthroughPipe<TValue> implements PipeTransform {
  transform(value: TValue | null): TValue | null {
    return value;
  }
}
