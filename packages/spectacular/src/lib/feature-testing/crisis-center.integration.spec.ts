import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createUserInteractions, UserInteractions } from '@internal/test-util';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
  DialogService,
  FakeDialogService,
} from '@tour-of-heroes/crisis-center';

import { SpectacularFeatureLocation } from './navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from './navigation/spectacular-feature-router';
import { SpectacularFeatureTestbed } from './testbed/spectacular-feature-testbed';

describe('Tour of Heroes: Crisis center integration tests', () => {
  function expectCrisisToBeSelected(crisis: Crisis) {
    expect(ui.getText('.selected')).toBe(`${crisis.id}${crisis.name}`);
  }

  function expectToBeAtTheCrisisCenterHome() {
    expect(ui.getText('p')).toBe('Welcome to the Crisis Center');
  }

  function expectToBeEditing(crisis: Crisis): void {
    expect(featureLocation.path()).toMatch(
      new RegExp(`^${crisis.id}$|^${crisis.id}.+|^~/${crisis.id}$`)
    );
    expect(ui.getText('h3')).toContain(crisis.name);
  }

  beforeEach(() => {
    const rootFixture = SpectacularFeatureTestbed.createFeature({
      featureModule: CrisisCenterModule,
      featurePath: crisisCenterPath,
      providers: [{ provide: DialogService, useClass: FakeDialogService }],
    });
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
  let fakeDialog: FakeDialogService;
  let featureLocation: SpectacularFeatureLocation;
  let featureRouter: SpectacularFeatureRouter;
  const newCrisisName = 'Coral reefs are dying';
  let ui: UserInteractions;
  let unknownCrisis: Crisis;

  it('starts at the crisis center home', () => {
    featureRouter.navigateByUrl('~/');

    expectToBeAtTheCrisisCenterHome();
  });

  describe('Crisis detail', () => {
    it('shows crisis detail when a valid ID is in the URL', async () => {
      await featureRouter.navigate(['~', aCrisis.id]);
      await ui.advance();

      expectToBeEditing(aCrisis);
    });

    it('navigates to the crisis center home when an invalid ID is in the URL', async () => {
      const angularRouter = TestBed.inject(Router);
      const urlTree = angularRouter.createUrlTree(['~', unknownCrisis.id]);

      const didNavigationSucceed = await featureRouter.navigateByUrl(urlTree);

      expect(didNavigationSucceed).toBe(false);
      expectToBeAtTheCrisisCenterHome();
    });

    describe('Editing crisis name', () => {
      beforeEach(async () => {
        await featureRouter.navigateByUrl(`~/${aCrisis.id}`);
        await ui.advance();

        ui.enterText(newCrisisName, 'input');
      });

      describe('Canceling change', () => {
        beforeEach(async () => {
          ui.clickButton('Cancel');
          await ui.advance();
        });

        describe('When discarding unsaved changes is confirmed', () => {
          beforeEach(async () => {
            fakeDialog.clickOk();
            await ui.advance();
          });

          it('navigates to the crisis center home with the crisis selected ', () => {
            expectToBeAtTheCrisisCenterHome();
            expectCrisisToBeSelected(aCrisis);
          });

          it('adds matrix parameters', () => {
            expect(featureLocation.path()).toMatch(
              new RegExp(`;id=${aCrisis.id};foo=foo`)
            );
          });
        });

        it('keeps the change and stays on the crisis detail when discarding unsaved changes is canceled', async () => {
          fakeDialog.clickCancel();
          await ui.advance();

          expectToBeEditing({ id: aCrisis.id, name: newCrisisName });
        });
      });

      describe('Saving change', () => {
        it('navigates to the crisis center home with the crisis selected', async () => {
          ui.clickButton('Save');
          await ui.advance();

          expectToBeAtTheCrisisCenterHome();
          expectCrisisToBeSelected({ id: aCrisis.id, name: newCrisisName });
        });
      });
    });
  });
});
