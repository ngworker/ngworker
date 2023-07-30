import { Pipe, PipeTransform } from '@angular/core';
import { createPipeHarness } from './pipe-harness/create-pipe-harness';

const capitalizePipeName = 'capitalize';

function setup({ value }: { readonly value: string }) {
  const harness = createPipeHarness({
    pipe: CapitalizePipe,
    pipeName: capitalizePipeName,
    value,
  });

  return {
    harness,
  };
}

@Pipe({
  name: capitalizePipeName,
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
  it('capitalizes every word of the text', () => {
    const { harness } = setup({ value: 'mr. potato head' });

    expect(harness.text).toBe('Mr. Potato Head');

    harness.value = 'ms. potato head';

    expect(harness.text).toBe('Ms. Potato Head');
  });
});
