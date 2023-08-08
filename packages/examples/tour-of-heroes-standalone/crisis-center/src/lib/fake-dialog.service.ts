import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { DialogService } from './dialog.service';

@Injectable()
export class FakeDialogService implements DialogService {
  private userConfirms = new Subject<boolean>();

  clickCancel(): void {
    this.userConfirms.next(false);
  }

  clickOk(): void {
    this.userConfirms.next(true);
  }

  confirm(): Observable<boolean> {
    return this.userConfirms.pipe(take(1));
  }
}
