import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

@Injectable({
  providedIn: 'root',
})
export class CrisisDetailResolverService implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Crisis> | Observable<never> {
    const id = route.paramMap.get('id') ?? '-1';

    return this.cs.getCrisis(id).pipe(
      take(1),
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);
        } else {
          // id not found
          this.router.navigate(['/crisis-center']);
          return EMPTY;
        }
      })
    );
  }
}
