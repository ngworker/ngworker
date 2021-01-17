import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestRootComponent, TestRootScam, testRootTagName } from '../test-root';
import { bootstrapComponent } from './util-dom';

/**
 * Bootstrap a test application with the specified metadata. Useful to test
 * configuration Angular modules, bootstrap listeners, and application
 * initializers.
 *
 * @param testModuleMetadata Metadata registered with the Angular testing
 *   module.
 */
export function bootstrapTestApplication(
  testModuleMetadata: TestModuleMetadata
): void {
  TestBed.configureTestingModule({
    ...testModuleMetadata,
    imports: [
      RouterTestingModule,
      ...(testModuleMetadata.imports ?? []),
      TestRootScam,
    ],
  });
  bootstrapComponent(testRootTagName, TestRootComponent);
}
