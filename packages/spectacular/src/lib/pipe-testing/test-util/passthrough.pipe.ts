import { Pipe, PipeTransform } from '@angular/core';

export const passthroughPipeName = 'testPassthrough';

@Pipe({
  name: passthroughPipeName,
})
export class PassthroughPipe<TValue> implements PipeTransform {
  transform(value: TValue | null): TValue | null {
    return value;
  }
}
