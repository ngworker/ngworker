import {
  Axis,
  Matrix,
  MatrixY,
  MatrixX,
  MatrixReturnType,
  Table,
  NON_VALID_AXIS,
} from './mat-table.plugin.models';

export class CdkTableUtil {

  /**
   * createNumMatrix
   * @param axis
   * @param tableInfo
   */
  static createNumMatrix<K extends keyof Axis, N extends number>(
    axis: K,
    tableInfo: Table<N>
  ): MatrixReturnType<K, N> {
    let result: unknown;
    const enumeration = CdkTableUtil.createEnumerationList(tableInfo.cellCount);

    if (axis === 'y') {
      result = CdkTableUtil.createYBasedMatrix(enumeration, tableInfo.columnCount);
    } else {
      result = CdkTableUtil.createXBasedMatrix(enumeration, tableInfo.columnCount);
    }

    return result as MatrixReturnType<K, N>;
  }


  /**
   * getTableInfo
   * @param element
   * @param rowSel
   * @param cellSel
   */
  static tableInfo(element: HTMLElement, rowSel: string, cellSel: string): Table {
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

  /**
   * createEnumerationList
   * @param cellCount
   */
  static createEnumerationList<T extends number>(cellCount: T): T[] {
    const cellCountArr = new Array<T>(cellCount);
    for (let i = 0; i < cellCount; ++i) {
      cellCountArr[i] = i as T;
    }

    return cellCountArr;
  }

  /**
   * createYBasedMatrix
   * @source https://stackoverflow.com/questions/8495687/split-array-into-chunks#55435856
   * @param enumeration
   * @param chunk
   */
  static createYBasedMatrix<T extends PropertyKey>(enumeration: T[], chunk: number): MatrixY<T> {
    function* _chunks(_enumeration: T[], chunk1: number) {
      for (let i = 0; i < _enumeration.length; i += chunk1) {
        yield enumeration.slice(i, i + chunk1);
      }
    }

    return [..._chunks(enumeration, chunk)] as MatrixY<T>;
  }

  /**
   * createXBasedMatrix
   * @source https://stackoverflow.com/questions/16348226/horizontal-to-vertical-in-a-javascript-array#16348407
   * @param enumeration
   * @param chunk
   */
  static createXBasedMatrix<T extends PropertyKey>(enumeration: T[], chunk: number): MatrixX<T> {
    const rows = Math.round(enumeration.length / chunk);
    return CdkTableUtil.sortXBased(enumeration, rows) as MatrixX<T>;
  }

  /**
   * sortYBased
   * @param list
   * @param rows
   */
  static sortXBased<T>(list: T[], rows: number): T[][] {
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
   * findAxisByValue
   * @param value
   * @param matrix
   */
  static findAxis<T extends PropertyKey>(value: T, matrix: Matrix<T>) {
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
   * findIndexOfNodeList
   * @param list
   * @param element
   */
  static findIndexOf<
    E extends Element,
    L extends NodeListOf<E>
  >(list: L, element: E): number {
    for (let i = 0, len = list?.length ?? 0; i < len; i++) {
      if (element === list[i]) {
        return i;
      }
    }

    return -1;
  }

  /**
   * isLeftOrRightArrow
   * @param x
   * @param y
   */
  static isLeftOrRightArrow(x: number, y: number) {
    return y === NON_VALID_AXIS && x >= 0;
  }

  /**
   * isUpOrDownArrow
   * @param x
   * @param y
   */
  static isUpOrDownArrow(x: number, y: number) {
    return y >= 0 && x === NON_VALID_AXIS;
  }
}
