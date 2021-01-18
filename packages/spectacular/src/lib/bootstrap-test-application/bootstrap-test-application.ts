import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestRootComponent, TestRootScam, testRootTagName } from '../test-root';
import { BootstrapTestApplicationOptions } from './bootstrap-test-application-options';
import { bootstrapComponent } from './util-dom';

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
