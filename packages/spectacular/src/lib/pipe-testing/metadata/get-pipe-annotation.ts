import { PipeResolver } from '@angular/compiler';
import {
  Pipe,
  PipeTransform,
  Type,
  ɵReflectionCapabilities as ReflectionCapabilities,
} from '@angular/core';

export function getPipeAnnotation(pipeType: Type<PipeTransform>): Pipe {
  // `PipeResolver` is using the `annotations` method only
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeResolver = new PipeResolver(new ReflectionCapabilities() as any);
  const pipeAnnotation = pipeResolver.resolve(pipeType, true);

  // `PipeResolver` throws if a pipe annotation cannot be resolved
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return pipeAnnotation!;
}
