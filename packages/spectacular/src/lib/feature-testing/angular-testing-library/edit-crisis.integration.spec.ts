import { render, screen } from '@testing-library/angular';
import { Matcher } from '@testing-library/dom';
import user from '@testing-library/user-event';
import { CrisisCenterModule, crisisCenterPath } from '@tour-of-heroes/crisis-center';

import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from './../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from './../navigation/spectacular-feature-router';

async function setup() {
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

  return {
    findNameControl: () => screen.findByPlaceholderText(/name/i),
    findSelectedCrisis: (name: Matcher) =>
      screen.findByText(name, {
        selector: '.selected a',
      }),
    location: injector.get(SpectacularFeatureLocation),
    router: injector.get(SpectacularFeatureRouter),
  };
}

test('Edit a crisis from crisis center home', async () => {
  const { findNameControl, findSelectedCrisis, router } = await setup();
  await router.navigateByUrl('~/');

  user.click(
    await screen.findByRole('link', {
      name: /procrastinators meeting delayed again/i,
    })
  );

  user.clear(await findNameControl());
  user.type(await findNameControl(), 'Coral reefs are dying');
  user.click(await screen.findByRole('button', { name: /save/i }));

  expect(
    await screen.findByText(/welcome to the crisis center/i)
  ).toBeInTheDocument();
  expect(
    await findSelectedCrisis(/coral reefs are dying/i)
  ).toBeInTheDocument();
});

test('Edit name from crisis detail', async () => {
  const {
    findNameControl,
    findSelectedCrisis,
    location,
    router,
  } = await setup();
  const crisisId = 2;
  await router.navigate(['~', crisisId]);

  user.clear(await findNameControl());
  user.type(await findNameControl(), 'The global temperature is rising');
  user.click(await screen.findByRole('button', { name: /save/i }));

  expect(
    await findSelectedCrisis(/the global temperature is rising/i)
  ).toBeInTheDocument();
  expect(location.path()).toBe(`~/;id=${crisisId};foo=foo`);
});
