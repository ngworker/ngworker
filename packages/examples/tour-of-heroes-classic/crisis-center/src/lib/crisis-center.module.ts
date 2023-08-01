import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, CrisisCenterRoutingModule],
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,
    CrisisCenterHomeComponent,
    CrisisDetailComponent,
  ],
})
export class CrisisCenterModule {}
