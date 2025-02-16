import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

export const crisisDetailResolver: ResolveFn<Crisis> = route => {
  const cs = inject(CrisisService);
  const router = inject(Router);

  const id = route.paramMap.get('id') ?? '-1';

  return cs.getCrisis(id).pipe(
    take(1),
    mergeMap(crisis => {
      if (crisis) {
        return of(crisis);
      } else {
        // id not found
        router.navigate(['/crisis-center']);
        return EMPTY;
      }
    })
  );
};
