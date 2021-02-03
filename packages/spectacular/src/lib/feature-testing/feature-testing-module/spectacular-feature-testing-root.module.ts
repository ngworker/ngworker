import { NgModule, Optional, SkipSelf } from '@angular/core';

import { TestRootScam } from '../../test-root/test-root.scam';

@NgModule({
  imports: [TestRootScam],
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
