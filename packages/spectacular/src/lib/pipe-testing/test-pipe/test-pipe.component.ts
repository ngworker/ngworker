import { Component } from '@angular/core';

import type { Observable } from 'rxjs';

@Component({
  selector: 'spectacular-test-pipe',
  template: '{{ value }}',
})
export class TestPipeComponent<TValue> {
  value: TValue | Observable<TValue> | null = null;
}
