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

export function createByAxis<T extends keyof Axis>(
  axis: T,
  count: number,
  chunk: number
): MatrixReturnType<T, number> {
  let result: unknown;
  const enumeration = createEnumerationList(count);

  if (axis === 'y') {
    result = createByAxisY(enumeration, chunk);
  } else {
    result = createByAxisX(enumeration, chunk);
  }
  return result as MatrixReturnType<T, number>;
}

export function createEnumerationList(count: number): number[] {
  if (count < 0) {
    return [];
  }
  return new Array(count).fill(null).map((_, i) => i);
}

export function getAxisYCount<T extends number>(list: T[], chunk: T) {
  const yCount = list.length / chunk;
  if (isNaN(yCount) || !Number.isInteger(yCount)) {
    return 0;
  }

  return list.length / chunk;
}

export function createByAxisY<T extends number>(
  enumeration: T[],
  chunk: number
): MatrixY<T> {
  function* _chunks(_enumeration: T[], chunk1: number) {
    for (let i = 0; i < _enumeration.length; i += chunk1) {
      yield enumeration.slice(i, i + chunk1);
    }
  }

  const result = [..._chunks(enumeration, chunk)] as MatrixY<T>;
  if (result.flat().length < chunk) {
    return ([] as unknown) as MatrixY<T>;
  }

  return result;
}

export function createByAxisX<T extends number>(
  enumeration: T[],
  chunk: number
): MatrixX<T> {
  const rows = getAxisYCount(enumeration, chunk);
  return _createByAxisX(enumeration, rows) as MatrixX<T>;
}

export function _createByAxisX<T>(list: T[], chunk: number): T[][] {
  const result: T[][] = [];
  list.forEach((value, index) => {
    const group = index % chunk;
    if (isNaN(group)) return;

    let temp = result[group];
    temp = Array.isArray(temp) ? temp : [];
    temp.push(value);
    result[group] = temp;
  });

  return result;
}

export function findAxis<T extends number>(value: T, matrix: Matrix<T>) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === value) {
        return { y: y, x: x };
      }
    }
  }

  return { y: -1, x: -1 };
}

export function findIndexOfEl<E extends Element, L extends NodeListOf<E>>(
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

export function isXMove(x: number, y: number) {
  return y === NON_VALID_AXIS && x >= 0;
}

export function isYMove(x: number, y: number) {
  return y >= 0 && x === NON_VALID_AXIS;
}

export function syncQueryList(
  queryList: QueryList<unknown>,
  cells: NodeListOf<HTMLElement>,
  columnCount: number
) {
  const sortedQueryList = queryList.toArray().sort(
    (a, b) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      findIndexOfEl(cells, a.elementRef.nativeElement) -
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      findIndexOfEl(cells, b.elementRef.nativeElement)
  );

  const result = _createByAxisX(sortedQueryList, columnCount).flat();
  queryList.reset(result);
  return queryList;
}

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
