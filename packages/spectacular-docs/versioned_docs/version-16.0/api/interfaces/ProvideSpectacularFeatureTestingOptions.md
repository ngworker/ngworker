---
id: 'ProvideSpectacularFeatureTestingOptions'
title: 'Interface: ProvideSpectacularFeatureTestingOptions'
sidebar_label: 'ProvideSpectacularFeatureTestingOptions'
sidebar_position: 0
custom_edit_url: null
---

Options for
[provideSpectacularFeatureTesting](../modules.md#providespectacularfeaturetesting).

## Properties

### featurePath

• `Readonly` **featurePath**: `string`

The path prefix used to load the routes of the specified Angular feature, for
example `'heroes'`.

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:18](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L18)

---

### routes

• `Readonly` **routes**: `Routes`

One or more feature routes to load.

NOTE! It is unnecessary to lazy-load feature modules in tests, so we can
statically return an Angular module from the `loadChildren` callback.

**`Example`**

```typescript
[{ path: 'heroes', loadChildren: () => HeroesModule }];
```

#### Defined in

[packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts:30](https://github.com/ngworker/ngworker/blob/81124b8/packages/spectacular/src/lib/feature-testing/configuration/provide-spectacular-feature-testing.ts#L30)
