As an example, we're going to create integration tests for the crisis center feature from [the Tour of Heroes routing tutorial](https://v16.angular.io/guide/router-tutorial-toh).

The following code snippet shows its routed feature, the `crisisCenterRoutes`:

```ts {21-24}
import { Routes } from '@angular/router';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';

export const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolverService,
            },
          },
          {
            path: '',
            component: CrisisCenterHomeComponent,
          },
        ],
      },
    ],
  },
];
```

Our feature tests are going to focus on the crisis detail form. Notice the route guard and route resolver added to the crisis detail route in the highlighted lines. These are going to be activated as part of our test cases.
