---
id: 'CreateFeatureHarnessOptions'
title: 'Interface: CreateFeatureHarnessOptions'
sidebar_label: 'CreateFeatureHarnessOptions'
sidebar_position: 0
custom_edit_url: null
---

Feature harness options.

## Hierarchy

- `Pick`<`NgModule`, `"imports"` \| `"providers"`\>

  ↳ **`CreateFeatureHarnessOptions`**

## Properties

### featurePath

• `Readonly` **featurePath**: `string`

The route path used to load the routes of the specified Angular feature module,
for example `'heroes'`.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:20](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L20)

---

### imports

• `Optional` **imports**: (`any`[] \| `Type`<`any`\> \|
`ModuleWithProviders`<{}\>)[]

The set of NgModules whose exported [declarables](guide/glossary#declarable) are
available to templates in this module.

**`Usage Notes`**

A template can use exported declarables from any imported module, including
those from modules that are imported indirectly and re-exported. For example,
`ModuleA` imports `ModuleB`, and also exports it, which makes the declarables
from `ModuleB` available wherever `ModuleA` is imported.

### Example

The following example allows MainModule to use anything exported by
`CommonModule`:

```javascript
@NgModule({
  imports: [CommonModule],
})
class MainModule {}
```

#### Inherited from

Pick.imports

#### Defined in

node_modules/@angular/core/index.d.ts:5733

---

### providers

• `Optional` **providers**: (`Provider` \| `EnvironmentProviders`)[]

The set of injectable objects that are available in the injector of this module.

**`See`**

- [Dependency Injection guide](guide/dependency-injection)
- [NgModule guide](guide/providers)

**`Usage Notes`**

Dependencies whose providers are listed here become available for injection into
any component, directive, pipe or service that is a child of this injector. The
NgModule used for bootstrapping uses the root injector, and can provide
dependencies to any part of the app.

A lazy-loaded module has its own injector, typically a child of the app root
injector. Lazy-loaded services are scoped to the lazy-loaded module's injector.
If a lazy-loaded module also provides the `UserService`, any component created
within that module's context (such as by router navigation) gets the local
instance of the service, not the instance in the root injector. Components in
external modules continue to receive the instance provided by their injectors.

### Example

The following example defines a class that is injected in the HelloWorld
NgModule:

```
class Greeter {
   greet(name:string) {
     return 'Hello ' + name + '!';
   }
}

@NgModule({
  providers: [
    Greeter
  ]
})
class HelloWorld {
  greeter:Greeter;

  constructor(greeter:Greeter) {
    this.greeter = greeter;
  }
}
```

#### Inherited from

Pick.providers

#### Defined in

node_modules/@angular/core/index.d.ts:5678

---

### routerOptions

• `Optional` `Readonly` **routerOptions**: `ExtraOptions`

Optional Angular `Router` options.

#### Defined in

[packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:24](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L24)

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

[packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts:36](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/feature-testing/feature-harness/create-feature-harness.ts#L36)
