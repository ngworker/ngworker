import { NgModule } from '@angular/core';
import { ExtraOptions, Routes } from '@angular/router';

/**
 * Feature harness options.
 */
export interface CreateFeatureHarnessOptions
  extends Pick<NgModule, 'imports' | 'providers'> {
  /**
   * The route path used to load the routes of the specified Angular feature
   * module, for example `'heroes'`.
   */
  readonly featurePath: string;
  /**
   * Optional Angular `Router` options.
   */
  readonly routerOptions?: ExtraOptions;
  /**
   * One or more feature routes to load.
   *
   * NOTE! It is unnecessary to lazy-load feature modules in tests, so we can
   * statically return an Angular module from the `loadChildren` callback.
   *
   * @example
   * ```typescript
   * [{ path: 'heroes', loadChildren: () => HeroesModule }]
   * ```
   */
  readonly routes: Routes;
}
