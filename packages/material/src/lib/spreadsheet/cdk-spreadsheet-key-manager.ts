import { Direction, CdkCellAble } from './cdk-spreadsheet.types';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

export class CdkSpreadsheetKeyManager<CellEdit extends CdkCellAble> {
  private _currElement!: Element;

  constructor(
    private _keyManagerMapper: CdkKeyManagerMapper<CellEdit>,
    private _cellSel = 'mat-cell'
  ) {}

  setActiveItem(element: Element) {
    if (element.tagName.toLocaleLowerCase() !== this._cellSel) {
      element = element.closest('mat-cell') as Element;
    }

    this._currElement = element;
    this._keyManagerMapper.setActiveItem(element as unknown);

    return this;
  }

  onKeydownArrow(event: KeyboardEvent) {
    const keyCode = event.keyCode as Direction;
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      event.preventDefault();
    }

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

  resetActiveItem() {
    this.setActiveItem(this._currElement);
    return this;
  }

  exec(event: Event) {
    event.preventDefault();
  }
}
