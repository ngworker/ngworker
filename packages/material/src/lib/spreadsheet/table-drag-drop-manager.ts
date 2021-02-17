import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface CdkTableColumn extends CdkDragDrop<string[]> {
  columns: string[];
}

export class TableDragDropManager {
  constructor(
    private readonly _cdkDropList: CdkDropList,
    private readonly _columns: string[],
  ) {
    this._init();
  }

  private readonly _unsub$ = new Subject();
  private readonly _columnChangeSubject$ = new Subject<CdkTableColumn>();
  public readonly columnsUpdated = this._columnChangeSubject$.asObservable().pipe(
    takeUntil(this._unsub$),
  );

  private _init() {
    this._initColumnDropped();
  }

  private _initColumnDropped() {
    this._cdkDropList.orientation = 'horizontal';
    this._cdkDropList.dropped.pipe(
      takeUntil(this._unsub$),
    ).subscribe(event => this._updateStates(event));
  }

  private _updateStates(event: CdkDragDrop<string[]>) {
    this._columnChangeSubject$.next({
      ...event, columns: this._columns
    });
    moveItemInArray(this._columns, event.previousIndex, event.currentIndex);
  }

  destroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
