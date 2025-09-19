# Spectacular changelog

## 18.0.0-next (TBD)

### Features

- Remove `provideLocationMocks` from `createFeatureHarness`
  ([#114](https://github.com/ngworker/ngworker/pull/114))
- Remove `provideLocationMocks` from `provideSpectacularFeatureTesting`
  ([#114](https://github.com/ngworker/ngworker/pull/114))
- Remove `provideLocationMocks` from `createApplicationHarness`
  ([#114](https://github.com/ngworker/ngworker/pull/114))

### BREAKING CHANGES

Spectacular Application testing API and Feature testing API no longer add
`provideLocationMocks()` to `providers` as `TestBed` provides location mocks by
default since Angular 16.0. However, the mocks provided by `TestBed` is
`MockPlatformLocation` to replace `PlatformLocation` while
`provideLocationMocks()` replaces `Location` with `SpyLocation` and
`LocationStrategy` with `MockLocationStrategy`. If your tests rely on the
behavior of `SpyLocation` or `MockLocationStrategy`, you need to add
`provideLocationMocks()` to `providers`.

#### Migration

##### createFeatureHarness

Before:

```typescript
it(`provides SpyLocation and MockLocationStrategy`, () => {
  const harness = createFeatureHarness({
    featurePath,
    routes: [{ path: featurePath, loadChildren: () => heroesJobBoardRoutes }],
  });

  const location = harness.inject(Location);
  expect(location).toBeInstanceOf(SpyLocation);
  const locationStrategy = harness.inject(LocationStrategy);
  expect(locationStrategy).toBeInstanceOf(MockLocationStrategy);
});
```

After:

```typescript
it(`provides SpyLocation and MockLocationStrategy`, () => {
  const harness = createFeatureHarness({
    featurePath,
    routes: [{ path: featurePath, loadChildren: () => heroesJobBoardRoutes }],
    providers: [provideLocationMocks()],
  });

  const location = harness.inject(Location);
  expect(location).toBeInstanceOf(SpyLocation);
  const locationStrategy = harness.inject(LocationStrategy);
  expect(locationStrategy).toBeInstanceOf(MockLocationStrategy);
});
```

##### provideSpectacularFeatureTesting

Before:

```typescript
it(`provides SpyLocation and MockLocationStrategy`, () => {
  TestBed.configureTestingModule({
    providers: [
      provideSpectacularFeatureTesting({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      }),
    ],
  });

  const location = harness.inject(Location);
  expect(location).toBeInstanceOf(SpyLocation);
  const locationStrategy = harness.inject(LocationStrategy);
  expect(locationStrategy).toBeInstanceOf(MockLocationStrategy);
});
```

After:

```typescript
it(`provides SpyLocation and MockLocationStrategy`, () => {
  TestBed.configureTestingModule({
    providers: [
      provideSpectacularFeatureTesting({
        featurePath,
        routes: [
          { path: featurePath, loadChildren: () => heroesJobBoardRoutes },
        ],
      }),
      provideLocationMocks(),
    ],
  });

  const location = harness.inject(Location);
  expect(location).toBeInstanceOf(SpyLocation);
  const locationStrategy = harness.inject(LocationStrategy);
  expect(locationStrategy).toBeInstanceOf(MockLocationStrategy);
});
```

##### createApplicationHarness

Before:

```typescript
it(`provides SpyLocation and MockLocationStrategy`, async () => {
  const harness = await createApplicationHarness({
    providers: [],
  });

  const location = harness.inject(Location);
  expect(location).toBeInstanceOf(SpyLocation);
  const locationStrategy = harness.inject(LocationStrategy);
  expect(locationStrategy).toBeInstanceOf(MockLocationStrategy);
});
```

After:

```typescript
it(`provides SpyLocation and MockLocationStrategy`, async () => {
  const harness = await createApplicationHarness({
    providers: [provideLocationMocks()],
  });

  const location = harness.inject(Location);
  expect(location).toBeInstanceOf(SpyLocation);
  const locationStrategy = harness.inject(LocationStrategy);
  expect(locationStrategy).toBeInstanceOf(MockLocationStrategy);
});
```

## 17.0.1 (2025-09-14)

### Documentation

Correct Angular and TypeScript version compatibility in readme file.

## 17.0.0 (2025-09-14)

### Features

- Support platform initializers in `createApplicationHarness`
  ([#101](https://github.com/ngworker/ngworker/pull/101))

### Refactors

- Migrate from `RouterTestingModule` to `provideLocationMocks`
  ([#102](https://github.com/ngworker/ngworker/pull/102))

### BREAKING CHANGES

- Require Angular 17

## 16.0.0 (2025-02-19)

### Features

- Officially support environment initializers
- Mark package as side effect-free
- Remove `provideSpectacularFeatureTest`
  ([#85](https://github.com/ngworker/ngworker/pull/85))
- Remove `SpectacularFeatureTestingModule`
  ([#85](https://github.com/ngworker/ngworker/pull/85))
- Remove internal `SpectacularFeatureTestingRootModule`
  ([#85](https://github.com/ngworker/ngworker/pull/85))

### BREAKING CHANGES

- Require Angular 16
- Remove `provideSpectacularFeatureTest`
  ([#85](https://github.com/ngworker/ngworker/pull/85))
  - Use `provideSpectacularFeatureTesting` instead
- Remove `SpectacularFeatureTestingModule`
  ([#85](https://github.com/ngworker/ngworker/pull/85))
  - Use `provideSpectacularFeatureTesting` instead
- Remove internal `SpectacularFeatureTestingRootModule`
  ([#85](https://github.com/ngworker/ngworker/pull/85))

## 15.0.0 (2023-08-08)

### Features

- `SpectacularAppComponent` is a standalone Angular component
  ([#68](https://github.com/ngworker/ngworker/pull/68))
- Passing `InjectOptions` to `SpectacularApplicationHarness#inject` is supported
  ([#68](https://github.com/ngworker/ngworker/pull/68))
- Passing `InjectOptions` to `SpectacularFeatureHarness#inject` is supported
  ([#68](https://github.com/ngworker/ngworker/pull/68))
- Passing `InjectOptions` to `SpectacularPipeHarnes#inject` is supported
  ([#68](https://github.com/ngworker/ngworker/pull/68))
- `provideSpectacularFeatureTest` requires a `routes` option and optionally
  accepts the `withInitialFeatureNavigation` feature and Angular Router features
  ([#76](https://github.com/ngworker/ngworker/pull/76))
- `provideSpectacularFeatureTest` returns `(EnvironmentProviders | Provider)[]`
  ([#76](https://github.com/ngworker/ngworker/pull/76))
- `provideSpectacularFeatureTest` is marked as deprecated and a copy is renamed
  to `provideSpectacularFeatureTesting`
  ([#76](https://github.com/ngworker/ngworker/pull/76))
- Add `withInitialFeatureNavigation` for use with
  `provideSpectacularFeatureTest` and `provideSpectacularFeatureTesting`
  ([#76](https://github.com/ngworker/ngworker/pull/76))
- `SpectacularFeatureTestingModule` is deprecated
  ([#76](https://github.com/ngworker/ngworker/pull/76))

### BREAKING CHANGES

- Require Angular 15.0
- `SpectacularAppComponent` is a standalone Angular component. Your tests might
  need to take this into account depending on your setup. Most tests shouldn't
  need to change. ([#68](https://github.com/ngworker/ngworker/pull/68))
- A `routes` option must be passed to `provideSpectacularFeatureTest`.
  ([#76](https://github.com/ngworker/ngworker/pull/76))
- `provideSpectacularFeatureTest` returns `(EnvironmentProviders | Provider)[]`
  ([#76](https://github.com/ngworker/ngworker/pull/76))

#### Migration

##### Feature test using Angular Testing Library

Before:

```typescript
await render(SpectacularAppComponent, {
  excludeComponentDeclaration: true,
  imports: [
    SpectacularFeatureTestingModule.withFeature({
      featurePath: crisisCenterPath,
      routes: [
        { path: crisisCenterPath, loadChildren: () => CrisisCenterModule },
      ],
    }),
  ],
});
```

After:

```typescript
await render(SpectacularAppComponent, {
  providers: [
    provideSpectacularFeatureTesting({
      featurePath: crisisCenterPath,
      routes: [
        { path: crisisCenterPath, loadChildren: () => CrisisCenterModule },
      ],
    }),
  ],
});
```

### DEPRECATIONS

- Passing `InjectFlags` to `SpectacularApplicationHarness#inject` is deprecated
  in favor of passing `InjectOptions`
  ([#68](https://github.com/ngworker/ngworker/pull/68))
- Passing `InjectFlags` to `SpectacularFeatureHarness#inject` is deprecated in
  favor of passing `InjectOptions`
  ([#68](https://github.com/ngworker/ngworker/pull/68))
- Passing `InjectFlags` to `SpectacularPipeHarnes#inject` is deprecated in favor
  of passing `InjectOptions`
  ([#68](https://github.com/ngworker/ngworker/pull/68))
- `provideSpectacularFeatureTest` is to be removed in Spectacular version 16.
  Migrate to `provideSpectacularFeatureTesting`.
  ([#76](https://github.com/ngworker/ngworker/pull/76))
- `SpectacularFeatureTestingModule` is to be removed in Spectacular version 16.
  Migrate to `provideSpectacularFeatureTesting`.
  ([#76](https://github.com/ngworker/ngworker/pull/76))

#### Migration

##### InjectFlags to InjectOptions

Before:

```typescript
const ngZone = harness.inject(NgZone, InjectFlags.Optional);
```

After:

```typescript
const ngZone = harness.inject(NgZone, {
  optional: true,
});
```

## 14.1.0 (2023-07-21)

### Features

- Support standalone pipe testing
  ([#71](https://github.com/ngworker/ngworker/pull/71))

## 14.0.1 (2023-07-21)

### Refactors

- Replace constructor injection with `inject`
  ([#69](https://github.com/ngworker/ngworker/pull/69))

## 14.0.0 (2023-07-17)

### **BREAKING CHANGES**

- Requires Angular 14

## 13.0.0 (2023-07-15)

### Features

- `CreateFeatureHarnessOptions#featureModule` is replaced by
  `CreateFeatureHarnessOptions#routes`
  ([#54](https://github.com/ngworker/ngworker/pull/54))
- `SpectacularFeatureTestingModuleOptions#featureModule` is replaced by
  `SpectacularFeatureTestingModuleOptions#routes`
  ([#54](https://github.com/ngworker/ngworker/pull/54))
- `SpectacularFeatureLocation` is provided through `createFeatureHarness`,
  `provideSpectacularFeatureTest` or
  `SpectacularFeatureTestingModule.withFeature`
  ([#54](https://github.com/ngworker/ngworker/pull/54))
- `SpectacularFeatureRouter` is provided through `createFeatureHarness`,
  `provideSpectacularFeatureTest` or
  `SpectacularFeatureTestingModule.withFeature`
  ([#54](https://github.com/ngworker/ngworker/pull/54))

### Performance optimizations

- Type imports are used to optimize the bundle
  ([#57](https://github.com/ngworker/ngworker/pull/57))

### **BREAKING CHANGES**

- Requires Angular 13
- Requires RxJS >=6.5 <7.0 or >=7.4
- The `featureModule` option is replaced by the `routes` option
- Feature-aware navigation services are not provided by default

##### Migration

The feature-aware navigation services (`SpectacularFeatureLocation` and
`SpectacularFeatureRouter`) must be provided through `createFeatureHarness`,
`provideSpectacularFeatureTest` or
`SpectacularFeatureTestingModule.withFeature`.

###### createFeatureHarness

Before:

```typescript
const harness = createFeatureHarness({
  featureModule: CrisisCenterModule,
  featurePath: crisisCenterPath,
});
```

After:

```typescript
const harness = createFeatureHarness({
  featurePath: crisisCenterPath,
  routes: [{ path: crisisCenterPath, loadChildren: () => CrisisCenterModule }],
});
```

###### SpectacularFeatureTestingModule

Before:

```typescript
imports: [
  SpectacularFeatureTestingModule.withFeature({
    featureModule: CrisisCenterModule,
    featurePath: crisisCenterPath,
  }),
],
```

After:

```typescript
imports: [
  SpectacularFeatureTestingModule.withFeature({
    featurePath: crisisCenterPath,
    routes: [
      { path: crisisCenterPath, loadChildren: () => CrisisCenterModule },
    ],
  }),
],
```

## 0.5.0 (2022-07-24)

### Features

- Add `provideSpectacularFeatureTest`
  ([#47](https://github.com/ngworker/ngworker/pull/47))

### **BREAKING CHANGES**

- Requires Angular 12
- Partially Ivy-compiled

## 0.4.0 (2022-07-20)

### Features

- Add back `pipeName` option to `createPipeHarness`
  ([#39](https://github.com/ngworker/ngworker/pull/39))

### **BREAKING CHANGES**

Add back the required pipeName option as `PipeResolver` is removed in Angular
13.1 and was internally used by Spectacular's Pipe Testing API.

#### Migration

Add `pipeName` option argument for `createPipeHarness`.

Before:

```typescript
const harness = createPipeHarness({
  pipe: PowPipe,
  value: 2,
});
```

After:

```typescript
const harness = createPipeHarness({
  pipe: PowPipe,
  pipeName: 'pow',
  value: 2,
});
```

## 0.3.0 (2022-05-31)

### Features

- Remove `pipeName` option from `createPipeHarness`
  ([#26](https://github.com/ngworker/ngworker/pull/26))

### **BREAKING CHANGES**

The `pipeName` option for `createPipeHarness` is removed. Instead, the pipe name
is resolved through reflection.

Migration: Remove `pipeName` option arguments for `createPipeHarness`.

## 0.2.0 (2021-03-04)

### **BREAKING CHANGES**

- `createApplicationHarness` returns `Promise<SpectacularApplicationHarness>`.

### Bug fixes

- Fix NGCC error when using Nx + Yarn
  ([#20](https://github.com/ngworker/ngworker/pull/20))
- Fix asynchronous application initializer support
  ([#19](https://github.com/ngworker/ngworker/issues/19))
- Fix support for combining asynchronous application initializer with bootstrap
  listener ([#19](https://github.com/ngworker/ngworker/issues/19))

### Build changes

- Remove `@angular/forms` dependency
  ([#21](https://github.com/ngworker/ngworker/pull/21))
- Mark `rxjs` as peer dependency
  ([#21](https://github.com/ngworker/ngworker/pull/21))

## 0.1.0 (2021-02-24)

### Features

- Application testing API
- Feature testing API
- Pipe testing API
