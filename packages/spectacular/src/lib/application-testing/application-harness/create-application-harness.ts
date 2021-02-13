import { NgZone } from '@angular/core';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpectacularAppComponent, spectacularAppTag } from '../app-component/spectacular-app.component';
import { SpectacularAppModule } from '../app-component/spectacular-app.module';
import { bootstrapComponent } from '../util-bootstrapping/bootstrap-component';
import { BootstrapSpectacularApplicationOptions } from './bootstrap-spectacular-application-options';
import { SpectacularApplicationHarness } from './spectacular-application-harness';

/**
 * Bootstrap a test application with the specified metadata. Useful to test
 * configuration Angular modules, bootstrap listeners, and application
 * initializers.
 *
 * @param testModuleMetadata Metadata registered with the Angular testing
 *   module.
 */
export function createApplicationHarness({
  imports = [],
  providers = [],
}: BootstrapSpectacularApplicationOptions): SpectacularApplicationHarness {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, ...imports, SpectacularAppModule],
    providers: [...providers],
  });

  TestBed.compileComponents();

  let autoDetectChangesArray = TestBed.inject(ComponentFixtureAutoDetect, [
    true,
  ]);

  if (!Array.isArray(autoDetectChangesArray)) {
    autoDetectChangesArray = [autoDetectChangesArray];
  }

  const [autoDetectChanges] = autoDetectChangesArray;

  const rootFixture = bootstrapComponent({
    autoDetectChanges,
    component: SpectacularAppComponent,
    ngZone: TestBed.inject(NgZone),
    tag: spectacularAppTag,
  });

  return {
    inject: TestBed.inject.bind(TestBed),
    get rootComponent() {
      return rootFixture.componentInstance;
    },
    rootFixture,
  };
}
