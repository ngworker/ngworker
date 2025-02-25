import type { NgModule } from '@angular/core';
import { NgZone } from '@angular/core';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  SpectacularAppComponent,
  spectacularAppTag,
} from '../../shared/app-component/spectacular-app.component';
import { bootstrapComponent } from '../util-bootstrapping/bootstrap-component';
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

  let autoDetectChangesArray: boolean | readonly boolean[] = TestBed.inject(
    ComponentFixtureAutoDetect,
    true
  );

  if (!Array.isArray(autoDetectChangesArray)) {
    autoDetectChangesArray = [autoDetectChangesArray];
  }

  const [autoDetectChanges] = autoDetectChangesArray;

  const rootFixture = await bootstrapComponent({
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
