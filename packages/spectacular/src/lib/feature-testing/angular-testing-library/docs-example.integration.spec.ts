import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
} from '@tour-of-heroes/crisis-center';
import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from '../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../navigation/spectacular-feature-router';

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(async () => {
    result = await render(SpectacularAppComponent, {
      excludeComponentDeclaration: true,
      imports: [
        SpectacularFeatureTestingModule.withFeature({
          featureModule: CrisisCenterModule,
          featurePath: crisisCenterPath,
        }),
      ],
    });
    result.fixture.autoDetectChanges(true);
    crisisService = result.fixture.debugElement.injector.get(CrisisService);
    featureLocation = result.fixture.debugElement.injector.get(
      SpectacularFeatureLocation
    );
    featureRouter = result.fixture.debugElement.injector.get(
      SpectacularFeatureRouter
    );
  });

  let crisisService: CrisisService;
  let featureLocation: SpectacularFeatureLocation;
  let featureRouter: SpectacularFeatureRouter;
  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  describe('Editing a crisis', () => {
    it('navigates to the crisis center home with the crisis selected when the change is saved', async () => {
      const [aCrisis] = crisisService.getCrises().value;
      await featureRouter.navigate(['~', aCrisis.id]);
      const newCrisisName = 'Global climate crisis';

      fireEvent.input(screen.getByRole('textbox'), {
        target: { value: newCrisisName },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));
      await result.fixture.whenStable();

      expect(screen.queryByText('Welcome to the Crisis Center')).not.toBeNull();
      expect(
        screen.queryByText(new RegExp(aCrisis.name), {
          selector: '.selected a',
        })
      ).not.toBeNull();
      expect(featureLocation.path()).toBe(`~/;id=${aCrisis.id};foo=foo`);
    });
  });
});
