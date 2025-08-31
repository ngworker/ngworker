---
id: 'modules'
title: '@ngworker/spectacular'
sidebar_label: 'Exports'
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [SpectacularFeatureTestingFeatureKind](enums/SpectacularFeatureTestingFeatureKind.md)

## Classes

- [SpectacularAppComponent](classes/SpectacularAppComponent.md)
- [SpectacularFeatureLocation](classes/SpectacularFeatureLocation.md)
- [SpectacularFeatureRouter](classes/SpectacularFeatureRouter.md)
- [SpectacularFeatureTestingModule](classes/SpectacularFeatureTestingModule.md)
- [SpectacularFeatureTestingRootModule](classes/SpectacularFeatureTestingRootModule.md)
- [SpectacularPipeHarness](classes/SpectacularPipeHarness.md)

## Interfaces

- [CreateFeatureHarnessOptions](interfaces/CreateFeatureHarnessOptions.md)
- [CreatePipeHarnessOptions](interfaces/CreatePipeHarnessOptions.md)
- [ProvideSpectacularFeatureTestOptions](interfaces/ProvideSpectacularFeatureTestOptions.md)
- [ProvideSpectacularFeatureTestingOptions](interfaces/ProvideSpectacularFeatureTestingOptions.md)
- [SpectacularApplicationHarness](interfaces/SpectacularApplicationHarness.md)
- [SpectacularFeatureHarness](interfaces/SpectacularFeatureHarness.md)
- [SpectacularFeatureTestingFeature](interfaces/SpectacularFeatureTestingFeature.md)
- [SpectacularFeatureTestingModuleOptions](interfaces/SpectacularFeatureTestingModuleOptions.md)

## Type Aliases

### CreateApplicationHarnessOptions

Ƭ **CreateApplicationHarnessOptions**: `Pick`\<`NgModule`, `"imports"` \|
`"providers"`\>

