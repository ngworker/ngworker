import { Pipe, PipeTransform } from '@angular/core';

import { createPipeHarness } from './pipe-harness/create-pipe-harness';
import { SpectacularPipeHarness } from './pipe-harness/spectacular-pipe-harness';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(/\s+/g)
      .map(word => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }
}

describe(CapitalizePipe.name, () => {
  beforeEach(() => {
    harness = createPipeHarness({
      pipe: CapitalizePipe,
      value: 'mr. potato head',
    });
  });

  let harness: SpectacularPipeHarness<string>;

  it('capitalizes every word of the text', () => {
    expect(harness.text).toBe('Mr. Potato Head');

    harness.value = 'ms. potato head';

    expect(harness.text).toBe('Ms. Potato Head');
  });
});
