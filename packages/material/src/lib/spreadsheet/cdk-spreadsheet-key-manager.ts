import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { ElementRef, QueryList } from '@angular/core';
import {
  Axis,
  Direction,
  MatrixX,
  MatrixY,
  NON_VALID_AXIS,
  Table,
} from './mat-table.plugin.models';
import { CdkMatrixKeyManagerMapper } from './cdk-matrix-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { delay, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { CdkTableColumn } from './cdk-table-drop-list';

export interface FocusShow {
  focus: () => void;
  show: () => void;
}

export interface FocusHighlightable extends Highlightable, FocusShow {}

export class CdkSpreadsheetKeyManager<T extends FocusHighlightable> {
  private cellSelector = '.cdk-cell';
  private _table!: Table;
  private _currTableAxis!: Axis;
  private _tableMatrix!: MatrixY<number>;
  private _keyManagerMatrix!: MatrixX<number>;
  private _unsub$ = new Subject();
  private _onDestroy!: () => void;

  constructor(
    private _cdkKeyManagerMapper: CdkMatrixKeyManagerMapper<T>,
    private _cdkTableColumn: Observable<CdkTableColumn>,
    private _keyManager: ActiveDescendantKeyManager<T>,
    private _queryList: QueryList<T>
  ) {
    // first initialize
    this._bootstrap();

    // will be emitted when queryList (cell positions) changed in DOM
    // @todo: das kann in matrix-table! and this should be injected into cdk-active-decendant-key-manager
    this._cdkKeyManagerMapper.cellPositions$
      .pipe(
        // re-init on any change
        tap(_ => this._updateTableInfo()),
        tap(queryList => this._updateQueryList(queryList)),
        tap(_ => this._init()),

        // update cell position
        filter(_ => !!this._currTableAxis),
        withLatestFrom(this._cdkTableColumn),
        tap(([, columns]) =>
          this._updateCellPosition(columns, this._currTableAxis.x)
        ),
        takeUntil(this._unsub$)
      )
      .subscribe();

    // focus active item whenever an item is selected by keyManager
    // @todo: nach cdk-active-decendant-key-manager
    this._cdkKeyManagerMapper.itemSelected$
      .pipe(delay(0), takeUntil(this._unsub$))
      .subscribe(_ => this._keyManager.activeItem?.focus());
  }

  get activeItem() {
    // @todo: nach cdk-active-decendant-key-manager
    return this._keyManager.activeItem;
  }

  onKeydownArrow(event: KeyboardEvent) {
    const keyCode = event.keyCode as Direction;
    this._setItemByDirection(keyCode, event);
  }

  setNextItemActive() {
    if (this._canNextItemActive()) {
      // @todo: nach cdk-active-decendant-key-manager
      this._keyManager.setNextItemActive();
    }
  }

  // @todo: nach cdk-active-decendant-key-manager
  setArrowUpItemActive(event: KeyboardEvent) {
    this._setItemByDirection(UP_ARROW, event);
  }

  // @todo: nach cdk-active-decendant-key-manager
  setArrowDownItemActive(event: KeyboardEvent) {
    this._setItemByDirection(DOWN_ARROW, event);
  }

  // @todo: nach cdk-active-decendant-key-manager
  setArrowLeftItemActive(event: KeyboardEvent) {
    this._setItemByDirection(LEFT_ARROW, event);
  }

  // @todo: nach cdk-active-decendant-key-manager
  setArrowRightItemActive(event: KeyboardEvent) {
    this._setItemByDirection(RIGHT_ARROW, event);
  }

  // @todo: nach cdk-active-decendant-key-manager
  setFirstRowItemActive() {
    console.log('implement');
  }

  setLastRowItemActive() {
    console.log('implement');
  }

  setRowIndexItemActive(rowIndex: number) {
    console.log('implement');
  }

  setRowColumnIndexItemActive(rowIndex: number, columnIndex: number) {
    console.log('implement');
  }

  setColumnPosition(from: number, to: number) {
    console.log('implement');
  }

  // @todo: nach cdk-matrix
  get rowCount() {
    return this._table.rowCount;
  }

  // @todo: nach cdk-matrix
  get columnCount() {
    return this._table.columnCount;
  }

  // @todo: nach cdk-matrix
  get cellCount() {
    return this._table.cellCount;
  }

  // @todo: nach cdk-matrix
  get activeItemColumnIndex() {
    return this._currTableAxis.x;
  }

  // @todo: nach cdk-matrix
  get activeItemRowIndex() {
    return this._currTableAxis.y;
  }

  // @todo: nach cdk-matrix
  get activeItemRowColumnIndex() {
    return {
      x: this._currTableAxis.x,
      y: this._currTableAxis.y,
    };
  }

  // @todo: nach cdk-matrix
  get table() {
    return {
      rowCount: this._table.rowCount,
      columnCount: this._table.columnCount,
      cellCount: this._table.cellCount,
    };
  }

  // @todo: nach cdk-activedescendant-key-manager
  setActiveItem(value: unknown) {
    if (typeof value === 'number' && value >= 0) {
      this._keyManager.setActiveItem(value);
    } else if (value instanceof MouseEvent) {
      this.setActiveItemAxis(this.getKeyMangerItemAxis(value));
    } else if (typeof value !== 'undefined') {
      this._keyManager.setActiveItem(value as T);
    }
  }

