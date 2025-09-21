---
id: 'SpectacularApplicationHarness'
title: 'Interface: SpectacularApplicationHarness'
sidebar_label: 'SpectacularApplicationHarness'
sidebar_position: 0
custom_edit_url: null
---

A harness for testing application-level software artifacts.

## Properties

### rootComponent

• `Readonly` **rootComponent**: [`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)

The bootstrapped component.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:38](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L38)

---

### rootFixture

• `Readonly` **rootFixture**: `ComponentFixture`\<[`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)\>

The component fixture for the bootstrapped component.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:42](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L42)

## Methods

### inject

▸ **inject**\<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

Resolve a dependency based on the specified dependency injection token.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `token` | `Type`\<`T`\> \| `InjectionToken`\<`T`\> \| `AbstractType`\<`T`\> | The token representing the dependency, that is a class or an `InjectionToken`. |
| `notFoundValue?` | `T` | The default value in case the specified dependency has not been provided. Optional. Default is `null`. |
| `flags?` | `InjectFlags` | Dependency injection options, for example `InjectFlags.Optional \| InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`. |

#### Returns

`T`

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:25](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L25)

▸ **inject**\<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type |
| :-- | :-- |
| `token` | `Type`\<`T`\> \| `InjectionToken`\<`T`\> \| `AbstractType`\<`T`\> |
| `notFoundValue` | `null` |
| `flags?` | `InjectFlags` |

#### Returns

`null` \| `T`

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:30](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L30)
