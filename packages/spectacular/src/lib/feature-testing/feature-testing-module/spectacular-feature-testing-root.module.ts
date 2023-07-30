import { inject, InjectFlags, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * Static dependencies for feature testing.
 *
 * Guards against registration in multiple Angular modules.
 *
 * NOTE! Only to be imported by `SpectacularFeatureTestingModule`.
 */
@NgModule({
  imports: [RouterTestingModule],
})
export class SpectacularFeatureTestingRootModule {
  constructor() {
    const maybeNgModuleFromParentInjector = inject(
      SpectacularFeatureTestingRootModule,
      InjectFlags.Optional | InjectFlags.SkipSelf
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
