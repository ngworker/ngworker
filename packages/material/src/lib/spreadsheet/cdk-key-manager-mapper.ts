import {
  Axis,
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
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as matrixUtils from './cdk-matrix.utils';

export class CdkKeyManagerMapper<T extends FocusHighlightable> {
  public readonly itemSelected$ = this._keyManager.change;

  private _table!: Table;
  private _matrixY!: MatrixY<number>;
  private _matrixX!: MatrixX<number>;
  private _currTableAxis: Axis = { x: -1, y: -1 };
  private readonly _unsub$ = new Subject();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _keyManager: ActiveDescendantKeyManager<T>,
    private _cellSel = '.cdk-cell'
  ) {}

  init(table: Table) {
    this._table = table;

    this.reCalcState();
    this.initItemSelected();
    return this;
  }

  reCalcState() {
    this.setMatrixStates(this._table.cellCount, this._table.columnCount);
  }

  setState(state: CdkTableDropListState) {
    this._table = state.table;
    this.setMatrixStates(state.table.cellCount, state.table.columnCount);
    this.updateAxisXByColumns(state.dropped, this._currTableAxis.x);
  }

  get activeItem() {
    return this._keyManager.activeItem;
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

  canNextItemActive() {
    const axisPos = matrixUtils.findAxisByDir(DOWN_ARROW, this._currTableAxis);
    const keyManagerItemIndex = this.updateStates(axisPos, 'y');
    return !!keyManagerItemIndex;
  }

  setItemByDirection(dir: Direction, event: KeyboardEvent) {
    if (!(event instanceof KeyboardEvent)) {
      throw new Error('Event must be instanceof KeyboardEvent');
    }

    const axisPos = matrixUtils.findAxisByDir(dir, this._currTableAxis);
    if (dir === LEFT_ARROW || dir === RIGHT_ARROW) {
      this.setActiveItemAxis({ x: axisPos });
    } else if (dir === UP_ARROW || dir === DOWN_ARROW) {
      this.setActiveItemAxis({ y: axisPos });
    }

    if (axisPos >= 0) {
      event.preventDefault();
    }
  }

  setActiveItemAxis(tableAxisItem: Partial<Axis>) {
    const tableAxisItemY = tableAxisItem.y ?? NON_VALID_AXIS;
    const tableAxisItemX = tableAxisItem.x ?? NON_VALID_AXIS;

    let keyManagerItemIndex: number;
    if (matrixUtils.isYMove(tableAxisItemX, tableAxisItemY)) {
      keyManagerItemIndex = this.updateStates(tableAxisItemY, 'y');
    } else if (matrixUtils.isXMove(tableAxisItemX, tableAxisItemY)) {
      keyManagerItemIndex = this.updateStates(tableAxisItemX, 'x');
    } else {
      keyManagerItemIndex = this.getKeyMangerItemIndex(
        tableAxisItemY,
        tableAxisItemX
      );
    }

    this.setActiveItem(keyManagerItemIndex);
  }

  updateStates(tableAxisItem: number, ax: keyof Axis) {
    const keyManagerItemIndex = this.getKeyMangerItemIndex(tableAxisItem, ax);
    this.updateTableAxisPos(keyManagerItemIndex, tableAxisItem, ax);
    return keyManagerItemIndex;
  }

  updateTableAxisPos(index: number, value: number, ax: keyof Axis) {
    if (index >= 0) {
      this._currTableAxis[ax] = value;
    }
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

  updateAxisXByColumns(tableColumn: CdkDragDrop<string[], unknown>, x: number) {
    const { previousIndex, currentIndex } = tableColumn;
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

    // @why: ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.setActiveItemAxis(this._currTableAxis), 0);
  }

  getKeyMangerItemAxis(event: MouseEvent): Axis {
    const currentColIndex = matrixUtils.findIndexOf(
      this._table.cells,
      event.target as Element
    );
    const tableAxis = matrixUtils.findAxis(currentColIndex, this._matrixY);
    return (this._currTableAxis = tableAxis);
  }

  setMatrixStates(cellCount: number, columnCount: number) {
    this._matrixY = matrixUtils.createByAxis('y', cellCount, columnCount);
    this._matrixX = matrixUtils.createByAxis('x', cellCount, columnCount);
    return {
      ...this._matrixY,
      ...this._matrixX,
    };
  }

  initItemSelected() {
    this.itemSelected$
      .pipe(delay(0), takeUntil(this._unsub$))
      .subscribe(_ => this._keyManager.activeItem?.focus());
  }

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
