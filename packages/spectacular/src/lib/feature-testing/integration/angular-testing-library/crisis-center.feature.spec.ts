import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
  DialogService,
  FakeDialogService,
} from '@tour-of-heroes-classic/crisis-center';
import { SpectacularAppComponent } from '../../../shared/app-component/spectacular-app.component';
import { provideSpectacularFeatureTesting } from '../../configuration/provide-spectacular-feature-testing';
import { SpectacularFeatureLocation } from '../../navigation/spectacular-feature-location';

async function setup() {
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

  const user = userEvent.setup();
  const {
    fixture: {
      debugElement: { injector },
    },
    navigate,
  } = await render(SpectacularAppComponent, {
    providers: [
      provideSpectacularFeatureTesting({
        featurePath: crisisCenterPath,
        routes: [
          {
            path: crisisCenterPath,
            loadChildren: () => CrisisCenterModule,
          },
        ],
      }),
      { provide: DialogService, useClass: FakeDialogService },
    ],
  });
  const fakeDialog = injector.get(DialogService) as FakeDialogService;
  const featureLocation = injector.get(SpectacularFeatureLocation);
  const crisisService = injector.get(CrisisService);
  const [aCrisis] = crisisService.getCrises().value;
  const newCrisisName = 'Coral reefs are dying';
  const unknownCrisis: Crisis = {
    id: Number.MAX_SAFE_INTEGER,
    name: 'Unknown crisis',
  };

  return {
    aCrisis,
    expectCrisisToBeSelected,
    expectToBeAtTheCrisisCenterHome,
    expectToBeEditing,
    fakeDialog,
    featureLocation,
    navigate,
    newCrisisName,
    unknownCrisis,
    user,
  };
}

describe('[Angular Testing Library] Tour of Heroes: Crisis center', () => {
  it('starts at the crisis center home', async () => {
    const { expectToBeAtTheCrisisCenterHome, navigate } = await setup();

    await navigate(crisisCenterPath);

    await expectToBeAtTheCrisisCenterHome();
  });

  describe('Crisis detail', () => {
    it('shows crisis detail when a valid ID is in the URL', async () => {
      const { aCrisis, expectToBeEditing, navigate } = await setup();
      await navigate(crisisCenterPath + '/' + aCrisis.id);

      await expectToBeEditing(aCrisis);
    });

    it('navigates to the crisis center home when an invalid ID is in the URL', async () => {
      const { expectToBeAtTheCrisisCenterHome, navigate, unknownCrisis } =
        await setup();
      const didNavigationSucceed = await navigate(
        crisisCenterPath + '/' + unknownCrisis.id
      );

      expect(didNavigationSucceed).toBe(false);
      await expectToBeAtTheCrisisCenterHome();
    });

    describe('Editing crisis name', () => {
      async function editCrisisNameSetup() {
        const testUtilities = await setup();
        const { aCrisis, navigate, newCrisisName, user } = testUtilities;

        await navigate(crisisCenterPath + '/' + aCrisis.id);

        await user.type(await screen.findByRole('textbox'), newCrisisName);

        return testUtilities;
      }

      describe('Canceling change', () => {
        async function cancelChangeSetup() {
          const testUtilities = await editCrisisNameSetup();
          const { user } = testUtilities;

          await user.click(
            await screen.findByRole('button', { name: 'Cancel' })
          );

          return testUtilities;
        }

        describe('When discarding unsaved changes is confirmed', () => {
          async function confirmDiscardingUnsavedChangesSetup() {
            const testUtilities = await cancelChangeSetup();
            const { fakeDialog } = testUtilities;

            fakeDialog.clickOk();

            return testUtilities;
          }

          it('navigates to the crisis center home with the crisis selected ', async () => {
            const {
              aCrisis,
              expectCrisisToBeSelected,
              expectToBeAtTheCrisisCenterHome,
            } = await confirmDiscardingUnsavedChangesSetup();

            await expectToBeAtTheCrisisCenterHome();
            await expectCrisisToBeSelected(aCrisis);
          });

          it('adds matrix parameters', async () => {
            const { aCrisis, featureLocation } =
              await confirmDiscardingUnsavedChangesSetup();

            expect(featureLocation.path()).toBe(`~/;id=${aCrisis.id};foo=foo`);
          });
        });
      });
    });
  });
});
