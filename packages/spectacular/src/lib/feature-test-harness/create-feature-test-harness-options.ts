import { Provider, Type } from '@angular/core';

/**
 * Feature test harness options.
 */
export interface CreateFeatureTestHarnessOptions {
  /**
   * The Angular feature module under test, for example `HeroesModule`.
   */
  readonly featureModule: Type<unknown>;
  /**
   * The path prefix used to load the routes of the specified Angular feature
   * module, for example `'heroes'`.
   */
  readonly featurePath: string;
  /**
   * Fake, mock, and stub providers, for example providing `FakeAlert` and
   * `HeroServiceStub`.
   */
  readonly providers?: Provider[] | Array<Provider | Provider[]>;
}
