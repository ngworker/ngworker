---
id: 'modules'
title: '@ngworker/spectacular'
sidebar_label: 'Exports'
sidebar_position: 0.5
custom_edit_url: null
---

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
- [SpectacularApplicationHarness](interfaces/SpectacularApplicationHarness.md)
- [SpectacularFeatureHarness](interfaces/SpectacularFeatureHarness.md)
- [SpectacularFeatureTestingModuleOptions](interfaces/SpectacularFeatureTestingModuleOptions.md)

## Type Aliases

### CreateApplicationHarnessOptions

Ƭ **CreateApplicationHarnessOptions**: `Pick`\<`NgModule`, `"imports"` \|
`"providers"`\>

Application harness options.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts:16](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts#L16)

## Variables

### spectacularAppTag

• `Const` **spectacularAppTag**: `"spectacular-app"`

The tag name of `SpectacularAppComponent`'s DOM element.

#### Defined in

[packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts:7](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts#L7)

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

[packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts:26](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/application-testing/application-harness/create-application-harness.ts#L26)

---

### createFeatureHarness

▸ **createFeatureHarness**(`options`):
[`SpectacularFeatureHarness`](interfaces/SpectacularFeatureHarness.md)

Configure `SpectacularFeatureTestingModule`, bootstrap `SpectacularAppComponent`
and navigate to the default feature route.

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `options` | [`CreateFeatureHarnessOptions`](interfaces/CreateFeatureHarnessOptions.md) |

#### Returns

[`SpectacularFeatureHarness`](interfaces/SpectacularFeatureHarness.md)

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:43](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L43)

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts:56](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts#L56)

---

### provideSpectacularFeatureTest

▸ **provideSpectacularFeatureTest**(`options`): `Provider`[]

Provide dependencies needed by the Spectacular Feature testing API.

#### Parameters

| Name      | Type                                                                                         |
| :-------- | :------------------------------------------------------------------------------------------- |
| `options` | [`ProvideSpectacularFeatureTestOptions`](interfaces/ProvideSpectacularFeatureTestOptions.md) |

#### Returns

`Provider`[]

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-test.ts:20](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-test.ts#L20)
