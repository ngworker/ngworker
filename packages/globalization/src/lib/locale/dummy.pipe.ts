import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dummy',
})
export class DummyPipe implements PipeTransform {
  transform<T>(value: T): T {
    return value;
  }
}
