---
id: "SpectacularFeatureTestingModule"
title: "Class: SpectacularFeatureTestingModule"
sidebar_label: "SpectacularFeatureTestingModule"
sidebar_position: 0
custom_edit_url: null
---

Configure the `RouterTestingModule` and provide Spectactular services for
testing feature modules.

NOTE! Do not import directly. Use `SpectacularFeatureTestingModule.withFeature`.

NOTE! Prefer to use `createFeatureHarness`. This Angular module is a low
level building block in case you need more control over your test setup.

**`Deprecated`**

Deprecated in favor of `provideSpectacularFeatureTest`. To be
  removed in Spectacular version 16.

## Constructors

### constructor

• **new SpectacularFeatureTestingModule**()

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts:78](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts#L78)

## Methods

### withFeature

▸ `Static` **withFeature**(`options`): `ModuleWithProviders`<[`SpectacularFeatureTestingRootModule`](SpectacularFeatureTestingRootModule.md)\>

Configure the `RouterTestingModule` and provide Spectactular
services for testing feature modules.

**`Deprecated`**

Deprecated in favor of `provideSpectacularFeatureTest`. To be
  removed in Spectacular version 16.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SpectacularFeatureTestingModuleOptions`](../interfaces/SpectacularFeatureTestingModuleOptions.md) |

#### Returns

`ModuleWithProviders`<[`SpectacularFeatureTestingRootModule`](SpectacularFeatureTestingRootModule.md)\>

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts:59](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts#L59)
