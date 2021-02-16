import { NgModule } from '@angular/core';

export type CreateApplicationHarnessOptions = Pick<
  NgModule,
  'imports' | 'providers'
>;
