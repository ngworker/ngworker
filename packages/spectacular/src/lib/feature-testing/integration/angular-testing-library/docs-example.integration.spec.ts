import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
import {
  CrisisCenterModule,
  crisisCenterPath,
  CrisisService,
} from '@tour-of-heroes/crisis-center';
import { SpectacularAppComponent } from '../../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from '../../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../../navigation/spectacular-feature-router';

describe('Tour of Heroes: Crisis center integration tests', () => {
  beforeEach(async () => {
    user = userEvent.setup();
    const {
      fixture: {
        debugElement: { injector },
      },
    } = await render(SpectacularAppComponent, {
      excludeComponentDeclaration: true,
      imports: [
        SpectacularFeatureTestingModule.withFeature({
          featureModule: CrisisCenterModule,
          featurePath: crisisCenterPath,
        }),
      ],
    });
    crisisService = injector.get(CrisisService);
    featureLocation = injector.get(SpectacularFeatureLocation);
    featureRouter = injector.get(SpectacularFeatureRouter);
  });

  let crisisService: CrisisService;
  let featureLocation: SpectacularFeatureLocation;
  let featureRouter: SpectacularFeatureRouter;
  let user: UserEvent;

  describe('Editing a crisis', () => {
    it('navigates to the crisis center home with the crisis selected when the change is saved', async () => {
      const [aCrisis] = crisisService.getCrises().value;
      await featureRouter.navigate(['~', aCrisis.id]);
      const newCrisisName = 'Global climate crisis';

      await user.type(await screen.findByRole('textbox'), newCrisisName);
      await user.click(await screen.findByRole('button', { name: 'Save' }));

      expect(
        await screen.findByText('Welcome to the Crisis Center')
      ).not.toBeNull();
      expect(
        await screen.findByText(new RegExp(aCrisis.name), {
          selector: '.selected a',
        })
      ).not.toBeNull();
      expect(featureLocation.path()).toBe(`~/;id=${aCrisis.id};foo=foo`);
    });
  });
});
