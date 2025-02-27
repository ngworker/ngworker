---
id: 'CreatePipeHarnessOptions'
title: 'Interface: CreatePipeHarnessOptions<TValue>'
sidebar_label: 'CreatePipeHarnessOptions'
sidebar_position: 0
custom_edit_url: null
---

Angular pipe harness options.

## Type parameters

| Name     |
| :------- |
| `TValue` |

## Hierarchy

- `Pick`<`NgModule`, `"declarations"` \| `"imports"` \| `"providers"`\>

  ↳ **`CreatePipeHarnessOptions`**

## Properties

### declarations

• `Optional` **declarations**: (`any`[] \| `Type`<`any`\>)[]

The set of components, directives, and pipes
([declarables](guide/glossary#declarable)) that belong to this module.

**`Usage Notes`**

The set of selectors that are available to a template include those declared
here, and those that are exported from imported NgModules.

Declarables must belong to exactly one module. The compiler emits an error if
you try to declare the same class in more than one module. Be careful not to
declare a class that is imported from another module.

### Example

The following example allows the CommonModule to use the `NgFor` directive.

```javascript
@NgModule({
  declarations: [NgFor],
})
class CommonModule {}
```

#### Inherited from

Pick.declarations

#### Defined in

node_modules/@angular/core/index.d.ts:5705

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

### pipe

• `Readonly` **pipe**: `Type`<`PipeTransform`\>

The type of the Angular pipe-under-test, for example `CamelizePipe`.

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts:18](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts#L18)

---

### pipeName

• `Readonly` **pipeName**: `string`

The name of the Angular pipe-under-test, for example `camelize`.

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts:22](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts#L22)

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

### template

• `Optional` `Readonly` **template**: `string`

The template used to test the Angular pipe, for example
`'{{ value | camelize }}'`.

NOTE! The `value` property is in context of the template.

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts:29](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts#L29)

---

### value

• `Readonly` **value**: `null` \| `TValue` \| `Observable`<`TValue`\>

The initial value passed through the Angular pipe.

#### Defined in

[packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts:33](https://github.com/ngworker/ngworker/blob/b782ad5/packages/spectacular/src/lib/pipe-testing/pipe-harness/create-pipe-harness.ts#L33)
