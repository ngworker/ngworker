import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';
import { SpectacularAppComponent } from '../../../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../../../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureLocation } from '../../../navigation/spectacular-feature-location';
import { SpectacularFeatureRouter } from '../../../navigation/spectacular-feature-router';

it('Edit crisis name from crisis detail', async () => {
  const user = userEvent.setup();
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
  const location = injector.get(SpectacularFeatureLocation);
  const router = injector.get(SpectacularFeatureRouter);
  const crisisId = 2;
  await router.navigate(['~', crisisId]);

  await user.clear(await screen.findByPlaceholderText(/name/i));
  await user.type(
    await screen.findByPlaceholderText(/name/i),
    'The global temperature is rising'
  );
  await user.click(await screen.findByRole('button', { name: /save/i }));

  expect(
    await screen.findByText(/the global temperature is rising/i, {
      selector: '.selected a',
    })
  ).toBeInTheDocument();
  expect(location.path()).toBe(`~/;id=${crisisId};foo=foo`);
});
