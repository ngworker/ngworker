import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { render, RenderResult } from '@testing-library/angular';
import { CrisisCenterModule, crisisCenterPath, DialogService, FakeDialogService } from '@tour-of-heroes/crisis-center';

import { SpectacularAppComponent } from '../../shared/app-component/spectacular-app.component';
import { SpectacularFeatureTestingModule } from '../feature-testing-module/spectacular-feature-testing.module';
import { routerReplacingProvider } from '../navigation/router-replacing.provider';

describe('Tour of Heroes: Crisis center integration tests (Angular Testing Library)', () => {
  function expectToBeAtTheCrisisCenterHome() {
    expect(result.queryByText('Welcome to the Crisis Center')).not.toBeNull();
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
      providers: [
        routerReplacingProvider,
        { provide: DialogService, useClass: FakeDialogService },
      ],
    });
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  it('starts at the crisis center home', async () => {
    // what works for now
    const router = TestBed.inject(Router);
    await router.navigateByUrl('~/');

    // what we want
    // await result.navigate('~');

    // what should alway work
    // await result.navigate(crisisCenterPath);

    expectToBeAtTheCrisisCenterHome();
  });
});
