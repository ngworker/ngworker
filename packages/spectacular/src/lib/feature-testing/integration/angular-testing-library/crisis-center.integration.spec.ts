import { TestBed } from '@angular/core/testing';
import { render, RenderResult, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
  DialogService,
  FakeDialogService,
} from '@tour-of-heroes/crisis-center';
import { SpectacularAppComponent } from '../../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from '../../navigation/spectacular-feature-location';

describe('[Angular Testing Library] Tour of Heroes: Crisis center, nested tests', () => {
  async function expectCrisisToBeSelected(crisis: Crisis) {
    expect(
      await screen.findByText(new RegExp(crisis.name), {
        selector: '.selected a',
      })
    ).not.toBeNull();
  }

  async function expectToBeAtTheCrisisCenterHome() {
    expect(
      await screen.findByText('Welcome to the Crisis Center')
    ).not.toBeNull();
  }

  async function expectToBeEditing(crisis: Crisis) {
    expect(featureLocation.path()).toBe(`~/${crisis.id}`);
    expect(
      await screen.findByRole('heading', { name: new RegExp(crisis.name) })
    ).not.toBeNull();
  }

  beforeEach(async () => {
    user = userEvent.setup();
    result = await render(SpectacularAppComponent, {
      excludeComponentDeclaration: true,
      imports: [
        SpectacularFeatureTestingModule.withFeature({
          featureModule: CrisisCenterModule,
          featurePath: crisisCenterPath,
        }),
      ],
      providers: [{ provide: DialogService, useClass: FakeDialogService }],
    });
    result.fixture.autoDetectChanges(true);
    fakeDialog = TestBed.inject(DialogService) as FakeDialogService;
    featureLocation = TestBed.inject(SpectacularFeatureLocation);
    const crisisService = TestBed.inject(CrisisService);
    [aCrisis] = crisisService.getCrises().value;
  });

  let aCrisis: Crisis;
  let fakeDialog: FakeDialogService;
  let featureLocation: SpectacularFeatureLocation;
  const newCrisisName = 'Coral reefs are dying';
  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
  const unknownCrisis: Crisis = {
    id: Number.MAX_SAFE_INTEGER,
    name: 'Unknown crisis',
  };
  let user: UserEvent;

  it('starts at the crisis center home', async () => {
    await result.navigate(crisisCenterPath);

    await expectToBeAtTheCrisisCenterHome();
  });

  describe('Crisis detail', () => {
    it('shows crisis detail when a valid ID is in the URL', async () => {
      await result.navigate(crisisCenterPath + '/' + aCrisis.id);

      await expectToBeEditing(aCrisis);
    });

    it('navigates to the crisis center home when an invalid ID is in the URL', async () => {
      const didNavigationSucceed = await result.navigate(
        crisisCenterPath + '/' + unknownCrisis.id
      );

      expect(didNavigationSucceed).toBe(false);
      await expectToBeAtTheCrisisCenterHome();
    });

    describe('Editing crisis name', () => {
      beforeEach(async () => {
        await result.navigate(crisisCenterPath + '/' + aCrisis.id);

        await user.type(await screen.findByRole('textbox'), newCrisisName);
      });

      describe('Canceling change', () => {
        beforeEach(async () => {
          await user.click(
            await screen.findByRole('button', { name: 'Cancel' })
          );
        });

        describe('When discarding unsaved changes is confirmed', () => {
          beforeEach(() => {
            fakeDialog.clickOk();
          });

          it('navigates to the crisis center home with the crisis selected ', async () => {
            await expectToBeAtTheCrisisCenterHome();
            await expectCrisisToBeSelected(aCrisis);
          });

          it('adds matrix parameters', () => {
            expect(featureLocation.path()).toBe(`~/;id=${aCrisis.id};foo=foo`);
          });
        });
      });
    });
  });
});
