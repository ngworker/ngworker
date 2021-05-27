import { Direction, CdkCellAble } from './cdk-spreadsheet.types';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';

type Event = MouseEvent | KeyboardEvent;

export class CdkSpreadsheetKeyManager<CellEdit extends CdkCellAble> {
  private _currEvent!: Event;

  constructor(
    private _keyManagerMapper: CdkKeyManagerMapper<CellEdit>,
    private _cellSel = 'mat-cell'
  ) {}

  setActiveItem(event: Event) {
    const element = this._getParentCell(event.target as Element);
    this._currEvent = event;
    this._keyManagerMapper.setActiveItem(element as unknown);
    this._preventDefault(event);
  }

  onKeydownArrow(event: Event) {
    if (!(event instanceof KeyboardEvent)) {
      throw new Error('Event must be instanceof KeyboardEvent');
    }

    const keyCode = event.keyCode as Direction;
    this._keyManagerMapper.setItemByArrowDirection(keyCode);

    const result = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].find(
      value => value === keyCode
    );
    result && this._preventDefault(event);
  }

  setArrowUpItemActive(event: Event) {
    this._keyManagerMapper.setItemByArrowDirection(UP_ARROW);
    this._preventDefault(event);
  }

  setArrowDownItemActive(event: Event) {
    this._keyManagerMapper.setItemByArrowDirection(DOWN_ARROW);
    this._preventDefault(event);
  }

  setArrowLeftItemActive(event: Event) {
    this._keyManagerMapper.setItemByArrowDirection(LEFT_ARROW);
    this._preventDefault(event);
  }

  setArrowRightItemActive(event: Event) {
    this._keyManagerMapper.setItemByArrowDirection(RIGHT_ARROW);
    this._preventDefault(event);
  }

  resetActiveItem(event: Event) {
    this.setActiveItem(event);
  }

  private _preventDefault(event: Event) {
    event.preventDefault();
  }

  private _getParentCell(element: Element) {
    if (element.tagName.toLocaleLowerCase() !== this._cellSel) {
      element = element.closest(this._cellSel) as Element;
    }
    return element;
  }
}
