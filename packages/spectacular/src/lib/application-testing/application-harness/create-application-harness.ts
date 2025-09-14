import type { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  SpectacularAppComponent,
  spectacularAppTag,
} from '../../shared/app-component/spectacular-app.component';
import { bootstrapComponent } from '../util-bootstrapping/bootstrap-component';
import { runPlatformInitializers } from '../util-bootstrapping/run-platform-initializers';
import { waitForApplicationInitializers } from '../util-bootstrapping/wait-for-application-initializers';
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
  options: CreateApplicationHarnessOptions = {}
): Promise<SpectacularApplicationHarness> {
  const { imports = [], providers = [] } = options;

  TestBed.configureTestingModule({
    imports: [RouterTestingModule, ...imports],
    providers: [...providers],
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
