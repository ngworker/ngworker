---
id: "SpectacularFeatureHarness"
title: "Interface: SpectacularFeatureHarness"
sidebar_label: "SpectacularFeatureHarness"
sidebar_position: 0
custom_edit_url: null
---

A harness for testing an Angular feature module.

## Properties

### location

• `Readonly` **location**: [`SpectacularFeatureLocation`](../classes/SpectacularFeatureLocation.md)

A subset of Angular's `Location` service adjusted to the Angular feature
module under test.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:41](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L41)

___

### rootComponent

• `Readonly` **rootComponent**: [`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)

The bootstrapped component.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:45](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L45)

___

### rootFixture

• `Readonly` **rootFixture**: `ComponentFixture`<[`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)\>

The component fixture for the bootstrapped component.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:49](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L49)

___

### router

• `Readonly` **router**: [`SpectacularFeatureRouter`](../classes/SpectacularFeatureRouter.md)

A subset of Angular's `Router` API adjusted to the Angular feature module
under test.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:54](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L54)

## Methods

### inject

▸ **inject**<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

Resolve a dependency based on the specified dependency injection token.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Type`<`T`\> \| `InjectionToken`<`T`\> \| `AbstractType`<`T`\> | The token representing the dependency, that is a class or an `InjectionToken`. |
| `notFoundValue?` | `T` | The default value in case the specified dependency has not been provided. Optional. Default is `null`. |
| `flags?` | `InjectFlags` | Dependency injection options, for example `InjectFlags.Optional \| InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`. |

#### Returns

`T`

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:27](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L27)

▸ **inject**<`T`\>(`token`, `notFoundValue`, `flags?`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `Type`<`T`\> \| `InjectionToken`<`T`\> \| `AbstractType`<`T`\> |
| `notFoundValue` | ``null`` |
| `flags?` | `InjectFlags` |

#### Returns

``null`` \| `T`

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:32](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L32)
