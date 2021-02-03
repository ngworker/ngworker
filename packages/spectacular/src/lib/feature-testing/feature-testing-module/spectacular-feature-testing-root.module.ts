import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SpectacularAppScam } from '../../application-testing/app-component/spectacular-app.scam';

@NgModule({
  imports: [SpectacularAppScam],
})
export class SpectacularFeatureTestingRootModule {
  constructor(
    @Optional()
    @SkipSelf()
    maybeNgModuleFromParentInjector: SpectacularFeatureTestingRootModule
  ) {
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
