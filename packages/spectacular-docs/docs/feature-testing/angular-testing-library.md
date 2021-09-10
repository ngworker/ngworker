---
# slug: /angular-testing-library
sidebar_label: Angular Testing Library
sidebar_position: 2
title: Integrating Spectacular with Angular Testing Library
---

Spectacular doesn't contain an API for inspecting or interacting with our
application's DOM. Instead, we rely on Angular's verbose testing APIs.
Alternatively, we can use the expressive and convenient APIs of
[Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro/).

In this page, we learn how to integrate Spectacular with Angular Testing Library
by configuring
[`render`](https://testing-library.com/docs/angular-testing-library/api#render)
and using Spectacular's feature-aware services for an excellent testing
experience.

## Registering a routed feature module

The following snippet shows the common configuration needed for integrating
Spectacular with Angular Testing library:

```ts {1-4,13-21}
import {
  SpectacularAppComponent,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult } from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
});
```

Let's discuss each part of the configuration in detail.

Firstly, we use
[`SpectacularAppComponent`](../api/classes/spectacularappcomponent) as our root
component by passing it to Angular Testing Library's
[`render`](https://testing-library.com/docs/angular-testing-library/api#render)
function:

```ts {13}
import {
  SpectacularAppComponent,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult } from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
});
```

[`SpectacularAppComponent`](../api/classes/spectacularappcomponent) is a simple
component with a router outlet which will host all our feature's routes.

Notice that we resolve the render result and store it in a variable of type
[`RenderResult<SpectacularAppComponent, SpectacularAppComponent>`](https://testing-library.com/docs/angular-testing-library/api#renderresult):

```ts {24}
import {
  SpectacularAppComponent,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult } from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
});
```

Next, we register our feature by calling
[`SpectacularFeatureTestingModule.withFeature`](..//api/classes/spectacularfeaturetestingmodule#withfeature)
and adding the result to the `imports` option:

```ts {16-19}
import {
  SpectacularAppComponent,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult } from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
});
```

We pass our routed feature module to the
[`featureModule`](../api/interfaces/spectacularfeaturetestingmoduleoptions#featuremodule)
option, in our case `CrisisCenterModule`.

Additionally, we pass the route path that our feature module uses in our
application to the
[`featurePath`](../api/interfaces/spectacularfeaturetestingmoduleoptions#featurepath)
option, in our case the value of the `crisisCenterPath` variable which is used
between our application and our feature test suite.

The [`SpectacularAppComponent`](../api/classes/spectacularappcomponent) is
declared by
[`SpectacularFeatureTestingModule.withFeature`](..//api/classes/spectacularfeaturetestingmodule#withfeature)
so we set the
[`excludeComponentDeclaration`](https://testing-library.com/docs/angular-testing-library/api#excludecomponentdeclaration)
option to `true` to prevent it from being declared twice in our test suite:

```ts {14}
import {
  SpectacularAppComponent,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult } from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
});
```

With our routed feature module registered, our feature tests have access to all
routes configured by that Angular module.

## Resolving feature-aware services

When we're using Angular Testing Library, we use
[`render`](https://testing-library.com/docs/angular-testing-library/api#render)
and
[`SpectacularFeatureTestingModule.withFeature`](..//api/classes/spectacularfeaturetestingmodule#withfeature)
instead of [`createFeatureHarness`](../api/modules#createfeatureharness).

Because of this, we don't get a reference to a
[`SpectacularFeatureHarness`](./api/interfaces/spectacularfeatureharness).

To access Spectacular's feature-aware services, we resolve them using the
injector of `RenderResult#debugElement`:

```ts {3,23,26}
import {
  SpectacularAppComponent,
  SpectacularFeatureRouter,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult } from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
    featureRouter = result.debugElement.injector.get(SpectacularFeatureRouter);
  });

  let featureRouter: SpectacularFeatureRouter;
  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
});
```

Alternatively, we use
[`TestBed.inject`](https://angular.io/api/core/testing/TestBed#inject) to
resolve Spectacular's feature-aware services:

```ts {1,24,27}
import { TestBed } from '@angular/core/testing';
import {
  SpectacularAppComponent,
  SpectacularFeatureRouter,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult } from '@testing-library/angular';
import {
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
    featureRouter = TestBed.inject(SpectacularFeatureRouter);
  });

  let featureRouter: SpectacularFeatureRouter;
  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;
});
```

Either of these techniques can be used to access
[`SpectacularFeatureLocation`](../api/classes/spectacularfeaturelocation) and
[`SpectacularFeatureRouter`](../api/classes/spectacularfeaturerouter).

## Navigating to feature routes

When using Angular Testing Library, you can keep using
[`RenderResult#navigate`](https://testing-library.com/docs/angular-testing-library/api#navigate)
and your tests will behave as you're used to:

```ts {33}
import {
  SpectacularAppComponent,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult, screen } from '@testing-library/angular';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
  });

  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  it('shows crisis detail when a valid ID is in the URL', async () => {
    const crisis: Crisis = {
      id: 1,
      name: 'Dragon Burning Cities',
    };

    await result.navigate(crisisCenterPath + '/' + crisis.id);

    expect(
      screen.queryByRole('heading', { name: new RegExp(crisis.name) })
    ).not.toBeNull();
  });
});
```

Alternatively, you can use Spectacular's feature-aware router,
[`SpectacularFeatureRouter`](../api/classes/spectacularfeaturerouter):

```ts {3,24,27,36}
import {
  SpectacularAppComponent,
  SpectacularFeatureRouter,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { render, RenderResult, screen } from '@testing-library/angular';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
    featureRouter = result.debugElement.injector.get(SpectacularFeatureRouter);
  });

  let featureRouter: SpectacularFeatureRouter;
  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  it('shows crisis detail when a valid ID is in the URL', async () => {
    const crisis: Crisis = {
      id: 1,
      name: 'Dragon Burning Cities',
    };

    await featureRouter.navigate(['~', crisis.id]);

    expect(
      screen.queryByRole('heading', { name: new RegExp(crisis.name) })
    ).not.toBeNull();
  });
});
```

## Asserting feature paths

When using Angular Testing Library, you can use Angular's
[`Location#path`](https://angular.io/api/common/Location#path) service method to
assert navigation to feature routes:

```ts {1,24,27,39}
import { Location } from '@angular/common';
import {
  SpectacularAppComponent,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { fireEvent, render, RenderResult } from '@testing-library/angular';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
    appLocation = result.debugElement.injector.get(Location);
  });

  let appLocation: Location;
  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  it('shows crisis detail when a valid ID is in the URL', async () => {
    const crisis: Crisis = {
      id: 1,
      name: 'Dragon Burning Cities',
    };
    await result.navigate(crisisCenterPath);

    fireEvent.click(screen.getByText(crisis.name));

    expect(appLocation.path()).toBe(crisisCenterPath + '/' + crisis.id);
  });
});
```

Alternatively, you can use Spectacular's feature-aware location service,
[`SpectacularFeatureLocation`](../api/classes/spectacularfeaturelocation):

```ts {3,24-26,29,41}
import {
  SpectacularAppComponent,
  SpectacularFeatureLocation,
  SpectacularFeatureTestingModule,
} from '@ngworker/spectacular';
import { fireEvent, render, RenderResult } from '@testing-library/angular';
import {
  Crisis,
  CrisisCenterModule,
  crisisCenterPath,
} from '@tour-of-heroes/crisis-center';

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
    featureLocation = result.debugElement.injector.get(
      SpectacularFeatureLocation
    );
  });

  let featureLocation: SpectacularFeatureLocation;
  let result: RenderResult<SpectacularAppComponent, SpectacularAppComponent>;

  it('shows crisis detail when a valid ID is in the URL', async () => {
    const crisis: Crisis = {
      id: 1,
      name: 'Dragon Burning Cities',
    };
    await result.navigate(crisisCenterPath);

    fireEvent.click(screen.getByText(crisis.name));

    expect(featureLocation.path()).toBe('~/' + crisis.id);
  });
});
```
