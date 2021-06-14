---
id: getting-started
sidebar_label: Getting started
title: Getting started with Spectacular
---

Spectacular contains several specialized test harnesses. While their value lies
in what is unique about each of them, they have a few traits in common which we
explore in this page.

## Installing Spectacular

Using your package manager of choice, install the `@ngworker/spectacular`
package as a development dependency as seen in the following terminal commands.

### CNPM

```bash
cnpm install --save-dev @ngworker/spectacular
```

### NPM

```bash
npm install --save-dev @ngworker/spectacular
```

### PNPM

```bash
pnpm add --save-dev @ngworker/spectacular
```

### Yarn

```bash
yarn add --dev @ngworker/spectacular
```

## Importing from Spectacular

All Spectacular's software artifacts are exposed from a single package
namespace: `@ngworker/spectacular`. For example, we can import
`createFeatureHarness` as seen in the following example:

```ts
import { createFeatureHarness } from '@ngworker/spectacular';
```

## Creating a test harness

Once you determine the test harness you need, call its test harness factory
function and pass it the options it requires as seen in the following example:

```ts {2-3}
const harness = createFeatureHarness({
  featurePath: 'dashboard',
  featureModule: DashboardModule,
});
```

Note that Spectacular's application harness factory function returns a promise.
We recommend using async-await for application harnesses as seen in the
following example:

```ts {1-2}
it('sets up the application locale', async () => {
  const harness = await createApplicationHarness({
    imports: [AppLocalizationModule],
  });

  // (...)
});
```

## Configuring dependency injection

Additional Angular module imports and providers can be passed as `imports` and
`providers` options, respectively, as seen in the following example:

```ts {4-10}
const harness = createFeatureHarness({
  featurePath: 'dashboard',
  featureModule: DashboardModule,
  imports: [HttpClientTestingModule],
  providers: [
    {
      provide: StorageService,
      useClass: FakeStorageService,
    },
  ],
});
```

## Resolving dependencies

Spectacular's test harnesses expose an `inject` method just like Angular's
`TestBed`. This method is used to resolve dependencies as seen in the following
example:

```ts {13}
const harness = createFeatureHarness({
  featurePath: 'dashboard',
  featureModule: DashboardModule,
  imports: [HttpClientTestingModule],
  providers: [
    {
      provide: StorageService,
      useClass: FakeStorageService,
    },
  ],
});

const fakeStorage = harness.inject(StorageService);
```
