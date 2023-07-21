---
id: "SpectacularFeatureLocation"
title: "Class: SpectacularFeatureLocation"
sidebar_label: "SpectacularFeatureLocation"
sidebar_position: 0
custom_edit_url: null
---

A subset of Angular's `Location` service adjusted to the Angular feature
module under test.

## Constructors

### constructor

• **new SpectacularFeatureLocation**()

## Methods

### path

▸ **path**(`includeHash?`): `string`

Normalizes the URL path for this location. URLs within the Angular feature
module under test are prefixed with tilde (`~`).

Wraps `Location#path`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `includeHash` | `boolean` | `false` | True to include an anchor fragment in the path. Optional. Default is `false`. |

#### Returns

`string`

#### Defined in

[packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-location.ts:26](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/navigation/spectacular-feature-location.ts#L26)
