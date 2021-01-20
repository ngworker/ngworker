import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestRootComponent, testRootTagName } from '../test-root/test-root.component';
import { TestRootScam } from '../test-root/test-root.scam';
import { BootstrapTestApplicationOptions } from './bootstrap-test-application-options';
import { bootstrapComponent } from './util-dom/bootstrap-component';

/**
 * Bootstrap a test application with the specified metadata. Useful to test
 * configuration Angular modules, bootstrap listeners, and application
 * initializers.
 *
 * @param testModuleMetadata Metadata registered with the Angular testing
 *   module.
 */
export function bootstrapTestApplication({
  imports = [],
  providers = [],
}: BootstrapTestApplicationOptions): void {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, ...imports, TestRootScam],
    providers: [...providers],
  });
  bootstrapComponent(testRootTagName, TestRootComponent);
}
