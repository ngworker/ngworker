import { Component } from '@angular/core';

import type { Observable } from 'rxjs';

@Component({
  selector: 'spectacular-pipe',
  template: '{{ value }}',
})
export class SpectacularPipeComponent<TValue> {
  value: TValue | Observable<TValue> | null = null;
}
