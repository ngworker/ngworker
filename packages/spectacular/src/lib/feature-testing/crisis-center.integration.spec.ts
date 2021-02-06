import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createUserInteractions, UserInteractions } from '@internal/test-util';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
  DialogService,
  FakeDialogService,
} from '@tour-of-heroes/crisis-center';

import { SpectacularAppComponent } from '../application-testing/app-component/spectacular-app.component';
import { SpectacularFeatureLocation } from './navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from './navigation/spectacular-feature-router';
import { SpectacularFeatureTestbed } from './testbed/spectacular-feature-testbed';

describe('Tour of Heroes: Crisis center integration tests', () => {
  function expectToBeAtTheCrisisCenterHome() {
    expect(ui.getText('p')).toBe('Welcome to the Crisis Center');
  }

  function expectToBeEditing(crisis: Crisis): void {
    expect(featureLocation.path()).toMatch(
      new RegExp(`^${crisis.id}\$|^${crisis.id}.+|\/${crisis.id}\$`)
    );
    expect(ui.getText('h3')).toContain(crisis.name);
  }

  beforeEach(() => {
    rootFixture = SpectacularFeatureTestbed.createFeature({
      featureModule: CrisisCenterModule,
      featurePath: crisisCenterPath,
      providers: [
        // { provide: CrisisService, useClass: FakeCrisisService },
        { provide: DialogService, useClass: FakeDialogService },
      ],
    });
    detectChanges = () => rootFixture.detectChanges();
    fakeDialog = TestBed.inject(DialogService) as FakeDialogService;
    featureLocation = TestBed.inject(SpectacularFeatureLocation);
    featureRouter = TestBed.inject(SpectacularFeatureRouter);
    ui = createUserInteractions(rootFixture);
    unknownCrisis = {
      id: Number.MAX_SAFE_INTEGER,
      name: 'Unknown crisis',
    };
    const crisisService = TestBed.inject(CrisisService);
    [aCrisis] = crisisService.getCrises().value;
  });

  let aCrisis: Crisis;
  let detectChanges: () => void;
  let fakeDialog: FakeDialogService;
  let featureLocation: SpectacularFeatureLocation;
  let featureRouter: SpectacularFeatureRouter;
  let rootFixture: ComponentFixture<SpectacularAppComponent>;
  let ui: UserInteractions;
  let unknownCrisis: Crisis;

  it('starts at the crisis center home', () => {
    featureRouter.navigateByUrl('');

    expectToBeAtTheCrisisCenterHome();
  });

  describe('Crisis detail', () => {
    it('shows crisis detail when a valid ID is in the URL', async () => {
      featureRouter.navigateByUrl(aCrisis.id.toString());
      await ui.advance();

      expectToBeEditing(aCrisis);
    });

    it('navigates to the crisis center home when an invalid ID is in the URL', async () => {
      const didNavigationSucceed = await featureRouter.navigateByUrl(
        unknownCrisis.id.toString()
      );

      expect(didNavigationSucceed).toBe(false);
      expectToBeAtTheCrisisCenterHome();
    });

    // describe('Editing crisis name', () => {
    //   beforeEach(fakeAsync(() => {
    //     navigateByUrl(aCrisis.id.toString());
    //     advance();

    //     enterTextInElement('input', newCrisisName);
    //   }));

    //   describe('Canceling change', () => {
    //     beforeEach(fakeAsync(() => {
    //       clickButton('Cancel');
    //       advance();
    //     }));

    //     describe('When discarding unsaved changes is confirmed', () => {
    //       beforeEach(fakeAsync(() => {
    //         fakeDialog.clickOk();
    //         advance();
    //       }));

    //       it('navigates to the crisis center home with the crisis selected ', () => {
    //         expectToBeAtTheCrisisCenterHome();
    //         expectCrisisToBeSelected(aCrisis);
    //       });

    //       it('adds matrix parameters', () => {
    //         expect(getPath()).toMatch(new RegExp(`;id=${aCrisis.id};foo=foo`));
    //       });
    //     });

    //     it('keeps the change and stays on the crisis detail when discarding unsaved changes is canceled', fakeAsync(() => {
    //       fakeDialog.clickCancel();
    //       advance();

    //       expectToBeEditing({ id: aCrisis.id, name: newCrisisName });
    //     }));
    //   });

    //   describe('Saving change', () => {
    //     it('navigates to the crisis center home with the crisis selected', fakeAsync(() => {
    //       clickButton('Save');
    //       advance();

    //       expectToBeAtTheCrisisCenterHome();
    //       expectCrisisToBeSelected({ id: aCrisis.id, name: newCrisisName });
    //     }));
    //   });
    // });
  });
});
