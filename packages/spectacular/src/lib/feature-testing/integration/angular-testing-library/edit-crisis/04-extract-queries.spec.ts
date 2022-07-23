import { render, screen } from '@testing-library/angular';
import { Matcher } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup';
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
    location = injector.get(SpectacularFeatureLocation);
    router = injector.get(SpectacularFeatureRouter);
  });

  const findCrisisCenterHomeGreeting = () =>
    screen.findByText(/welcome to the crisis center/i);
  const findCrisisLink = (name: Exclude<Matcher, number>) =>
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
  let user: UserEvent;

  it('from crisis detail', async () => {
    const crisisId = 2;
    await router.navigate(['~', crisisId]);

    await user.clear(await findNameControl());
    await user.type(
      await findNameControl(),
      'The global temperature is rising'
    );
    await user.click(await findSaveButton());

    expect(
      await findSelectedCrisis(/the global temperature is rising/i)
    ).toBeInTheDocument();
    expect(location.path()).toBe(`~/;id=${crisisId};foo=foo`);
  });

  it('from crisis center home', async () => {
    await router.navigateByUrl('~/');

    await user.click(
      await findCrisisLink(/procrastinators meeting delayed again/i)
    );

    await user.clear(await findNameControl());
    await user.type(await findNameControl(), 'Coral reefs are dying');
    await user.click(await findSaveButton());

    expect(await findCrisisCenterHomeGreeting()).toBeInTheDocument();
    expect(
      await findSelectedCrisis(/coral reefs are dying/i)
    ).toBeInTheDocument();
  });
});
