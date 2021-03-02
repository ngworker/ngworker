import { Direction, FocusHighlightable } from './cdk-spreadsheet.types';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  ENTER,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

export class CdkSpreadsheetKeyManager<T extends FocusHighlightable> {
  private _onDestroy: (() => void) | undefined;
  private _currElement!: MouseEvent; // @todo: rename to HTMLInputElement?
  private _currInputText = ''; // @todo:
  private _activeIndex = 0; // @todo:

  constructor(private _keyManagerMapper: CdkKeyManagerMapper<T>) {}

  get activeItem() {
    return this._keyManagerMapper.activeItem;
  }

  writeActiveItem(event: KeyboardEvent) {
    if (event.keyCode === ENTER) event.preventDefault();

    // if (event.keyCode === ENTER) {
    //   const element = event.target as HTMLElement;
    //   console.log(element);
    //   element.innerHTML = element.innerHTML.replace(/<br>|<div>|<\/div>+/g, '');
    // }
  }

  leaveTypeMode() {
    // this._keyManagerMapper.setActiveItem(this._currElement);
  }

  // @todo: MouseEvent => use custom interface with target, etc.
  setActiveItem(value: MouseEvent) {
    this._currElement = value;
    this._keyManagerMapper.setActiveItem(value as unknown);
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
