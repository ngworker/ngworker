import { render, screen } from '@testing-library/angular';
import user from '@testing-library/user-event';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';
import { SpectacularAppComponent } from '../../../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../../../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from '../../../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../../../navigation/spectacular-feature-router';

describe('Edit crisis name', () => {
  beforeEach(async () => {
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
    location = injector.get(SpectacularFeatureLocation);
    router = injector.get(SpectacularFeatureRouter);
  });

  let location: SpectacularFeatureLocation;
  let router: SpectacularFeatureRouter;

  it('from crisis detail', async () => {
    const crisisId = 2;
    await router.navigate(['~', crisisId]);

    user.clear(await screen.findByPlaceholderText(/name/i));
    user.type(
      await screen.findByPlaceholderText(/name/i),
      'The global temperature is rising'
    );
    user.click(await screen.findByRole('button', { name: /save/i }));

    expect(
      await screen.findByText(/the global temperature is rising/i, {
        selector: '.selected a',
      })
    ).toBeInTheDocument();
    expect(location.path()).toBe(`~/;id=${crisisId};foo=foo`);
  });

  it('from crisis center home', async () => {
    await router.navigateByUrl('~/');

    user.click(
      await screen.findByRole('link', {
        name: /procrastinators meeting delayed again/i,
      })
    );

    user.clear(await screen.findByPlaceholderText(/name/i));
    user.type(
      await screen.findByPlaceholderText(/name/i),
      'Coral reefs are dying'
    );
    user.click(await screen.findByRole('button', { name: /save/i }));

    expect(
      await screen.findByText(/welcome to the crisis center/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/coral reefs are dying/i, {
        selector: '.selected a',
      })
    ).toBeInTheDocument();
  });
});
