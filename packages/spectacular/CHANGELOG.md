# Spectacular changelog

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

- Requires Angular 12
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
