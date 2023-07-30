import { Pipe, PipeTransform } from '@angular/core';
import { createPipeHarness } from './pipe-harness/create-pipe-harness';

function createCapitalizePipe({
  standalone = true,
}: {
  readonly name: string;
  readonly standalone?: boolean;
}) {
  @Pipe({
    standalone,
    name: capitalizePipeName,
  })
  class CapitalizePipe implements PipeTransform {
    transform(value: string): string {
      return value
        .split(/\s+/g)
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join(' ');
    }
  }

  return CapitalizePipe;
}

const capitalizePipeName = 'capitalize';

describe('CapitalizePipe', () => {
  it('[Classic] capitalizes every word of the text', () => {
    const harness = createPipeHarness({
      pipe: createCapitalizePipe({
        standalone: false,
        name: capitalizePipeName,
      }),
      pipeName: capitalizePipeName,
      value: 'mr. potato head',
    });

    expect(harness.text).toBe('Mr. Potato Head');

    harness.value = 'ms. potato head';

    expect(harness.text).toBe('Ms. Potato Head');
  });

  it('[Standalone] capitalizes every word of the text', () => {
    const harness = createPipeHarness({
      pipe: createCapitalizePipe({
        standalone: true,
        name: capitalizePipeName,
      }),
      pipeName: capitalizePipeName,
      value: 'mr. potato head',
    });

    expect(harness.text).toBe('Mr. Potato Head');

    harness.value = 'ms. potato head';

    expect(harness.text).toBe('Ms. Potato Head');
  });
});
