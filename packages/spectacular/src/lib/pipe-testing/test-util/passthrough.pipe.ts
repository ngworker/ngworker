import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPassthrough',
})
export class PassthroughPipe<TValue> implements PipeTransform {
  transform(value: TValue | null): TValue | null {
    return value;
  }
}
