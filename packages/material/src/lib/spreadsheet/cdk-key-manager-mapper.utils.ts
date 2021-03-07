import {
  Axis,
  Matrix,
  MatrixReturnType,
  MatrixX,
  MatrixY,
  NON_VALID_AXIS,
  Table,
} from './cdk-spreadsheet.types';
import { QueryList } from '@angular/core';

/**
 * createByAxis
 * @param axis
 * @param count (cell)
 * @param chunk (column)
 */
export function createByAxis<T extends keyof Axis, N extends number>(
  axis: T,
  count: N,
  chunk: N
): MatrixReturnType<T, N> {
  let result: unknown;
  const enumeration = createEnumerationList(count);

  if (axis === 'y') {
    result = createByAxisY(enumeration, chunk);
  } else {
    result = createByAxisX(enumeration, chunk);
  }
  return result as MatrixReturnType<T, N>;
}

/**
 * createEnumerationList
 * @param count
 */
export function createEnumerationList<T extends number>(count: T): T[] {
  const cellCountArr = new Array<T>(count);
  for (let i = 0; i < count; ++i) {
    cellCountArr[i] = i as T;
  }

  return cellCountArr;
}

/**
 * createYMatrix
 * @param enumeration
 * @param chunk
 * @source https://stackoverflow.com/questions/8495687/split-array-into-chunks#55435856
 */
export function createByAxisY<T extends PropertyKey>(
  enumeration: T[],
  chunk: number
): MatrixY<T> {
  function* _chunks(_enumeration: T[], chunk1: number) {
    for (let i = 0; i < _enumeration.length; i += chunk1) {
      yield enumeration.slice(i, i + chunk1);
    }
  }

  return [..._chunks(enumeration, chunk)] as MatrixY<T>;
}

/**
 * createXMatrix
 * @param enumeration
 * @param chunk
 * @source https://stackoverflow.com/questions/16348226/horizontal-to-vertical-in-a-javascript-array#16348407
 */
export function createByAxisX<T extends PropertyKey>(
  enumeration: T[],
  chunk: number
): MatrixX<T> {
  const rows = Math.round(enumeration.length / chunk);
  return sortByXAxis(enumeration, rows) as MatrixX<T>;
}

/**
 * sortByXAxis
 * @param list
 * @param rows
 */
export function sortByXAxis<T>(list: T[], rows: number): T[][] {
  const result: T[][] = [];
  list.forEach((value, index) => {
    const group = index % rows;
    let temp = result[group];
    temp = Array.isArray(temp) ? temp : [];
    temp.push(value);
    result[group] = temp;
  });

  return result;
}

/**
 * findAxis
 * @param value
 * @param matrix
 */
export function findAxis<T extends PropertyKey>(value: T, matrix: Matrix<T>) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === value) {
        return { y: y, x: x };
      }
    }
  }

  return { y: -1, x: -1 };
}

/**
 * findIndexOf
 * @param list
 * @param element
 */
export function findIndexOf<E extends Element, L extends NodeListOf<E>>(
  list: L,
  element: E
): number {
  for (let i = 0, len = list?.length ?? 0; i < len; i++) {
    if (element === list[i]) {
      return i;
    }
  }

  return -1;
}

/**
 * isXMove
 * @param x
 * @param y
 */
export function isXMove(x: number, y: number) {
  return y === NON_VALID_AXIS && x >= 0;
}

/**
 * isYMove
 * @param x
 * @param y
 */
export function isYMove(x: number, y: number) {
  return y >= 0 && x === NON_VALID_AXIS;
}

/**
 * syncQueryList
 * @param queryList
 * @param cells
 * @param columnCount
 */
export function syncQueryList(
  queryList: QueryList<unknown>,
  cells: NodeListOf<HTMLElement>,
  columnCount: number
) {
  const sortedQueryList = queryList.toArray().sort(
    (a, b) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      findIndexOf(cells, a.elementRef.nativeElement) -
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      findIndexOf(cells, b.elementRef.nativeElement)
  );

  const result = sortByXAxis(sortedQueryList, columnCount).flat();
  queryList.reset(result);
  return queryList;
}

/**
 * getTableStateByElement
 * @param element
 * @param cellSel
 */
export function getTableStateByElement(
  element: HTMLElement,
  cellSel: string
): Table {
  const cells = element.querySelectorAll<HTMLElement>(cellSel);
  const columnCount = cells[0]?.parentElement?.childElementCount ?? 0;
  const rowCount = cells.length / columnCount;
  const cellCount = columnCount * rowCount;

  return {
    cells,
    rowCount: rowCount ?? -1,
    columnCount: columnCount ?? -1,
    cellCount: cellCount ?? -1,
  };
}
