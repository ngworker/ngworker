import { TestBed } from '@angular/core/testing';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
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

describe('Tour of Heroes: Crisis center integration tests (Angular Testing Library)', () => {
  function expectCrisisToBeSelected(crisis: Crisis) {
    expect(
      screen.queryByText(new RegExp(crisis.name), {
        selector: '.selected a',
      })
    ).not.toBeNull();
  }

  function expectToBeAtTheCrisisCenterHome() {
    expect(screen.queryByText('Welcome to the Crisis Center')).not.toBeNull();
  }

  function expectToBeEditing(crisis: Crisis): void {
    expect(featureLocation.path()).toBe(`~/${crisis.id}`);
    expect(
      screen.queryByRole('heading', { name: new RegExp(crisis.name) })
    ).not.toBeNull();
  }

  beforeEach(async () => {
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

  it('starts at the crisis center home', async () => {
    await result.navigate(crisisCenterPath);

    expectToBeAtTheCrisisCenterHome();
  });

  describe('Crisis detail', () => {
    it('shows crisis detail when a valid ID is in the URL', async () => {
      await result.navigate(crisisCenterPath + '/' + aCrisis.id);

      expectToBeEditing(aCrisis);
    });

    it('navigates to the crisis center home when an invalid ID is in the URL', async () => {
      const didNavigationSucceed = await result.navigate(
        crisisCenterPath + '/' + unknownCrisis.id
      );

      expect(didNavigationSucceed).toBe(false);
      expectToBeAtTheCrisisCenterHome();
    });

    describe('Editing crisis name', () => {
      beforeEach(async () => {
        await result.navigate(crisisCenterPath + '/' + aCrisis.id);

        fireEvent.input(screen.getByRole('textbox'), {
          target: { value: newCrisisName },
        });
      });

      describe('Canceling change', () => {
        beforeEach(() => {
          fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
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
            expect(featureLocation.path()).toBe(`~/;id=${aCrisis.id};foo=foo`);
          });
        });
      });
    });
  });
});
