import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent, spectacularAppTag } from '../app-component/spectacular-app.component';
import { SpectacularAppModule } from '../app-component/spectacular-app.module';
import { bootstrapComponent } from '../util-dom/bootstrap-component';
import { BootstrapSpectacularApplicationOptions } from './bootstrap-spectacular-application-options';

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
    imports: [RouterTestingModule, ...imports, SpectacularAppModule],
    providers: [...providers],
  });

  TestBed.compileComponents();
  bootstrapComponent(spectacularAppTag, SpectacularAppComponent);
}
