import { CdkSpreadsheetKeyManager } from './cdk-spreadsheet-key-manager';
import { ElementRef, QueryList } from '@angular/core';
import { CdkHeaderRowDef } from '@angular/cdk/table';
import { Highlightable } from '@angular/cdk/a11y';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as keyCodes from '@angular/cdk/keycodes';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

export const NON_VALID_AXIS = -1;

export type KeyCodes = keyof typeof keyCodes;

export interface CdkHeaderRowDefColumns {
  columns: typeof CdkHeaderRowDef.ɵdir.inputs.columns[];
}

export interface Table<
  N extends number = number,
  E extends HTMLElement = HTMLElement
> {
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

// @todo: rename or split it!
export interface FocusShow {
  focusActiveItem: () => void;
  writeActiveItem: (value: string) => void;
  blurActiveItem: () => void;
  elementRef: ElementRef<HTMLElement>;
}

export interface FocusHighlightable extends Highlightable, FocusShow {}

export interface CdkSpreadsheetFactory<T extends FocusHighlightable> {
  create(
    columns: CdkHeaderRowDefColumns,
    queryList: QueryList<T>
  ): CdkSpreadsheetKeyManager<T>;
}

export type CdkDragDropPrevNext = Pick<
  CdkDragDrop<unknown>,
  'previousIndex' | 'currentIndex'
>;

export interface CdkTableDropListState {
  table: Table;
  dropped: CdkDragDropPrevNext;
}
