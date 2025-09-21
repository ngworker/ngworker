# Class: SpectacularFeatureLocation

Defined in: [packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-location.ts:13](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-location.ts#L13)

A subset of Angular's `Location` service adjusted to the Angular feature module under test.

## Constructors

### Constructor

> **new SpectacularFeatureLocation**(): `SpectacularFeatureLocation`

#### Returns

`SpectacularFeatureLocation`

## Methods

### path()

> **path**(`includeHash`): `string`

Defined in: [packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-location.ts:26](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-location.ts#L26)

Normalizes the URL path for this location. URLs within the Angular feature module under test are prefixed with tilde (`~`).

Wraps `Location#path`.

#### Parameters

##### includeHash

`boolean` = `false`

True to include an anchor fragment in the path. Optional. Default is `false`.

#### Returns

`string`
