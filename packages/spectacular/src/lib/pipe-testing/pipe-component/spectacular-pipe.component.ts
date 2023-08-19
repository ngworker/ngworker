import { Component, Input, PipeTransform } from '@angular/core';

type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never;

@Component({
  standalone: true,
  selector: 'spectacular-pipe',
  imports: [],
  template: '{{ value }}',
})
export class SpectacularPipeComponent<
  TPipe extends PipeTransform = PipeTransform,
  TValue extends Parameters<TPipe['transform']>[0] = Parameters<
    TPipe['transform']
  >[0],
  TParameters extends Tail<Parameters<TPipe['transform']>> = Tail<
    Parameters<TPipe['transform']>
  >
> {
  @Input()
  parameters?: TParameters;
  @Input()
  value!: TValue;
}
