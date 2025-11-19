import type { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  SpectacularAppComponent,
  spectacularAppTag,
} from '../../shared/app-component/spectacular-app.component';
import { bootstrapComponent } from '../util-bootstrapping/bootstrap-component';
import { runPlatformInitializers } from '../util-bootstrapping/run-platform-initializers';
import { waitForApplicationInitializers } from '../util-bootstrapping/wait-for-application-initializers';
import { wrapInitializerProviders } from '../util-providers/wrap-initializers';
import { SpectacularApplicationHarness } from './spectacular-application-harness';

/**
 * Application harness options.
 */
export type CreateApplicationHarnessOptions = Pick<
  NgModule,
  'imports' | 'providers'
>;

/**
 * Bootstrap a test application with the specified metadata. Useful to test
 * configuration Angular modules, bootstrap listeners, and application
 * initializers.
 */
export async function createApplicationHarness(
  options: CreateApplicationHarnessOptions = {},
): Promise<SpectacularApplicationHarness> {
  const { imports = [], providers = [] } = options;

  // Wrap initializer providers to support inject() in callbacks
  const wrappedProviders = wrapInitializerProviders(providers);

  TestBed.configureTestingModule({
    imports: [...imports],
    providers: [...wrappedProviders],
  });

  TestBed.compileComponents();

  runPlatformInitializers();
  await waitForApplicationInitializers();

  const rootFixture = await bootstrapComponent({
    component: SpectacularAppComponent,
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
