---
id: 'SpectacularPipeHarness'
title: 'Class: SpectacularPipeHarness<TValue>'
sidebar_label: 'SpectacularPipeHarness'
sidebar_position: 0
custom_edit_url: null
---

A harness for testing an Angular pipe.

Includes an API to write a value and read the rendered text.

## Type parameters

| Name     |
| :------- |
| `TValue` |

## Constructors

### constructor

• **new SpectacularPipeHarness**<`TValue`\>()

#### Type parameters

| Name     |
| :------- |
| `TValue` |

## Accessors

### template

• `Abstract` `set` **template**(`template`): `void`

Replace the pipe component template.

NOTE! The `value` property is in context of the specified template.

#### Parameters

| Name       | Type     | Description                                                                                    |
| :--------- | :------- | :--------------------------------------------------------------------------------------------- |
| `template` | `string` | The component template used to test the Angular pipe, for example `'{{ value \| camelize }}'`. |

#### Returns

`void`

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:18](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L18)

---

### text

• `Abstract` `get` **text**(): `string`

Read the text rendered in the pipe component template.

#### Returns

`string`

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:22](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L22)

---

### value

• `Abstract` `set` **value**(`value`): `void`

Update the value passed through the Angular pipe.

#### Parameters

| Name    | Type                                          | Description    |
| :------ | :-------------------------------------------- | :------------- |
| `value` | `null` \| `TValue` \| `Observable`<`TValue`\> | The new value. |

#### Returns

`void`

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:28](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L28)

## Methods

### inject

▸ `Abstract` **inject**<`T`\>(`token`, `notFoundValue`, `options`): `T`

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:40](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L40)

▸ `Abstract` **inject**<`T`\>(`token`, `notFoundValue`, `options`): `null` \|
`T`

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:47](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L47)

▸ `Abstract` **inject**<`T`\>(`token`, `notFoundValue?`, `options?`): `T`

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:52](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L52)

▸ `Abstract` **inject**<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:71](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L71)

▸ `Abstract` **inject**<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| `T`

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:90](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L90)
