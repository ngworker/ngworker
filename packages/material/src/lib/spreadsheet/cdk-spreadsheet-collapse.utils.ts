import { ElementRef } from '@angular/core';
import { CdkCollapse } from './cdk-spreadsheet-collapse';

/*
 * @todo: this is a bad hack. It is related to cdkSpreatsheetCollapse!
 * - avoid rending/displaying rows, cell by dom manipulation
 * - this code should be removed after MVP!
 * - ticket: https://code.avodaq.com/service-solutions/avodaq-frontend/avodaq-frontend/-/issues/61
 */
export function toggleCollapse(elementRef: ElementRef<HTMLElement>, cdkCollapse: CdkCollapse) {
  const { groupId, collapsed } = cdkCollapse;
  const selectorByChild = `[parent="false"][groupId="${groupId}"]`;
  const childRows = elementRef.nativeElement.querySelectorAll<HTMLElement>(selectorByChild);
  for (let i = 0; i < childRows.length; i++) {
    if (collapsed) {
      childRows[i].classList.add('cdk-spreadsheet-cell-hidden');
    } else {
      childRows[i].classList.remove('cdk-spreadsheet-cell-hidden');
    }
  }
}
