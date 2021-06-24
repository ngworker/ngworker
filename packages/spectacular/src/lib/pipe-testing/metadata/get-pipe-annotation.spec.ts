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
      // Just here for testing dependencies
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      constructor(bananas: Bananas, veggies: Veggies) {
        // No-op
      }

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
      // @ts-expect-error Only pipes are allowed
      getPipeAnnotation(NoopDirective);
    }).toThrowError('No Pipe decorator');
  });
});
