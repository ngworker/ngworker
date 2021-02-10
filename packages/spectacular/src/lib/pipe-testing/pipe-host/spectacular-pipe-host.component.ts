import { Component } from '@angular/core';

import type { Observable } from 'rxjs';

@Component({
  selector: 'spectacular-pipe-host',
  template: '{{ value }}',
})
export class SpectacularPipeHostComponent<TPipeValue> {
  value: TPipeValue | Observable<TPipeValue> | null = null;
}
