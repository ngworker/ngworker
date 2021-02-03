import { NgModule } from '@angular/core';

import { SpectacularAppComponent } from './spectacular-root.component';
import { SpectacularAppScam } from './spectacular-root.scam';

@NgModule({
  bootstrap: [SpectacularAppComponent],
  imports: [SpectacularAppScam],
})
export class SpectacularAppModule {}
