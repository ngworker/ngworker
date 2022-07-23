import { render, screen } from '@testing-library/angular';
import user from '@testing-library/user-event';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';
import { SpectacularAppComponent } from '../../../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../../../feature-testing-module/spectacular-feature-testing.module';
import { SpectacularFeatureRouter } from '../../../navigation/spectacular-feature-router';

it('Edit a crisis from crisis center home', async () => {
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
  const router = injector.get(SpectacularFeatureRouter);
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
