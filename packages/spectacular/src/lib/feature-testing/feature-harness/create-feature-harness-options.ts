import { NgModule, Type } from '@angular/core';
import { ExtraOptions } from '@angular/router';

/**
 * Feature test harness options.
 */
export interface CreateFeatureHarnessOptions<TFeatureModule>
  extends Pick<NgModule, 'imports' | 'providers'> {
  /**
   * The Angular feature module under test, for example `HeroesModule`.
   */
  readonly featureModule: Type<TFeatureModule>;
  /**
   * The route path used to load the routes of the specified Angular feature
   * module, for example `'heroes'`.
   */
  readonly featurePath: string;
  /**
   * Optional Angular `Router` options.
   */
  readonly routerOptions?: ExtraOptions;
}
