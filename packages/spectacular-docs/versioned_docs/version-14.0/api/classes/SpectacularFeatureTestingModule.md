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

## Constructors

### constructor

• **new SpectacularFeatureTestingModule**()

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts:67](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts#L67)

## Methods

### withFeature

▸ `Static` **withFeature**(`options`): `ModuleWithProviders`<[`SpectacularFeatureTestingRootModule`](SpectacularFeatureTestingRootModule.md)\>

Configures the `RouterTestingModule` and provides Spectactular
services for testing feature modules

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SpectacularFeatureTestingModuleOptions`](../interfaces/SpectacularFeatureTestingModuleOptions.md) |

#### Returns

`ModuleWithProviders`<[`SpectacularFeatureTestingRootModule`](SpectacularFeatureTestingRootModule.md)\>

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts:50](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts#L50)
