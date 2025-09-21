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

• **new SpectacularPipeHarness**\<`TValue`\>()

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

| Name | Type | Description |
| :-- | :-- | :-- |
| `template` | `string` | The component template used to test the Angular pipe, for example `'{{ value \| camelize }}'`. |

#### Returns

`void`

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:23](https://github.com/ngworker/ngworker/blob/c91c5ac/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L23)

---

### text

• `Abstract` `get` **text**(): `string`

Read the text rendered in the pipe component template.

#### Returns

`string`

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:27](https://github.com/ngworker/ngworker/blob/c91c5ac/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L27)

---

### value

• `Abstract` `set` **value**(`value`): `void`

Update the value passed through the Angular pipe.

#### Parameters

| Name    | Type                                           | Description    |
| :------ | :--------------------------------------------- | :------------- |
| `value` | `null` \| `TValue` \| `Observable`\<`TValue`\> | The new value. |

#### Returns

`void`

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:33](https://github.com/ngworker/ngworker/blob/c91c5ac/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L33)

## Methods

### inject

▸ `Abstract` **inject**\<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:46](https://github.com/ngworker/ngworker/blob/c91c5ac/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L46)

▸ `Abstract` **inject**\<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| `T`

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

[packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:51](https://github.com/ngworker/ngworker/blob/c91c5ac/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L51)
