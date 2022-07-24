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
import { createFeatureHarness } from './feature-harness/create-feature-harness';
import { SpectacularFeatureHarness } from './feature-harness/spectacular-feature-harness';

describe('[Spectacular] Tour of Heroes: Crisis center', () => {
  function expectCrisisToBeSelected(crisis: Crisis) {
    expect(ui.getText('.selected')).toBe(`${crisis.id}${crisis.name}`);
  }

  function expectToBeAtTheCrisisCenterHome() {
    expect(ui.getText('p')).toBe('Welcome to the Crisis Center');
  }

  function expectToBeEditing(crisis: Crisis): void {
    expect(harness.location.path()).toBe(`~/${crisis.id}`);
    expect(ui.getText('h3')).toContain(crisis.name);
  }

  beforeEach(() => {
    harness = createFeatureHarness({
      featureModule: CrisisCenterModule,
      featurePath: crisisCenterPath,
      providers: [{ provide: DialogService, useClass: FakeDialogService }],
    });
    fakeDialog = harness.inject(DialogService) as FakeDialogService;
    ui = createUserInteractions(harness.rootFixture);
    unknownCrisis = {
      id: Number.MAX_SAFE_INTEGER,
      name: 'Unknown crisis',
    };
    const crisisService = harness.inject(CrisisService);
    [aCrisis] = crisisService.getCrises().value;
  });

  let aCrisis: Crisis;
  let fakeDialog: FakeDialogService;
  let harness: SpectacularFeatureHarness;
  const newCrisisName = 'Coral reefs are dying';
  let ui: UserInteractions;
  let unknownCrisis: Crisis;

  it('starts at the crisis center home', () => {
    harness.router.navigateByUrl('~/');

    expectToBeAtTheCrisisCenterHome();
  });

  describe('Crisis detail', () => {
    it('shows crisis detail when a valid ID is in the URL', async () => {
      await harness.router.navigate(['~', aCrisis.id]);

      expectToBeEditing(aCrisis);
    });

    it('navigates to the crisis center home when an invalid ID is in the URL', async () => {
      const angularRouter = harness.inject(Router);
      const urlTree = angularRouter.createUrlTree(['~', unknownCrisis.id]);

      const didNavigationSucceed = await harness.router.navigateByUrl(urlTree);

      expect(didNavigationSucceed).toBe(false);
      expectToBeAtTheCrisisCenterHome();
    });

    describe('Editing crisis name', () => {
      beforeEach(async () => {
        await harness.router.navigateByUrl(`~/${aCrisis.id}`);

        ui.enterText(newCrisisName, 'input');
      });

      describe('Canceling change', () => {
        beforeEach(() => {
          ui.clickButton('Cancel');
        });

        describe('When discarding unsaved changes is confirmed', () => {
          beforeEach(() => {
            fakeDialog.clickOk();
          });

          it('navigates to the crisis center home with the crisis selected ', () => {
            expectToBeAtTheCrisisCenterHome();
            expectCrisisToBeSelected(aCrisis);
          });

          it('adds matrix parameters', () => {
            expect(harness.location.path()).toBe(`~/;id=${aCrisis.id};foo=foo`);
          });
        });

        it('keeps the change and stays on the crisis detail when discarding unsaved changes is canceled', () => {
          fakeDialog.clickCancel();

          expectToBeEditing({ id: aCrisis.id, name: newCrisisName });
        });
      });

      describe('Saving change', () => {
        it('navigates to the crisis center home with the crisis selected', () => {
          ui.clickButton('Save');

          expectToBeAtTheCrisisCenterHome();
          expectCrisisToBeSelected({ id: aCrisis.id, name: newCrisisName });
        });
      });
    });
  });
});