  // @todo: nach cdk-matrix
  setActiveItemAxis(tableAxisItem: Partial<Axis>) {
    const tableAxisItemY = tableAxisItem.y ?? NON_VALID_AXIS;
    const tableAxisItemX = tableAxisItem.x ?? NON_VALID_AXIS;

    let keyManagerItemIndex: number;
    if (this._cdkKeyManagerMapper.isYMove(tableAxisItemX, tableAxisItemY)) {
      keyManagerItemIndex = this._updateStates(tableAxisItemY, 'y');
    } else if (
      this._cdkKeyManagerMapper.isXMove(tableAxisItemX, tableAxisItemY)
    ) {
      keyManagerItemIndex = this._updateStates(tableAxisItemX, 'x');
    } else {
      keyManagerItemIndex = this._getKeyMangerItemIndex(
        tableAxisItemY,
        tableAxisItemX
      );
    }

    this.setActiveItem(keyManagerItemIndex);
  }

  // @todo: nach cdk-matrix
  getKeyMangerItemAxis(event: MouseEvent): Axis {
    const currentColIndex = this._cdkKeyManagerMapper.findIndexOf(
      this._table.cells,
      event.target as Element
    );
    const tableAxis = this._cdkKeyManagerMapper.findAxis(
      currentColIndex,
      this._tableMatrix
    );
    return (this._currTableAxis = tableAxis);
  }

  // @todo: nach cdk-matrix
  private _init() {
    this._tableMatrix = this._createNumMatrix('y');
    this._keyManagerMatrix = this._createNumMatrix('x');
  }

  // @todo: nach cdk-active
  private _updateStates(tableAxisItem: number, ax: keyof Axis) {
    const keyManagerItemIndex = this._getKeyMangerItemIndex(tableAxisItem, ax);
    this._updateTableAxisPos(keyManagerItemIndex, tableAxisItem, ax);
    return keyManagerItemIndex;
  }

  // @todo: nach cdk-active
  private _createNumMatrix<K extends keyof Axis>(axis: K) {
    return this._cdkKeyManagerMapper.createByAxis(axis);
  }

  // @todo: nach cdk-active
  private _sortYBased<T>(list: T[]) {
    return this._cdkKeyManagerMapper.sortByXAxis(list, this._table.columnCount);
  }

  private _indexOf(item: Element) {
    return this._cdkKeyManagerMapper.findIndexOf(this._table.cells, item);
  }

  private _bootstrap() {
    this._updateTableInfo();
    this._init();
  }

  private _updateTableInfo() {
    this._table = this._cdkKeyManagerMapper.setTableState(this.cellSelector);
  }

  private _updateQueryList(queryList: QueryList<T>) {
    const sortedQueryList = queryList.toArray().sort(
      (a, b) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._indexOf(a.elementRef.nativeElement) -
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._indexOf(b.elementRef.nativeElement)
    );
    const result = this._sortYBased(sortedQueryList);
    this._queryList.reset(result);
  }

  private _updateCellPosition(
    { previousIndex, currentIndex }: CdkTableColumn,
    x: number
  ) {
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

    // ExpressionChangedAfterItHasBeenCheckedError
    // @todo: see _updateStates, then _updateTableAxisPos.this._currTableAxis
    setTimeout(() => this.setActiveItemAxis(this._currTableAxis), 0);
  }

  private _setItemByDirection(dir: Direction, event: KeyboardEvent) {
    if (!(event instanceof KeyboardEvent)) {
      throw new Error('Event must be instanceof KeyboardEvent');
    }

    const axisPos = this._cdkKeyManagerMapper.findAxisByDir(
      dir,
      this._currTableAxis
    );

    if (dir === LEFT_ARROW || dir === RIGHT_ARROW) {
      this.setActiveItemAxis({ x: axisPos });
    } else if (dir === UP_ARROW || dir === DOWN_ARROW) {
      this.setActiveItemAxis({ y: axisPos });
    }

    if (axisPos >= 0) {
      event.preventDefault();
    }
  }

  private _canNextItemActive() {
    // @todo: use this.setActiveItemAxis({ x: axisPos });
    const axisPos = this._cdkKeyManagerMapper.findAxisByDir(
      DOWN_ARROW,
      this._currTableAxis
    );
    const keyManagerItemIndex = this._updateStates(axisPos, 'y');
    return !!keyManagerItemIndex;
  }

  private _getKeyMangerItemIndex(
    axisVal: number,
    axisTypeOrIndex: keyof Axis | number
  ) {
    if (axisTypeOrIndex === 'y') {
      return this._keyManagerMatrix?.[axisVal]?.[this._currTableAxis.x];
    } else if (axisTypeOrIndex === 'x') {
      return this._keyManagerMatrix?.[this._currTableAxis.y]?.[axisVal];
    } else {
      return this._keyManagerMatrix?.[axisVal]?.[axisTypeOrIndex];
    }
  }

  private _updateTableAxisPos(index: number, value: number, ax: keyof Axis) {
    if (index >= 0) {
      this._currTableAxis[ax] = value;
    }
  }

  onDestroy(onDestroy: () => void) {
    this._onDestroy = onDestroy;
  }

  destroy() {
    this._table = null as never;
    this._unsub$.next();
    this._unsub$.complete();

    this._onDestroy ? this._onDestroy() : null;
  }
}
