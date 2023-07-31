import { inject, NgModule } from '@angular/core';

/**
 * Guards against registration in multiple Angular modules.
 *
 * NOTE! Only to be imported by `SpectacularFeatureTestingModule`.
 */
@NgModule()
export class SpectacularFeatureTestingRootModule {
  constructor() {
    const maybeNgModuleFromParentInjector = inject(
      SpectacularFeatureTestingRootModule,
      {
        optional: true,
        skipSelf: true,
      }
    );

    if (maybeNgModuleFromParentInjector) {
      throw new Error(
        'SpectacularFeatureTestingModule.withFeature is registered in ' +
          'multiple injectors. It seems like you have registered it in an ' +
          'application. This is a testing Angular module which should only ' +
          'be used with the Angular TestBed.'
      );
    }
  }
}
