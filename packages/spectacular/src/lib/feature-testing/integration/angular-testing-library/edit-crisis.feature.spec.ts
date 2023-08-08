import { withRouterConfig } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { Matcher } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as classicCrisisCenter from '@tour-of-heroes-classic/crisis-center';
import * as standaloneCrisisCenter from '@tour-of-heroes-standalone/crisis-center';
import { SpectacularAppComponent } from '../../../shared/app-component/spectacular-app.component';
import { provideSpectacularFeatureTesting } from '../../configuration/provide-spectacular-feature-testing';
import { withInitialFeatureNavigation } from '../../configuration/with-initial-feature-navigation';
import { SpectacularFeatureLocation } from '../../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../../navigation/spectacular-feature-router';
import { ProvideSpectacularFeatureTestingOptions } from './../../configuration/provide-spectacular-feature-testing';

const classicCrisisCenterFeature: ProvideSpectacularFeatureTestingOptions = {
  featurePath: classicCrisisCenter.crisisCenterPath,
  routes: [
    {
      path: classicCrisisCenter.crisisCenterPath,
      loadChildren: () => classicCrisisCenter.CrisisCenterModule,
    },
  ],
};
const standaloneCrisisCenterFeature: ProvideSpectacularFeatureTestingOptions = {
  featurePath: standaloneCrisisCenter.crisisCenterPath,
  routes: [
    {
      path: standaloneCrisisCenter.crisisCenterPath,
      loadChildren: () => standaloneCrisisCenter.crisisCenterRoutes,
    },
  ],
};
const features: readonly ProvideSpectacularFeatureTestingOptions[] = [
  classicCrisisCenterFeature,
  standaloneCrisisCenterFeature,
];
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
const setup = async ({
  featurePath,
  routes,
}: ProvideSpectacularFeatureTestingOptions) => {
  const user = userEvent.setup();
  const {
    fixture: {
      debugElement: { injector },
    },
  } = await render(SpectacularAppComponent, {
    providers: [
      provideSpectacularFeatureTesting(
        {
          featurePath,
          routes,
        },
        withInitialFeatureNavigation(),
        withRouterConfig({
          onSameUrlNavigation: 'reload',
        })
      ),
    ],
  });

  return {
    location: injector.get(SpectacularFeatureLocation),
    router: injector.get(SpectacularFeatureRouter),
    user,
  };
};

it.each(features)('Edit crisis from crisis detail', async feature => {
  const { location, router, user } = await setup(feature);
  const crisisId = 2;
  await router.navigate(['~', crisisId]);

  await user.clear(await findNameControl());
  await user.type(await findNameControl(), 'The global temperature is rising');
  await user.click(await findSaveButton());

  expect(
    await findSelectedCrisis(/the global temperature is rising/i)
  ).toBeInTheDocument();
  expect(location.path()).toBe(`~/;id=${crisisId};foo=foo`);
});

it.each(features)('Edit crisis from crisis center home', async feature => {
  const { router, user } = await setup(feature);
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
