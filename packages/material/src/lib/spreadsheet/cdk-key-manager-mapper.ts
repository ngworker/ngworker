import {
  Axis,
  CdkDragDropCurrNext,
  CdkTableDropListState,
  Direction,
  FocusHighlightable,
  KeyCodes,
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
import { assertExists } from './mat-sidenav-plugin.utils';
import * as matrixUtils from './cdk-matrix.utils';

export class CdkKeyManagerMapper<T extends FocusHighlightable> {
  private _table: Table | undefined;
  private _matrixY: MatrixY<number> | undefined;
  private _matrixX: MatrixX<number> | undefined;
  private _currTableAxis: Axis = { x: -1, y: -1 };

  private readonly _unsub$ = new Subject();
  private readonly _selectedItem$ = this._keyManager.change
    .pipe(delay(0), takeUntil(this._unsub$))
    .subscribe(_ => this._keyManager.activeItem?.focus());

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _keyManager: ActiveDescendantKeyManager<T>,
    private _cellSel = '.cdk-cell'
  ) {}

  init(table: Table) {
    this._table = table;
    this.reCalcState();

    return this;
  }

  reCalcState() {
    assertExists(this._table);
    this.setMatrix(this._table.cellCount, this._table.columnCount);
  }

  setState({ table, dropped }: CdkTableDropListState) {
    this._table = table;
    this.setMatrix(table.cellCount, table.columnCount);
    this.setAxisXByColumns(dropped, this._currTableAxis.x);
  }

  setMatrix(cellCount: number, columnCount: number) {
    this._matrixY = matrixUtils.createByAxis('y', cellCount, columnCount);
    this._matrixX = matrixUtils.createByAxis('x', cellCount, columnCount);
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

  setItemByArrowDirection(dir: Direction, event: KeyboardEvent) {
    if (!(event instanceof KeyboardEvent)) {
      throw new Error('Event must be instanceof KeyboardEvent');
    }

    const axisPos = matrixUtils.findAxisByDir(dir, this._currTableAxis);
    if (dir === LEFT_ARROW || dir === RIGHT_ARROW) {
      this.setActiveItemAxis({ x: axisPos });
    } else if (dir === UP_ARROW || dir === DOWN_ARROW) {
      this.setActiveItemAxis({ y: axisPos });
    }
  }

  setItemByKeyCode(keyCode: KeyCodes) {
    console.log(`not setItemByKeyCode implemented`, keyCode);
  }

  canNextItemActive() {
    const axisPos = matrixUtils.findAxisByDir(DOWN_ARROW, this._currTableAxis);
    return !!this.setTableByAxis(axisPos, 'y');
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
      // @todo: what is this?
      keyManagerItemIndex = this.getKeyMangerItemIndex(
        tableAxisItemY,
        tableAxisItemX
      );
    }

    this.setActiveItem(keyManagerItemIndex);
  }

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

  setAxisXByColumns(currNextIndex: CdkDragDropCurrNext, x: number) {
    const { previousIndex, currentIndex } = currNextIndex;
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
    assertExists(this._table);
    const currentColIndex = matrixUtils.findIndexOf(
      this._table.cells,
      event.target as Element
    );

    assertExists(this._matrixY);
    const tableAxis = matrixUtils.findAxis(currentColIndex, this._matrixY);

    return (this._currTableAxis = tableAxis);
  }

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
