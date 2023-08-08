---
id: 'SpectacularFeatureTestingModuleOptions'
title: 'Interface: SpectacularFeatureTestingModuleOptions'
sidebar_label: 'SpectacularFeatureTestingModuleOptions'
sidebar_position: 0
custom_edit_url: null
---

Feature testing options for `SpectacularFeatureTestingModule.withFeature`.

## Properties

### featurePath

• `Readonly` **featurePath**: `string`

The path prefix used to load the routes of the specified Angular feature module,
for example `'heroes'`.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts:16](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts#L16)

---

### routerOptions

• `Optional` `Readonly` **routerOptions**: `ExtraOptions`

Optional Angular `Router` options.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts:20](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts#L20)

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

[packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts:32](https://github.com/ngworker/ngworker/blob/d3bf6f9/packages/spectacular/src/lib/feature-testing/feature-testing-module/spectacular-feature-testing.module.ts#L32)
