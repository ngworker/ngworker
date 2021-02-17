import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

export interface Table<N extends number = number, E extends Element = Element> {
  readonly rowCount: N;
  readonly columnCount: N;
  readonly cellCount: N;
  readonly cells: NodeListOf<E>;
}

export interface Axis {
  y: number;
  x: number;
}

export type Direction =
  | typeof UP_ARROW
  | typeof DOWN_ARROW
  | typeof LEFT_ARROW
  | typeof RIGHT_ARROW;

export type MatrixY<T extends PropertyKey> = T[][] & { _brand: 'matrix_y' };

export type MatrixX<T extends PropertyKey> = T[][] & { _brand: 'matrix_x' };

export type Matrix<T extends PropertyKey> = MatrixY<T> | MatrixX<T>;

// @todo: works not well!
export type MatrixReturnType<
  T extends string,
  K extends PropertyKey
> = T extends 'y' ? MatrixY<K> : T extends 'x' ? MatrixX<K> : never;

export const NON_VALID_AXIS = -1;
