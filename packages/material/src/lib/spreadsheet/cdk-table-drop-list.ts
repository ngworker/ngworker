import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { QueryList } from '@angular/core';
import { Table } from './cdk-spreadsheet.models';
import { getTableStateByElement, syncQueryList } from './cdk-matrix.util';

export interface CdkTableColumn extends CdkDragDrop<string[]> {
  columns: string[];
}

export class CdkTableDropList {
  private _table!: Table;
  private readonly _element = this._cdkDropList.element.nativeElement;
  private readonly _unsub$ = new Subject();
  private readonly _changeSubject$ = new Subject<
    { table: Table } & { dropped: CdkDragDrop<string[], unknown> }
  >();
  public readonly change$ = this._changeSubject$
    .asObservable()
    .pipe(takeUntil(this._unsub$));

  constructor(
    private readonly _cdkDropList: CdkDropList<string[]>,
    private readonly _queryList: QueryList<unknown>,
    private readonly _columns: string[],
    private readonly _cellSel = '.cdk-cell'
  ) {
    this._init();
  }

  private _init() {
    this._table = getTableStateByElement(this._element, this._cellSel);
    this._cdkDropList.orientation = 'horizontal';
    this._cdkDropList.dropped
      .pipe(map(dropped => dropped))
      .subscribe(({ previousIndex, currentIndex }) =>
        moveItemInArray(this._columns, previousIndex, currentIndex)
      );

    const dropped = this._cdkDropList.dropped.pipe(map(x => x));
    this._queryList.changes
      .pipe(withLatestFrom(dropped), takeUntil(this._unsub$))
      .subscribe(([queryList, dropped]) => {
        this._table = getTableStateByElement(this._element, this._cellSel);
        syncQueryList(queryList, this._table.cells, this._table.columnCount);
        this._changeSubject$.next({
          table: this._table,
          dropped,
        });
      });
  }

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
