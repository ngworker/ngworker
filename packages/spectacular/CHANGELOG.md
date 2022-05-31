# Spectacular changelog

# 0.3.0 (2022-05-31)

## Features

- Remove `pipeName` option from `createPipeHarness`
  ([#26](https://github.com/ngworker/ngworker/pull/26))

## **BREAKING CHANGES**

The `pipeName` option for `createPipeHarness` is removed. Instead, the pipe name
is resolved through reflection.

Migration: Remove `pipeName` option arguments for `createPipeHarness`.

# 0.2.0 (2021-03-04)

## **BREAKING CHANGES**

- `createApplicationHarness` returns `Promise<SpectacularApplicationHarness>`.

## Bug fixes

- Fix NGCC error when using Nx + Yarn
  ([#20](https://github.com/ngworker/ngworker/pull/20))
- Fix asynchronous application initializer support
  ([#19](https://github.com/ngworker/ngworker/issues/19))
- Fix support for combining asynchronous application initializer with bootstrap
  listener ([#19](https://github.com/ngworker/ngworker/issues/19))

## Build changes

- Remove `@angular/forms` dependency
  ([#21](https://github.com/ngworker/ngworker/pull/21))
- Mark `rxjs` as peer dependency
  ([#21](https://github.com/ngworker/ngworker/pull/21))

# 0.1.0 (2021-02-24)

## Features

- Application testing API
- Feature testing API
- Pipe testing API
