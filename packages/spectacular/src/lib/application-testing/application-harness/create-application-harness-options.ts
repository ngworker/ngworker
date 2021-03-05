import { NgModule } from '@angular/core';

/**
 * Application harness options.
 */
export type CreateApplicationHarnessOptions = Pick<
  NgModule,
  'imports' | 'providers'
>;
