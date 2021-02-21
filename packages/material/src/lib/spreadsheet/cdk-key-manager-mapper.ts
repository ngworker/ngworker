import {
  Axis,
  Direction,
  MatrixX,
  MatrixY,
  NON_VALID_AXIS,
  Table,
} from './mat-table.plugin.models';

import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

import { ElementRef, QueryList } from '@angular/core';
import { FocusHighlightable } from './cdk-spreadsheet-key-manager';
import { Observable, Subject } from 'rxjs';
import { CdkTableColumn } from './cdk-table-drop-list';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  createByAxis,
  findAxis,
  findAxisByDir,
  findIndexOf,
  isXMove,
  isYMove,
  sortByXAxis,
} from './cdk-matrix.util';
import { delay, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

export class CdkKeyManagerMapper<T extends FocusHighlightable> {
  public cellPositions$ = this._queryList.changes;
  public itemSelected$ = this._keyManager.change;
  public tabOut$ = this._keyManager.tabOut;
  public state$ = new Subject(); // contains _table, currentTAbleAxis, etc

  private _table!: Table;
  private _matrixY!: MatrixY<number>;
  private _matrixX!: MatrixX<number>;
  private _currTableAxis!: Axis;
  private _unsub$ = new Subject();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _keyManager: ActiveDescendantKeyManager<T>,
    private _queryList: QueryList<T>,
    private _cdkTableColumn: Observable<CdkTableColumn>,
    private _cellSel = '.cdk-cell'
  ) {}

  init() {
    this.reCalcState();
    this.initItemSelected();
    this.initCellPositions();
    return this;
  }

  reCalcState() {
    this.setTableState(this._cellSel);
    this.setMatrixStates(this._table.cellCount, this._table.columnCount);
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
    const axisPos = findAxisByDir(DOWN_ARROW, this._currTableAxis);
    // @todo: why we should update when we just want to see canNext?
    const keyManagerItemIndex = this.updateStates(axisPos, 'y');
    return !!keyManagerItemIndex;
  }

  // @todo:
  //  - use setItemByDirection for custom KeyboardEvent
  //  - add onKeydownArrow(event: KeyboardEvent);
  setItemByDirection(dir: Direction, event: KeyboardEvent) {
    if (!(event instanceof KeyboardEvent)) {
      throw new Error('Event must be instanceof KeyboardEvent');
    }

    const axisPos = findAxisByDir(dir, this._currTableAxis);
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
    if (isYMove(tableAxisItemX, tableAxisItemY)) {
      keyManagerItemIndex = this.updateStates(tableAxisItemY, 'y');
    } else if (isXMove(tableAxisItemX, tableAxisItemY)) {
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

  updateQueryList(queryList: QueryList<T>) {
    const sortedQueryList = queryList.toArray().sort(
      (a, b) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        findIndexOf(this._table.cells, a.elementRef.nativeElement) -
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        findIndexOf(this._table.cells, b.elementRef.nativeElement)
    );
    const result = sortByXAxis(sortedQueryList, this._table.columnCount);
    this._queryList.reset(result);
  }

  updateAxisXByColumns(tableColumn: CdkTableColumn, x: number) {
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
    const currentColIndex = findIndexOf(
      this._table.cells,
      event.target as Element
    );
    const tableAxis = findAxis(currentColIndex, this._matrixY);
    return (this._currTableAxis = tableAxis);
  }

  setTableState(cellSel: string): Table {
    const element = this._elementRef.nativeElement;
    const cells = element.querySelectorAll<HTMLElement>(cellSel);
    const columnCount = cells[0]?.parentElement?.childElementCount ?? 0;
    const rowCount = cells.length / columnCount;
    const cellCount = columnCount * rowCount;

    this._table = {
      cells,
      rowCount: rowCount ?? -1,
      columnCount: columnCount ?? -1,
      cellCount: cellCount ?? -1,
    };

    return {
      ...this._table,
    };
  }

  setMatrixStates(cellCount: number, columnCount: number) {
    this._matrixY = createByAxis('y', cellCount, columnCount);
    this._matrixX = createByAxis('x', cellCount, columnCount);
    return {
      ...this._matrixY,
      ...this._matrixX,
    };
  }

  initItemSelected() {
    this.itemSelected$.pipe(delay(0), takeUntil(this._unsub$)).subscribe(_ => {
      this._keyManager.activeItem?.focus();
      console.log('itemSelected$: expose new state via this.state$.next()');
    });
  }

  initCellPositions() {
    // @todo:
    //  - This has nothing to do here! This class should not know about that, also about
    //    the columns are draggable! See promising pseudocode in cdk-spreadsheet-manager-factory.ts
    this.cellPositions$
      .pipe(
        // re-init on any change
        tap(queryList => {
          this.setTableState(this._cellSel);
          this.updateQueryList(queryList);
          this.setMatrixStates(this._table.cellCount, this._table.columnCount);
        }),

        // update cell position
        filter(_ => !!this._currTableAxis),
        withLatestFrom(this._cdkTableColumn),
        tap(([, columns]) =>
          this.updateAxisXByColumns(columns, this._currTableAxis.x)
        ),
        takeUntil(this._unsub$)
      )
      .subscribe(() => {
        console.log('cellPositions$: expose new state via this.state$.next()');
      });
  }

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
