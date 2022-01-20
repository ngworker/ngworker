import { render, screen } from '@testing-library/angular';
import { Matcher } from '@testing-library/dom';
import user from '@testing-library/user-event';
import { CrisisCenterModule, crisisCenterPath } from '@tour-of-heroes/crisis-center';

import { SpectacularAppComponent } from '../../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from '../../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../../navigation/spectacular-feature-router';

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

  const findCrisisCenterHomeGreeting = () =>
    screen.findByText(/welcome to the crisis center/i);
  const findCrisisLink = (name: Matcher) =>
    screen.findByRole('link', {
      name,
    });
  const findNameControl = () => screen.findByPlaceholderText(/name/i);
  const findSaveButton = () => screen.findByRole('button', { name: /save/i });
  const findSelectedCrisis = (name: Matcher) =>
    screen.findByText(name, {
      selector: '.selected a',
    });
  let location: SpectacularFeatureLocation;
  let router: SpectacularFeatureRouter;

  it('from crisis detail', async () => {
    const crisisId = 2;
    await router.navigate(['~', crisisId]);

    user.clear(await findNameControl());
    user.type(await findNameControl(), 'The global temperature is rising');
    user.click(await findSaveButton());

    expect(
      await findSelectedCrisis(/the global temperature is rising/i)
    ).toBeInTheDocument();
    expect(location.path()).toBe(`~/;id=${crisisId};foo=foo`);
  });

  it('from crisis center home', async () => {
    await router.navigateByUrl('~/');

    user.click(await findCrisisLink(/procrastinators meeting delayed again/i));

    user.clear(await findNameControl());
    user.type(await findNameControl(), 'Coral reefs are dying');
    user.click(await findSaveButton());

    expect(await findCrisisCenterHomeGreeting()).toBeInTheDocument();
    expect(
      await findSelectedCrisis(/coral reefs are dying/i)
    ).toBeInTheDocument();
  });
});
