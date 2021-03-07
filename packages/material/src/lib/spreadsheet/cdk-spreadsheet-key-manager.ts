import { Direction, FocusHighlightable } from './cdk-spreadsheet.types';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

type EditMode = 'blank' | 'mutable';

export class CdkSpreadsheetKeyManager<T extends FocusHighlightable> {
  private _onDestroy: (() => void) | undefined;
  private _arrowKeysLocked = false;
  private _currEvent!: MouseEvent;

  constructor(private _keyManagerMapper: CdkKeyManagerMapper<T>) {}

  get arrowKeyLocked() {
    return this._arrowKeysLocked;
  }

  get activeItem() {
    return this._keyManagerMapper.activeItem;
  }

  editMode(mode: EditMode) {
    console.log(mode);
    return this;
  }

  writeActiveItem(event: KeyboardEvent) {
    const text = (event.target as HTMLElement).innerText;
    console.log(event, text);
    // this.activeItem?.writeActiveItem(text);
    return this;
  }

  setActiveItem(event: MouseEvent) {
    this._currEvent = event;
    this._keyManagerMapper.setActiveItem(event as unknown);
  }

  onKeydownArrow(event: KeyboardEvent) {
    if (this._arrowKeysLocked) {
      return;
    }

    const keyCode = event.keyCode as Direction;
    this._keyManagerMapper.setItemByArrowDirection(keyCode);
  }

  setNextItemActive() {
    this._keyManagerMapper.setNextItemActive();
  }

  setArrowUpItemActive() {
    this._keyManagerMapper.setItemByArrowDirection(UP_ARROW);
    return this;
  }

  setArrowDownItemActive() {
    this._keyManagerMapper.setItemByArrowDirection(DOWN_ARROW);
    return this;
  }

  setArrowLeftItemActive() {
    this._keyManagerMapper.setItemByArrowDirection(LEFT_ARROW);
    return this;
  }

  setArrowRightItemActive() {
    this._keyManagerMapper.setItemByArrowDirection(RIGHT_ARROW);
    return this;
  }

  prevDefault(e: Event) {
    e.preventDefault();
  }

  lockArrowKeys() {
    this._arrowKeysLocked = true;
  }

  resetActiveItem() {
    this.setActiveItem(this._currEvent);
  }

  unlockArrowKeys(event?: KeyboardEvent) {
    if (event) event.preventDefault();
    this._arrowKeysLocked = false;
    return this;
  }

  onDestroy(onDestroy: () => void) {
    this._onDestroy = onDestroy;
  }

  destroy() {
    this._keyManagerMapper.destroy();
    this._onDestroy ? this._onDestroy() : null;
  }
}
