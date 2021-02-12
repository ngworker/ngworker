import { NgModule } from '@angular/core';

import { SpectacularAppComponent } from './spectacular-app.component';
import { SpectacularAppScam } from './spectacular-app.scam';

/**
 * Spectacular root module. Bootstraps `SpectacularAppComponent`.
 */
@NgModule({
  bootstrap: [SpectacularAppComponent],
  imports: [SpectacularAppScam],
})
export class SpectacularAppModule {}
