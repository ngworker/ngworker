import { Directive, Injectable, Pipe, PipeTransform } from '@angular/core';

import { getPipeAnnotation } from './get-pipe-annotation';

describe(getPipeAnnotation.name, () => {
  it('resolves the pipe annotation of a pipe without dependencies', () => {
    const expectedName = 'noop';
    @Pipe({
      name: expectedName,
    })
    class NoopPipe implements PipeTransform {
      transform() {
        // No-op
      }
    }

    const annotation = getPipeAnnotation(NoopPipe);

    expect(annotation).toEqual({
      name: expectedName,
      pure: true,
    });
  });

  it('resolves the pipe annotation of a pipe with dependencies', () => {
    @Injectable({
      providedIn: 'root',
    })
    class Bananas {}
    @Injectable({
      providedIn: 'root',
    })
    class Veggies {}
    const expectedName = 'deps';
    @Pipe({
      name: expectedName,
    })
    class DepsPipe implements PipeTransform {
      constructor(bananas: Bananas, veggies: Veggies) {}

      transform() {
        // No-op
      }
    }

    const annotation = getPipeAnnotation(DepsPipe);

    expect(annotation).toEqual({
      name: expectedName,
      pure: true,
    });
  });

  it('throws when a non-pipe is passed', () => {
    @Directive({})
    class NoopDirective {}

    expect(() => {
      // @ts-expect-error
      getPipeAnnotation(NoopDirective);
    }).toThrowError('No Pipe decorator');
  });
});
