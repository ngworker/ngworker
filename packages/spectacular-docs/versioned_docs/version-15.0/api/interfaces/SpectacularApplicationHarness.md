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

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:74](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L74)

---

### rootFixture

• `Readonly` **rootFixture**: `ComponentFixture`\<[`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)\>

The component fixture for the bootstrapped component.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:78](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L78)

## Methods

### inject

▸ **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `T`

Resolve a dependency based on the specified dependency injection token.

**`Throws`**

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `token` | `ProviderToken`\<`T`\> | The token representing the dependency, that is a class or an `InjectionToken`. |
| `notFoundValue` | `undefined` | The default value in case the specified dependency has not been provided. Optional. Default is `null`. |
| `options` | `InjectOptions` & \{ `optional?`: `false` } | Dependency injection options. Optional. |

#### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:20](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L20)

▸ **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `null` \| `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                   |
| :-------------- | :--------------------- |
| `token`         | `ProviderToken`\<`T`\> |
| `notFoundValue` | `undefined` \| `null`  |
| `options`       | `InjectOptions`        |

#### Returns

`null` \| `T`

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:27](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L27)

▸ **inject**\<`T`\>(`token`, `notFoundValue?`, `options?`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name             | Type                   |
| :--------------- | :--------------------- |
| `token`          | `ProviderToken`\<`T`\> |
| `notFoundValue?` | `T`                    |
| `options?`       | `InjectOptions`        |

#### Returns

`T`

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:32](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L32)

▸ **inject**\<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

Resolve a dependency based on the specified dependency injection token.

**`Throws`**

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

**`Deprecated`**

Use object-based flags (`InjectOptions`) instead.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `token` | `ProviderToken`\<`T`\> | The token representing the dependency, that is a class or an `InjectionToken`. |
| `notFoundValue?` | `T` | The default value in case the specified dependency has not been provided. Optional. Default is `null`. |
| `flags?` | `InjectFlags` | Dependency injection options, for example `InjectFlags.Optional \| InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`. |

#### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:51](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L51)

▸ **inject**\<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| `T`

Resolve a dependency based on the specified dependency injection token.

**`Throws`**

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

**`Deprecated`**

Use object-based flags (`InjectOptions`) instead.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `token` | `ProviderToken`\<`T`\> | The token representing the dependency, that is a class or an `InjectionToken`. |
| `notFoundValue` | `null` | The default value in case the specified dependency has not been provided. Optional. Default is `null`. |
| `flags?` | `InjectFlags` | Dependency injection options, for example `InjectFlags.Optional \| InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`. |

#### Returns

`null` \| `T`

The instance from the injector if defined, otherwise the `notFoundValue`.

#### Defined in

[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:66](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L66)
