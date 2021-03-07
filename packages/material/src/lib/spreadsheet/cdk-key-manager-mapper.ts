import {
  Axis,
  CdkDragDropPrevNext,
  CdkTableDropListState,
  Direction,
  FocusHighlightable,
  MatrixX,
  MatrixY,
  NON_VALID_AXIS,
  Table,
} from './cdk-spreadsheet.types';

import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { delay, takeUntil } from 'rxjs/operators';
import { assertExists } from './ts-strict.utils';
import * as matrixUtils from './cdk-key-manager-mapper.utils';

export class CdkKeyManagerMapper<T extends FocusHighlightable> {
  private readonly _unsub$ = new Subject();

  private _matrixY: MatrixY<number> | undefined;
  private _matrixX: MatrixX<number> | undefined;
  private _currTableAxis: Axis = { x: -1, y: -1 };

  private readonly _focusedNextItem = this._keyManager.change
    .pipe(delay(0), takeUntil(this._unsub$))
    .subscribe(_ => this._keyManager.activeItem?.focusActiveItem());

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _table: Table,
    private _keyManager: ActiveDescendantKeyManager<T>,
    private _cellSel = '.cdk-cell'
  ) {
    this.init();
  }

  init() {
    this._createMatrix(this._table.cellCount, this._table.columnCount);
    return this;
  }

  get activeItem() {
    return this._keyManager.activeItem;
  }

  setState({ table, dropped }: CdkTableDropListState) {
    this._table = table;
    this._createMatrix(table.cellCount, table.columnCount);
    this.setAxisXByColumns(dropped, this._currTableAxis.x);
  }

  private _createMatrix(cellCount: number, columnCount: number) {
    this._matrixY = matrixUtils.createByAxis('y', cellCount, columnCount);
    this._matrixX = matrixUtils.createByAxis('x', cellCount, columnCount);
  }

  setActiveItem(value: unknown) {
    if (typeof value === 'number' && value >= 0) {
      this._keyManager.setActiveItem(value);
    } else if (value instanceof MouseEvent) {
      this.setActiveItemAxis(this.getKeyMangerItemAxis(value));
    } else if (typeof value !== 'undefined') {
      this._keyManager.setActiveItem(value as T);
    }
  }

  setNextItemActive() {
    if (this.canNextItemActive()) {
      this._keyManager.setNextItemActive();
    }
  }

  setItemByArrowDirection(dir: Direction) {
    const axisPos = this.getAxisByDir(dir);
    if (dir === LEFT_ARROW || dir === RIGHT_ARROW) {
      this.setActiveItemAxis({ x: axisPos });
    } else if (dir === UP_ARROW || dir === DOWN_ARROW) {
      this.setActiveItemAxis({ y: axisPos });
    }
  }

  canNextItemActive(axis: keyof Axis = 'y') {
    const axisPos = this.getAxisByDir(DOWN_ARROW);
    return !!this.setTableByAxis(axisPos, axis);
  }

  setActiveItemAxis(tableAxisItem: Partial<Axis>) {
    const tableAxisItemY = tableAxisItem.y ?? NON_VALID_AXIS;
    const tableAxisItemX = tableAxisItem.x ?? NON_VALID_AXIS;

    let keyManagerItemIndex: number | undefined;
    if (matrixUtils.isYMove(tableAxisItemX, tableAxisItemY)) {
      keyManagerItemIndex = this.setTableByAxis(tableAxisItemY, 'y');
    } else if (matrixUtils.isXMove(tableAxisItemX, tableAxisItemY)) {
      keyManagerItemIndex = this.setTableByAxis(tableAxisItemX, 'x');
    } else {
      keyManagerItemIndex = this.getKeyMangerItemIndex(
        tableAxisItemY,
        tableAxisItemX
      );
    }

    this.setActiveItem(keyManagerItemIndex);
  }

  // @todo: this function set and gets! What to do?
  setTableByAxis(tableAxisItem: number, ax: keyof Axis) {
    const itemIndex = this.getKeyMangerItemIndex(tableAxisItem, ax);
    if (typeof itemIndex === 'number' && itemIndex >= 0) {
      this._currTableAxis[ax] = tableAxisItem;
    }

    return itemIndex;
  }

  getKeyMangerItemIndex(axisVal: number, axisTypeOrIndex: keyof Axis | number) {
    if (axisTypeOrIndex === 'y') {
      return this._matrixX?.[axisVal]?.[this._currTableAxis.x];
    } else if (axisTypeOrIndex === 'x') {
      return this._matrixX?.[this._currTableAxis.y]?.[axisVal];
    } else {
      return this._matrixX?.[axisVal]?.[axisTypeOrIndex];
    }
  }

  setAxisXByColumns(prevNextIndex: CdkDragDropPrevNext, x: number) {
    const { previousIndex, currentIndex } = prevNextIndex;
    // when columns on the right boundary of the active cell are changed
    if (currentIndex > x && previousIndex > x) {
      this._currTableAxis = { ...this._currTableAxis };
      // when columns on the left boundary of the active cell is changed
    } else if (currentIndex < x && previousIndex < x) {
      this._currTableAxis = { ...this._currTableAxis };
      // when column contain the active cell
    } else if (previousIndex === x) {
      this._currTableAxis.x = currentIndex;
      // when column moved from left to right over the active cell
    } else if (previousIndex > x) {
      this._currTableAxis.x += 1;
      // when column moved from right to left over the active cell
    } else if (previousIndex < x) {
      this._currTableAxis.x -= 1;
    }

    // @why: ExpressionChangedAfterItHasBeenCheckedError! How can be solved this?
    setTimeout(() => this.setActiveItemAxis(this._currTableAxis), 0);
  }

  getKeyMangerItemAxis(event: MouseEvent): Axis {
    // @todo: we can pass this._table so that we can remove assertExists
    assertExists(this._table);
    const currentColIndex = matrixUtils.findIndexOf(
      this._table.cells,
      event.target as Element
    );

    assertExists(this._matrixY);
    const tableAxis = matrixUtils.findAxis(currentColIndex, this._matrixY);

    return (this._currTableAxis = tableAxis);
  }

  getAxisByDir(dir: Direction) {
    const currentAxis = this._currTableAxis;
    switch (dir) {
      case UP_ARROW:
        return currentAxis.y - 1;
      case DOWN_ARROW:
        return currentAxis.y + 1;
      case LEFT_ARROW:
        return currentAxis.x - 1;
      case RIGHT_ARROW:
        return currentAxis.x + 1;
    }
  }

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
