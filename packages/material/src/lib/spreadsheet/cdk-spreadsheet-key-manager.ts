import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { QueryList } from '@angular/core';
import { Direction } from './mat-table.plugin.models';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { CdkTableColumn } from './cdk-table-drop-list';

export interface FocusShow {
  focus: () => void;
  show: () => void;
}

export interface FocusHighlightable extends Highlightable, FocusShow {}

export class CdkSpreadsheetKeyManager<T extends FocusHighlightable> {
  private _onDestroy!: () => void;

  constructor(
    private _keyManagerMapper: CdkKeyManagerMapper<T>,
    private _tableColumn: Observable<CdkTableColumn>,
    private _keyManager: ActiveDescendantKeyManager<T>,
    private _queryList: QueryList<T>
  ) {}

  get activeItem() {
    return this._keyManagerMapper.activeItem;
  }

  setActiveItem(value: unknown) {
    this._keyManagerMapper.setActiveItem(value);
  }

  onKeydownArrow(event: KeyboardEvent) {
    const keyCode = event.keyCode as Direction;
    this._keyManagerMapper.setItemByDirection(keyCode, event);
  }

  setNextItemActive() {
    this._keyManagerMapper.setNextItemActive();
  }

  setArrowUpItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByDirection(UP_ARROW, event);
  }

  setArrowDownItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByDirection(DOWN_ARROW, event);
  }

  setArrowLeftItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByDirection(LEFT_ARROW, event);
  }

  setArrowRightItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByDirection(RIGHT_ARROW, event);
  }

  onDestroy(onDestroy: () => void) {
    this._onDestroy = onDestroy;
  }

  destroy() {
    this._keyManagerMapper.destroy();
    this._onDestroy ? this._onDestroy() : null;
  }
}
