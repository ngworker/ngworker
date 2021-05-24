import { Direction, CdkCellEditable } from './cdk-spreadsheet.types';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

export class CdkSpreadsheetKeyManager<CellEdit extends CdkCellEditable> {
  private _onDestroy: (() => void) | undefined;
  private _arrowKeysLocked = false;
  private _currElement!: Element;

  constructor(private _keyManagerMapper: CdkKeyManagerMapper<CellEdit>) {}

  get arrowKeyLocked() {
    return this._arrowKeysLocked;
  }

  get activeItem() {
    return this._keyManagerMapper.activeItem;
  }

  setActiveItem(element: Element) {
    if (element.tagName.toLocaleLowerCase() !== 'mat-cell') {
      element = element.closest('mat-cell') as Element;
    }

    this._currElement = element;
    this._keyManagerMapper.setActiveItem(element as unknown);

    return this;
  }

  onKeydownArrow(event: KeyboardEvent) {
    if (this._arrowKeysLocked) {
      return;
    }

    const keyCode = event.keyCode as Direction;
    this._keyManagerMapper.setItemByArrowDirection(keyCode);
    return this;
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

  prevDef(event: Event) {
    event.preventDefault();
    return this;
  }

  lockArrowKeys() {
    this._arrowKeysLocked = true;
    return this;
  }

  resetActiveItem() {
    this.setActiveItem(this._currElement);
    return this;
  }

  unlockArrowKeys() {
    this._arrowKeysLocked = false;
    return this;
  }

  exec(event?: Event) {
    event && this.prevDef(event);
  }

  onDestroy(onDestroy: () => void) {
    this._onDestroy = onDestroy;
  }

  destroy() {
    this._onDestroy ? this._onDestroy() : null;
  }
}
