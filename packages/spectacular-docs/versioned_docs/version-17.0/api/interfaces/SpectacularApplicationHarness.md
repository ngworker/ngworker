# Interface: SpectacularApplicationHarness

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:8](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L8)

A harness for testing application-level software artifacts.

## Properties

### rootComponent

> `readonly` **rootComponent**:
> [`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:74](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L74)

The bootstrapped component.

---

### rootFixture

> `readonly` **rootFixture**:
> `ComponentFixture`\<[`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)\>

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:78](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L78)

The component fixture for the bootstrapped component.

## Methods

### inject()

#### Call Signature

> **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `T`

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:20](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L20)

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

The default value in case the specified dependency has not been provided.
Optional. Default is `null`.

###### options

`InjectOptions` & `object`

Dependency injection options. Optional.

##### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

#### Call Signature

> **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `null` \| `T`

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:27](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L27)

##### Type Parameters

###### T

`T`

##### Parameters

###### token

`ProviderToken`\<`T`\>

###### notFoundValue

`undefined` | `null`

###### options

`InjectOptions`

##### Returns

`null` \| `T`

#### Call Signature

> **inject**\<`T`\>(`token`, `notFoundValue?`, `options?`): `T`

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:32](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L32)

##### Type Parameters

###### T

`T`

##### Parameters

###### token

`ProviderToken`\<`T`\>

###### notFoundValue?

`T`

###### options?

`InjectOptions`

##### Returns

`T`

#### Call Signature

> **inject**\<`T`\>(`token`, `notFoundValue?`, `flags?`): `T`

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:51](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L51)

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

The default value in case the specified dependency has not been provided.
Optional. Default is `null`.

###### flags?

`InjectFlags`

Dependency injection options, for example
`InjectFlags.Optional | InjectFlags.SkipSelf`. Optional. Default is
`InjectFlags.Default`.

##### Returns

`T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

##### Deprecated

Use object-based flags (`InjectOptions`) instead.

#### Call Signature

> **inject**\<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| `T`

Defined in:
[packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts:66](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/application-testing/application-harness/spectacular-application-harness.ts#L66)

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

The default value in case the specified dependency has not been provided.
Optional. Default is `null`.

###### flags?

`InjectFlags`

Dependency injection options, for example
`InjectFlags.Optional | InjectFlags.SkipSelf`. Optional. Default is
`InjectFlags.Default`.

##### Returns

`null` \| `T`

The instance from the injector if defined, otherwise the `notFoundValue`.

##### Throws

When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`

##### Deprecated

Use object-based flags (`InjectOptions`) instead.
