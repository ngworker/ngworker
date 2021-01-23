import { NgModule, Type } from '@angular/core';

/**
 * Feature test harness options.
 */
export interface CreateFeatureTestHarnessOptions
  extends Pick<NgModule, 'imports' | 'providers'> {
  /**
   * The Angular feature module under test, for example `HeroesModule`.
   */
  readonly featureModule: Type<unknown>;
  /**
   * The path prefix used to load the routes of the specified Angular feature
   * module, for example `'heroes'`.
   */
  readonly featurePath: string;
}
