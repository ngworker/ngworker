# Class: SpectacularAppComponent

Defined in:
[packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts:18](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts#L18)

The root component which is bootstrapped for a Spectacular test.

## Constructors

### Constructor

> **new SpectacularAppComponent**(): `SpectacularAppComponent`

#### Returns

`SpectacularAppComponent`

## Properties

### routerOutlet?

> `optional` **routerOutlet**: `RouterOutlet`

Defined in:
[packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts:25](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts#L25)

The router outlet of the root component.

#### See

`getActiveComponent`.

## Methods

### getActiveComponent()

> **getActiveComponent**\<`TActiveComponent`\>(): `TActiveComponent`

Defined in:
[packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts:30](https://github.com/ngworker/ngworker/blob/68f93463b2af844af0ea290a92a5168b936997ae/packages/spectacular/src/lib/shared/app-component/spectacular-app.component.ts#L30)

Get the active top-level routed component, for example a page component.

#### Type Parameters

##### TActiveComponent

`TActiveComponent`

#### Returns

`TActiveComponent`
