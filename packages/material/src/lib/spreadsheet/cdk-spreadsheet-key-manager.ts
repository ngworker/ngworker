import { Highlightable } from '@angular/cdk/a11y';
import { Direction } from './cdk-spreadsheet.models';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

export interface FocusShow {
  focus: () => void;
  show: () => void;
}

// @todo: choose a different name and add elementRef because of CdkKeyManagerMapper.sortedQueryList
export interface FocusHighlightable extends Highlightable, FocusShow {}

export class CdkSpreadsheetKeyManager<T extends FocusHighlightable> {
  private _onDestroy!: () => void;

  constructor(private _keyManagerMapper: CdkKeyManagerMapper<T>) {}

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
