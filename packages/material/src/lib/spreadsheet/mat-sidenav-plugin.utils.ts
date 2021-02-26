// @note: patched version of source
// @source: https://fettblog.eu/typescript-better-object-keys/#option-2.-extending-object-constructor
// prettier-ignore
export type ObjectKeys<T> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends object ? (keyof T)[] :
  T extends number | boolean | symbol ? [] :
  T extends ArrayLike<any> | string ? string[] :
  T extends null | undefined ? 'Cannot convert undefined or null to object'
  : never;

export function keys<T>(object: T): ObjectKeys<T> {
  return Object.keys(object) as ObjectKeys<T>;
}

// @author: Alex Okrushko
// @note: useful utils when working with typescript`s strict mode
// @source: https://lookout.dev/rules/better-types-when-extracting-the-keys-and-entries-from-an-object-or-an-enum
export function entries<
  // eslint-disable-next-line @typescript-eslint/ban-types
  O extends object,
  K = keyof O,
  V = O extends { [key: string]: infer L } ? L : never
>(object: O): Array<[K, V]> {
  return (Object.entries(object) as unknown) as Array<[K, V]>;
}

// prettier-ignore
// Object.entries
// https://github.com/microsoft/TypeScript/issues/35101
declare function entries2<T>( o: T): T extends ArrayLike<infer U> ?
  [string, U][] : { [K in keyof T]: [K, T[K]] }[keyof T][];

// prettier-ignore
// Object.values
// https://github.com/microsoft/TypeScript/issues/35101
// https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
export type ObjectValues<T> = T extends ArrayLike<infer U> ? U[] : T[keyof T][];
export function values<T>(o: T): ObjectValues<T> {
  return (Object.values(o) as unknown) as ObjectValues<T>;
}

// `keyof any` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
// @source: https://dev.to/kingdaro/indexing-objects-in-typescript-1cgi
function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

// @source: https://twitter.com/gc_psk/status/1353298960551653376
export function assertExists<T>(value: T | undefined): asserts value is T {
  if (!value) {
    throw new Error(`value is undefined!`);
  }
}
