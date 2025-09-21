# Interface: SpectacularFeatureHarness

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:10](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L10)

A harness for testing an Angular feature module.

## Properties

### location

> `readonly` **location**: [`SpectacularFeatureLocation`](../classes/SpectacularFeatureLocation.md)

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:77](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L77)

A subset of Angular's `Location` service adjusted to the Angular feature module under test.

---

### rootComponent

> `readonly` **rootComponent**: [`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:81](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L81)

The bootstrapped component.

---

### rootFixture

> `readonly` **rootFixture**: `ComponentFixture`\<[`SpectacularAppComponent`](../classes/SpectacularAppComponent.md)\>

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:85](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L85)

The component fixture for the bootstrapped component.

---

### router

> `readonly` **router**: [`SpectacularFeatureRouter`](../classes/SpectacularFeatureRouter.md)

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:90](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L90)

A subset of Angular's `Router` API adjusted to the Angular feature module under test.

## Methods

### inject()

#### Call Signature

> **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `T`

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:22](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L22)

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

> **inject**\<`T`\>(`token`, `notFoundValue`, `options`): `null` \| `T`

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:29](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L29)

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

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:34](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L34)

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

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:53](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L53)

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

> **inject**\<`T`\>(`token`, `notFoundValue`, `flags?`): `null` \| `T`

Defined in: [packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts:68](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/feature-harness/spectacular-feature-harness.ts#L68)

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
