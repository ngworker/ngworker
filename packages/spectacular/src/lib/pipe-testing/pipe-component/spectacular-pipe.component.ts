import { Component, Input } from '@angular/core';

import type { Observable } from 'rxjs';

@Component({
  selector: 'spectacular-pipe',
  template: '{{ value }}',
})
export class SpectacularPipeComponent<TValue> {
  @Input()
  value: TValue | Observable<TValue> | null = null;
}
