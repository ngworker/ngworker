import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { QueryList } from '@angular/core';
import {
  Axis,
  Direction,
  MatrixY,
  MatrixX,
  NON_VALID_AXIS,
  Table,
} from './mat-table.plugin.models';
import { CdkTableUtil } from './mat-table.plugin.utils';
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

export class CdkTableSpreadsheetKeyManager<
  T extends FocusHighlightable
  // @todo: maybe this should be injected => ActiveDescendantKeyManager
> extends ActiveDescendantKeyManager<T> {
  private _table!: Table;
  private _rowSel = '.cdk-row';
  private _cellSel = '.cdk-cell';
  private _currTableAxis!: Axis;
  private _tableMatrix!: MatrixY<number>;
  private _keyManagerMatrix!: MatrixX<number>;
  private _unsub$ = new Subject();

  constructor(
    private queryList: QueryList<T>,
    private _element: HTMLElement,
    private _cdkTableColumn: Observable<CdkTableColumn>
  ) {
    super(queryList);

    // first initialize
    this._updateTableInfo();
    this._init();

    // will be emitted when queryList (cell positions) changed in DOM
    queryList.changes
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
    this.change
      .pipe(
        delay(0),
        takeUntil(this._unsub$)
        // @todo: ??? this.focusMonitor.focusVia(this.keyManager.activeItem.nativeElement ??
      )
      .subscribe(_ => this.activeItem?.focus());
  }

  onKeydownArrow(event: KeyboardEvent) {
    const keyCode = event.keyCode as Direction;
    this._setItemByDirection(keyCode, event);
  }

  setNextItemActive() {
    if (this._canNextItemActive()) {
      super.setNextItemActive();
    }
  }

  setArrowUpItemActive(event: KeyboardEvent) {
    this._setItemByDirection(UP_ARROW, event);
  }

  setArrowDownItemActive(event: KeyboardEvent) {
    this._setItemByDirection(DOWN_ARROW, event);
  }

  setArrowLeftItemActive(event: KeyboardEvent) {
    this._setItemByDirection(LEFT_ARROW, event);
  }

  setArrowRightItemActive(event: KeyboardEvent) {
    this._setItemByDirection(RIGHT_ARROW, event);
  }

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

  get rowCount() {
    return this._table.rowCount;
  }

  get columnCount() {
    return this._table.columnCount;
  }

  get cellCount() {
    return this._table.cellCount;
  }

  get activeItemColumnIndex() {
    return this._currTableAxis.x;
  }

  get activeItemRowIndex() {
    return this._currTableAxis.y;
  }

  get activeItemRowColumnIndex() {
    return {
      x: this._currTableAxis.x,
      y: this._currTableAxis.y,
    };
  }

  get table() {
    return {
      rowCount: this._table.rowCount,
      columnCount: this._table.columnCount,
      cellCount: this._table.cellCount,
    };
  }

  setActiveItem(value: unknown) {
    if (typeof value === 'number' && value >= 0) {
      super.setActiveItem(value);
    } else if (value instanceof MouseEvent) {
      this.setActiveItemAxis(this.getKeyMangerItemAxis(value));
    } else if (typeof value !== 'undefined') {
      super.setActiveItem(value as T);
    }
  }

  setActiveItemAxis(tableAxisItem: Partial<Axis>) {
    const tableAxisItemY = tableAxisItem.y ?? NON_VALID_AXIS;
    const tableAxisItemX = tableAxisItem.x ?? NON_VALID_AXIS;

    let keyManagerItemIndex: number;
    if (CdkTableUtil.isUpOrDownArrow(tableAxisItemX, tableAxisItemY)) {
      keyManagerItemIndex = this._updateStates(tableAxisItemY, 'y');
    } else if (
      CdkTableUtil.isLeftOrRightArrow(tableAxisItemX, tableAxisItemY)
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

  getKeyMangerItemAxis(event: MouseEvent): Axis {
    const currentColIndex = CdkTableUtil.findIndexOf(
      this._table.cells,
      event.target as Element
    );
    const tableAxis = CdkTableUtil.findAxis(currentColIndex, this._tableMatrix);
    return (this._currTableAxis = tableAxis);
  }

  private _init() {
    this._tableMatrix = this._createNumMatrix('y');
    this._keyManagerMatrix = this._createNumMatrix('x');
  }

  private _updateStates(tableAxisItem: number, ax: keyof Axis) {
    const keyManagerItemIndex = this._getKeyMangerItemIndex(tableAxisItem, ax);
    this._updateTableAxisPos(keyManagerItemIndex, tableAxisItem, ax);
    return keyManagerItemIndex;
  }

  private _createNumMatrix<K extends keyof Axis, N extends number>(axis: K) {
    return CdkTableUtil.createNumMatrix(axis, this._table);
  }

  private _sortYBased<T>(list: T[]) {
    return CdkTableUtil.sortXBased(list, this._table.columnCount).flat();
  }

  private _indexOf(item: Element) {
    return CdkTableUtil.findIndexOf(this._table.cells, item);
  }

  private _updateTableInfo() {
    this._table = CdkTableUtil.tableInfo(
      this._element,
      this._rowSel,
      this._cellSel
    );
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
    this.queryList.reset(result);
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

    const axisPos = this._getPossibleTableAxis(dir);
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
    const axisPos = this._getPossibleTableAxis(DOWN_ARROW);
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

  private _getPossibleTableAxis(dir: Direction) {
    switch (dir) {
      case UP_ARROW:
        return this._currTableAxis.y - 1;
      case DOWN_ARROW:
        return this._currTableAxis.y + 1;
      case LEFT_ARROW:
        return this._currTableAxis.x - 1;
      case RIGHT_ARROW:
        return this._currTableAxis.x + 1;
    }
  }

  destroy() {
    this._table = null as never;
    this._unsub$.next();
    this._unsub$.complete();
  }
}
