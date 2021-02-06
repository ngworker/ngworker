import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css'],
})
export class CrisisListComponent {
  crises$: Observable<Crisis[]> = this.route.paramMap.pipe(
    switchMap(params => {
      this.selectedId = +(params.get('id') ?? '-1');
      return this.service.getCrises();
    })
  );
  selectedId = -1;

  constructor(private service: CrisisService, private route: ActivatedRoute) {}
}
