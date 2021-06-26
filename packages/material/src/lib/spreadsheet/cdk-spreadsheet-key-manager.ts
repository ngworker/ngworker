import { CdkCellAble, Direction } from './cdk-spreadsheet.types';
import { CdkKeyManagerMapper } from './cdk-key-manager-mapper';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

type Event = MouseEvent | KeyboardEvent;
const ARROW_KEY_CODES = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW];

export class CdkSpreadsheetKeyManager<CellEdit extends CdkCellAble> {
  private _currEvent!: Event;

  constructor(
    private readonly _keyManagerMapper: CdkKeyManagerMapper<CellEdit>,
    private readonly _cellSel = '.mat-cell',
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

    // allow writing into an input-field by skipping preventDefault when
    // using characters except arrow-keys!
    const keyCode = event.keyCode as Direction;
    const isArrowKey = ARROW_KEY_CODES.find(value => value === keyCode);
    if (!isArrowKey) return;

    this._keyManagerMapper.setItemByArrowDirection(keyCode);
    this._preventDefault(event);
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

  onEnter(event: Event) {
    this.resetActiveItem(event);
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