Application harness options.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts:15](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts#L15)

---

### InitialFeatureNavigationFeature

Ƭ **InitialFeatureNavigationFeature**:
[`SpectacularFeatureTestingFeature`](interfaces/SpectacularFeatureTestingFeature.md)\<[`InitialFeatureNavigationFeature`](enums/SpectacularFeatureTestingFeatureKind.md#initialfeaturenavigationfeature)\>

A type alias that represents a feature which enables initial navigation to the
specified feature path.

The type is used to describe the return value of the
[withInitialFeatureNavigation](modules.md#withinitialfeaturenavigation)
function.

**`See`**

- [withInitialFeatureNavigation](modules.md#withinitialfeaturenavigation)
- [provideSpectacularFeatureTesting](modules.md#providespectacularfeaturetesting)

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/with-initial-feature-navigation.ts:19](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/configuration/with-initial-feature-navigation.ts#L19)

---

### SpectacularFeatureTestingFeatures

Ƭ **SpectacularFeatureTestingFeatures**:
[`InitialFeatureNavigationFeature`](modules.md#initialfeaturenavigationfeature)

A type alias that represents all tree-shakable Spectacular Feature Testing
features available for use with
[provideSpectacularFeatureTesting](modules.md#providespectacularfeaturetesting).
Features can be enabled by adding special functions to the
[provideSpectacularFeatureTesting](modules.md#providespectacularfeaturetesting)
call.

See documentation for each symbol to find its corresponding function name. See
also
[provideSpectacularFeatureTesting](modules.md#providespectacularfeaturetesting)
documentation on how to use those functions.

**`See`**

[provideSpectacularFeatureTesting](modules.md#providespectacularfeaturetesting)

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/spectacular-feature-testing-features.ts:55](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/configuration/spectacular-feature-testing-features.ts#L55)

## Variables

### spectacularAppTag

• `Const` **spectacularAppTag**: `"spectacular-app"`

The tag name of `SpectacularAppComponent`'s DOM element.

#### Defined in

[packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts:7](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts#L7)

## Functions

### createApplicationHarness

▸ **createApplicationHarness**(`options?`):
`Promise`\<[`SpectacularApplicationHarness`](interfaces/SpectacularApplicationHarness.md)\>

Bootstrap a test application with the specified metadata. Useful to test
configuration Angular modules, bootstrap listeners, and application
initializers.

#### Parameters

| Name      | Type                                                                            |
| :-------- | :------------------------------------------------------------------------------ |
| `options` | [`CreateApplicationHarnessOptions`](modules.md#createapplicationharnessoptions) |

#### Returns

`Promise`\<[`SpectacularApplicationHarness`](interfaces/SpectacularApplicationHarness.md)\>

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts:25](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts#L25)

---

### createFeatureHarness

▸ **createFeatureHarness**(`options`):
[`SpectacularFeatureHarness`](interfaces/SpectacularFeatureHarness.md)

Configure feature testing environment, bootstrap `SpectacularAppComponent`, and
navigate to the default feature route.

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `options` | [`CreateFeatureHarnessOptions`](interfaces/CreateFeatureHarnessOptions.md) |

#### Returns

[`SpectacularFeatureHarness`](interfaces/SpectacularFeatureHarness.md)

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:43](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L43)

---

### createPipeHarness

▸ **createPipeHarness**\<`TValue`\>(`options`):
[`SpectacularPipeHarness`](classes/SpectacularPipeHarness.md)\<`TValue`\>

Set up a host component for the Angular pipe under test.

Test it by updating the value and reading the rendered text.

#### Type parameters

| Name     |
| :------- |
| `TValue` |

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `options` | [`CreatePipeHarnessOptions`](interfaces/CreatePipeHarnessOptions.md)\<`TValue`\> |

#### Returns

[`SpectacularPipeHarness`](classes/SpectacularPipeHarness.md)\<`TValue`\>

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts:57](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts#L57)

---

### provideSpectacularFeatureTest

▸ **provideSpectacularFeatureTest**(`options`, `...features`):
(`EnvironmentProviders` \| `Provider`)[]

Provide dependencies needed by the Spectacular Feature testing API.

**`Deprecated`**

Deprecated in favor of
[provideSpectacularFeatureTesting](modules.md#providespectacularfeaturetesting).
To be removed in Spectacular 16.0.

#### Parameters

| Name          | Type                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------ |
| `options`     | [`ProvideSpectacularFeatureTestOptions`](interfaces/ProvideSpectacularFeatureTestOptions.md)            |
| `...features` | ([`InitialFeatureNavigationFeature`](modules.md#initialfeaturenavigationfeature) \| `RouterFeatures`)[] |

#### Returns

(`EnvironmentProviders` \| `Provider`)[]

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-test.ts:25](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-test.ts#L25)

---

### provideSpectacularFeatureTesting

▸ **provideSpectacularFeatureTesting**(`options`, `...features`):
(`EnvironmentProviders` \| `Provider`)[]

Provide dependencies needed by the Spectacular Feature testing API.

#### Parameters

| Name          | Type                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------ |
| `options`     | [`ProvideSpectacularFeatureTestingOptions`](interfaces/ProvideSpectacularFeatureTestingOptions.md)      |
| `...features` | ([`InitialFeatureNavigationFeature`](modules.md#initialfeaturenavigationfeature) \| `RouterFeatures`)[] |

#### Returns

(`EnvironmentProviders` \| `Provider`)[]

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:36](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L36)

---

### withInitialFeatureNavigation

▸ **withInitialFeatureNavigation**():
[`InitialFeatureNavigationFeature`](modules.md#initialfeaturenavigationfeature)

Navigate to the specified feature path when the test is initialized.

**`Example`**

```typescript
providers: [
  provideSpectacularFeatureTesting(
    {
      featurePath: 'heroes',
      routes: [
        { path: 'heroes', loadChildren: () => heroesRoutes },
      ],
    },
    withInitialFeatureNavigation(),
  ),
],
```

#### Returns

[`InitialFeatureNavigationFeature`](modules.md#initialfeaturenavigationfeature)

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/with-initial-feature-navigation.ts:40](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/configuration/with-initial-feature-navigation.ts#L40)
