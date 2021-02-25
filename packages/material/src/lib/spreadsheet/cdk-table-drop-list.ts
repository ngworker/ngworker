import { CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { QueryList } from '@angular/core';
import {
  CdkHeaderRowDefColumns,
  CdkTableDropListState,
} from './cdk-spreadsheet.types';
import { getTableStateByElement, syncQueryList } from './cdk-matrix.utils';

export class CdkTableDropList {
  private readonly _element = this._cdkDropList.element.nativeElement;
  private readonly _unsub$ = new Subject();
  private readonly _changeSubject$ = new Subject<CdkTableDropListState>();
  private readonly _dropList = this._cdkDropList.dropped.pipe(
    map(dropped => dropped) // this mapping is required
  );

  public table = getTableStateByElement(this._element, this._cellSel);
  public readonly change$ = this._changeSubject$
    .asObservable()
    .pipe(takeUntil(this._unsub$));

  constructor(
    private readonly _cdkDropList: CdkDropList<string[]>,
    private readonly _queryList: QueryList<unknown>,
    private readonly _headerRowDef: CdkHeaderRowDefColumns,
    private readonly _cellSel = '.cdk-cell'
  ) {
    this._init();
  }

  private _init() {
    this._cdkDropList.orientation = 'horizontal';
    this._dropList
      .pipe(map(dropped => dropped))
      .subscribe(({ previousIndex, currentIndex }) =>
        moveItemInArray(this._headerRowDef.columns, previousIndex, currentIndex)
      );

    this._queryList.changes
      .pipe(withLatestFrom(this._dropList), takeUntil(this._unsub$))
      .subscribe(([queryList, dropped]) => {
        this.table = getTableStateByElement(this._element, this._cellSel);
        syncQueryList(queryList, this.table.cells, this.table.columnCount);
        this._changeSubject$.next({
          table: this.table,
          dropped,
        });
      });
  }

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
