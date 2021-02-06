import { TestBed } from '@angular/core/testing';
import { createUserInteractions, UserInteractions } from '@internal/test-util';
import { CrisisCenterModule, crisisCenterPath, DialogService, FakeDialogService } from '@tour-of-heroes/crisis-center';

import { SpectacularFeatureRouter } from './navigation/spectacular-feature-router';
import { SpectacularFeatureTestbed } from './testbed/spectacular-feature-testbed';

describe('Tour of Heroes: Crisis center integration tests', () => {
  function expectToBeAtTheCrisisCenterHome() {
    expect(ui.getText('p')).toBe('Welcome to the Crisis Center');
  }

  beforeEach(() => {
    const rootFixture = SpectacularFeatureTestbed.createFeature({
      featureModule: CrisisCenterModule,
      featurePath: crisisCenterPath,
      providers: [
        // { provide: CrisisService, useClass: FakeCrisisService },
        { provide: DialogService, useClass: FakeDialogService },
      ],
    });
    detectChanges = () => rootFixture.detectChanges();
    fakeDialog = TestBed.inject(DialogService) as FakeDialogService;
    featureRouter = TestBed.inject(SpectacularFeatureRouter);
    ui = createUserInteractions(rootFixture);
  });

  let detectChanges: () => void;
  let fakeDialog: FakeDialogService;
  let featureRouter: SpectacularFeatureRouter;
  // let rootFixture: ComponentFixture<SpectacularAppComponent>;
  let ui: UserInteractions;

  it('starts at the crisis center home', () => {
    featureRouter.navigateByUrl('');

    expectToBeAtTheCrisisCenterHome();
  });
});
