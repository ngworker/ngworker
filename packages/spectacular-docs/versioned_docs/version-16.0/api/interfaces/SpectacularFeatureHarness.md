---
id: 'SpectacularFeatureHarness'
title: 'Interface: SpectacularFeatureHarness'
sidebar_label: 'SpectacularFeatureHarness'
sidebar_position: 0
custom_edit_url: null
---

A harness for testing an Angular feature module.

## Properties

### location

• `Readonly` **location**:
[`SpectacularFeatureLocation`](../classes/SpectacularFeatureLocation.md)

A subset of Angular's `Location` service adjusted to the Angular feature module
under test.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:77](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L77)

---

### rootComponent

• `Readonly` **rootComponent**:
[`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)

The bootstrapped component.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:81](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L81)

---

### rootFixture

• `Readonly` **rootFixture**:
`ComponentFixture`<[`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)\>

The component fixture for the bootstrapped component.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:85](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L85)

---

### router

• `Readonly` **router**:
[`SpectacularFeatureRouter`](../classes/SpectacularFeatureRouter.md)

A subset of Angular's `Router` API adjusted to the Angular feature module under
test.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:90](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L90)

## Methods

### inject

▸ **inject**<`T`\>(`token`, `notFoundValue`, `options`): `T`

Resolve a dependency based on the specified dependency injection token.

**`Throws`**

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                       | Description                                                                                            |
| :-------------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `token`         | `ProviderToken`<`T`\>                      | The token representing the dependency, that is a class or an `InjectionToken`.                         |
| `notFoundValue` | `undefined`                                | The default value in case the specified dependency has not been provided. Optional. Default is `null`. |
| `options`       | `InjectOptions` & { `optional?`: `false` } | Dependency injection options. Optional.                                                                |

#### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:22](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L22)

▸ **inject**<`T`\>(`token`, `notFoundValue`, `options`): `null` \| `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                  |
| :-------------- | :-------------------- |
| `token`         | `ProviderToken`<`T`\> |
| `notFoundValue` | `undefined` \| `null` |
| `options`       | `InjectOptions`       |

#### Returns

`null` \| `T`

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:29](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L29)

▸ **inject**<`T`\>(`token`, `notFoundValue?`, `options?`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name             | Type                  |
| :--------------- | :-------------------- |
| `token`          | `ProviderToken`<`T`\> |
| `notFoundValue?` | `T`                   |
| `options?`       | `InjectOptions`       |

#### Returns

`T`

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:34](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L34)

▸ **inject**<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

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

| Name             | Type                  | Description                                                                                                                           |
| :--------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `token`          | `ProviderToken`<`T`\> | The token representing the dependency, that is a class or an `InjectionToken`.                                                        |
| `notFoundValue?` | `T`                   | The default value in case the specified dependency has not been provided. Optional. Default is `null`.                                |
| `flags?`         | `InjectFlags`         | Dependency injection options, for example `InjectFlags.Optional \| InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`. |

#### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:53](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L53)

▸ **inject**<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| `T`

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

| Name            | Type                  | Description                                                                                                                           |
| :-------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `token`         | `ProviderToken`<`T`\> | The token representing the dependency, that is a class or an `InjectionToken`.                                                        |
| `notFoundValue` | `null`                | The default value in case the specified dependency has not been provided. Optional. Default is `null`.                                |
| `flags?`        | `InjectFlags`         | Dependency injection options, for example `InjectFlags.Optional \| InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`. |

#### Returns

`null` \| `T`

The instance from the injector if defined, otherwise the `notFoundValue`.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:68](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L68)
