import { Direction, FocusHighlightable } from './cdk-spreadsheet.types';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

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
    this._keyManagerMapper.setItemByArrowDirection(keyCode, event);
  }

  setNextItemActive() {
    this._keyManagerMapper.setNextItemActive();
  }

  setArrowUpItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByArrowDirection(UP_ARROW, event);
  }

  setArrowDownItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByArrowDirection(DOWN_ARROW, event);
  }

  setArrowLeftItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByArrowDirection(LEFT_ARROW, event);
  }

  setArrowRightItemActive(event: KeyboardEvent) {
    this._keyManagerMapper.setItemByArrowDirection(RIGHT_ARROW, event);
  }

  onDestroy(onDestroy: () => void) {
    this._onDestroy = onDestroy;
  }

  destroy() {
    this._keyManagerMapper.destroy();
    this._onDestroy ? this._onDestroy() : null;
  }
}
