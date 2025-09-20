import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Observable } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'spectacular-pipe',
  imports: [],
  template: '{{ value }}',
})
export class SpectacularPipeComponent<TValue> {
  @Input()
  value: TValue | Observable<TValue> | null = null;
}
