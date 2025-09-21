# Abstract Class: SpectacularPipeHarness\<TValue\>

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:9](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L9)

A harness for testing an Angular pipe.

Includes an API to write a value and read the rendered text.

## Type Parameters

### TValue

`TValue`

## Constructors

### Constructor

> **new SpectacularPipeHarness**\<`TValue`\>(): `SpectacularPipeHarness`\<`TValue`\>

#### Returns

`SpectacularPipeHarness`\<`TValue`\>

## Accessors

### template

#### Set Signature

> **set** `abstract` **template**(`template`): `void`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:18](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L18)

Replace the pipe component template.

NOTE! The `value` property is in context of the specified template.

##### Parameters

###### template

`string`

The component template used to test the Angular pipe, for example `'{{ value | camelize }}'`.

##### Returns

`void`

---

### text

#### Get Signature

> **get** `abstract` **text**(): `string`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:22](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L22)

Read the text rendered in the pipe component template.

##### Returns

`string`

---

### value

#### Set Signature

> **set** `abstract` **value**(`value`): `void`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:28](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L28)

Update the value passed through the Angular pipe.

##### Parameters

###### value

The new value.

`null` | `TValue` | `Observable`\<`TValue`\>

##### Returns

`void`

## Methods

### inject()

#### Call Signature

> `abstract` **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `T`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:40](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L40)

Resolve a dependency based on the specified dependency injection token.

##### Type Parameters

###### T

`T`

##### Parameters

###### token

`ProviderToken`\<`T`\>

The token representing the dependency, that is a class or an `InjectionToken`.

###### notFoundValue

`undefined`

The default value in case the specified dependency has not been provided. Optional. Default is `null`.

###### options

`InjectOptions` & `object`

Dependency injection options. Optional.

##### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

#### Call Signature

> `abstract` **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `null` \| > `T`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:47](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L47)

Resolve a dependency based on the specified dependency injection token.

##### Type Parameters

###### T

`T`

##### Parameters

###### token

`ProviderToken`\<`T`\>

The token representing the dependency, that is a class or an `InjectionToken`.

###### notFoundValue

The default value in case the specified dependency has not been provided. Optional. Default is `null`.

`undefined` | `null`

###### options

`InjectOptions`

Dependency injection options. Optional.

##### Returns

`null` \| `T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

#### Call Signature

> `abstract` **inject**\<`T`\>(`token`, `notFoundValue?`, `options?`): `T`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:52](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L52)

Resolve a dependency based on the specified dependency injection token.

##### Type Parameters

###### T

`T`

##### Parameters

###### token

`ProviderToken`\<`T`\>

The token representing the dependency, that is a class or an `InjectionToken`.

###### notFoundValue?

`T`

The default value in case the specified dependency has not been provided. Optional. Default is `null`.

###### options?

`InjectOptions`

Dependency injection options. Optional.

##### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

#### Call Signature

> `abstract` **inject**\<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:71](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L71)

Resolve a dependency based on the specified dependency injection token.

##### Type Parameters

###### T

`T`

##### Parameters

###### token

`ProviderToken`\<`T`\>

The token representing the dependency, that is a class or an `InjectionToken`.

###### notFoundValue?

`T`

The default value in case the specified dependency has not been provided. Optional. Default is `null`.

###### flags?

`InjectFlags`

Dependency injection options, for example `InjectFlags.Optional | InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`.

##### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

##### Deprecated

Use object-based flags (`InjectOptions`) instead.

#### Call Signature

> `abstract` **inject**\<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| > `T`

Defined in: [packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts:90](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/pipe-testing/pipe-harness/spectacular-pipe-harness.ts#L90)

Resolve a dependency based on the specified dependency injection token.

##### Type Parameters

###### T

`T`

##### Parameters

###### token

`ProviderToken`\<`T`\>

The token representing the dependency, that is a class or an `InjectionToken`.

###### notFoundValue

`null`

The default value in case the specified dependency has not been provided. Optional. Default is `null`.

###### flags?

`InjectFlags`

Dependency injection options, for example `InjectFlags.Optional | InjectFlags.SkipSelf`. Optional. Default is `InjectFlags.Default`.

##### Returns

`null` \| `T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

##### Deprecated

Use object-based flags (`InjectOptions`) instead.
