import { CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { merge, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { _createByAxisX, findIndexOfEl } from './cdk-key-manager-mapper.utils';
import { ElementRef, QueryList } from '@angular/core';
import {
  Axis,
  CdkDragDropPrevNext,
  CdkHeaderRowDefColumns,
  CdkTableDropListState,
  Table,
} from './cdk-spreadsheet.types';

export class CdkTableDropList {
  private readonly _element = this._cdkDropList.element.nativeElement;
  private readonly _unsub$ = new Subject();
  private readonly _changeSubject$ = new Subject<CdkTableDropListState>();
  private readonly _moveDropListIndex$ = new Subject<CdkDragDropPrevNext>();
  private readonly _dropList = this._cdkDropList.dropped.pipe(
    map(dropped => dropped as CdkDragDropPrevNext) // this mapping is required
  );

  public tableState = this._getTableState();

  public readonly change$ = this._changeSubject$
    .asObservable()
    .pipe(takeUntil(this._unsub$));

  constructor(
    private readonly _cdkDropList: CdkDropList<unknown>,
    private readonly _queryList: QueryList<unknown>,
    private readonly _headerRowDef: CdkHeaderRowDefColumns,
    private readonly _cellSel = '.cdk-cell'
  ) {
    this._init();
  }

  move(previousIndex: number, currentIndex: number, axis: Partial<Axis>) {
    console.log('move.axis not implemented yet', axis);
    this._moveDropListIndex$.next({ previousIndex, currentIndex });
  }

  private _init() {
    this._cdkDropList.orientation = 'horizontal';

    merge(this._dropList, this._moveDropListIndex$)
      .pipe(
        map(dropped => dropped),
        takeUntil(this._unsub$)
      )
      .subscribe(({ previousIndex, currentIndex }) =>
        // when ever moveItemInArray is invoked queryList.changes will be triggered
        moveItemInArray(this._headerRowDef.columns, previousIndex, currentIndex)
      );

    this._queryList.changes
      .pipe(withLatestFrom(this._dropList), takeUntil(this._unsub$))
      .subscribe(([queryList, dropped]) => {
        this.tableState = this._getTableState();
        this._syncQueryList(queryList);
        this._changeSubject$.next({
          table: this.tableState,
          dropped,
        });
      });
  }

  _syncQueryList(queryList: QueryList<{ elementRef: ElementRef }>) {
    const { cells, columnCount } = this.tableState;
    const sortedQueryList = queryList
      .toArray()
      .sort(
        (a, b) =>
          findIndexOfEl(cells, a.elementRef.nativeElement) -
          findIndexOfEl(cells, b.elementRef.nativeElement)
      );
    const result = _createByAxisX(sortedQueryList, columnCount);
    queryList.reset(result.flat());
  }

  _getTableState(): Table {
    const cells = this._element.querySelectorAll<HTMLElement>(this._cellSel);
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

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
