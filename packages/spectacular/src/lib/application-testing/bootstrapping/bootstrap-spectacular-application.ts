import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent, spectacularAppTagName } from '../root-level/spectacular-app.component';
import { SpectacularAppScam } from '../root-level/spectacular-app.scam';
import { BootstrapSpectacularApplicationOptions } from './bootstrap-spectacular-application-options';
import { bootstrapComponent } from './util-dom/bootstrap-component';

/**
 * Bootstrap a test application with the specified metadata. Useful to test
 * configuration Angular modules, bootstrap listeners, and application
 * initializers.
 *
 * @param testModuleMetadata Metadata registered with the Angular testing
 *   module.
 */
export function bootstrapSpectacularApplication({
  imports = [],
  providers = [],
}: BootstrapSpectacularApplicationOptions): void {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, ...imports, SpectacularAppScam],
    providers: [...providers],
  });
  bootstrapComponent(spectacularAppTagName, SpectacularAppComponent);
}
