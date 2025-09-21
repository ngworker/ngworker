---
id: 'SpectacularFeatureRouter'
title: 'Class: SpectacularFeatureRouter'
sidebar_label: 'SpectacularFeatureRouter'
sidebar_position: 0
custom_edit_url: null
---

A subset of Angular's `Router` server adjusted to the Angular feature module under test.

## Constructors

### constructor

• **new SpectacularFeatureRouter**()

## Methods

### navigate

▸ **navigate**(`commands`, `extras?`): `Promise`\<`boolean`\>

Navigate based on the provided array of commands and a starting point. If no starting route is provided, the navigation is absolute.

If the first command is a tilde (`~`), the navigation is relative to the feature under test.

Wraps `Router#navigate`.

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `commands` | `any`[] | An array of URL fragments with which to construct the target URL. If the path is static, can be the literal URL string. For a dynamic path, pass an array of path segments, followed by the parameters for each segment. The fragments are applied to the current URL or the one provided in the relativeTo property of the options object, if supplied. If the first command is a tilde (`~`), the navigation is relative to the feature under test. |
| `extras?` | `NavigationExtras` | An options object that determines how the URL should be constructed or interpreted. Optional. Default is `{ skipLocationChange: false }`. |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-router.ts:38](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-router.ts#L38)

---

### navigateByUrl

▸ **navigateByUrl**(`url`, `extras?`): `Promise`\<`boolean`\>

Navigates to a view using an absolute route path.

If the URL is prefixed with tilde (`~`), the navigation is relative to the feature under test.

Wraps `Router#navigateByUrl`.

#### Parameters

| Name | Type | Description |
| :-- | :-- | :-- |
| `url` | `string` \| `UrlTree` | An absolute path for a defined route. The function does not apply any delta to the current URL. If the URL is prefixed with tilde (`~`), the navigation is relative to the feature under test. |
| `extras?` | `NavigationExtras` | An object containing properties that modify the navigation strategy. Optional. Default is `{ skipLocationChange: false }`. |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-router.ts:62](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-router.ts#L62)
