import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CdkSpreadsheetCollapseComponent } from './cdk-spreadsheet-collapse';

@Component({
  // @todo: find a cleaner way
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-spreadsheet-collapse',
  template: `
    <div class="cdk-spreadsheet-collapse-icon">
      <mat-icon *ngIf="_collapse?.parent && _collapse?.collapsed" (click)="_collapseChange()">
        expand_more
      </mat-icon>
      <mat-icon *ngIf="_collapse?.parent && !_collapse?.collapsed" (click)="_collapseChange()">
        expand_less
      </mat-icon>
    </div>
    <div>
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatSpreadsheetCollapseComponent extends CdkSpreadsheetCollapseComponent {
  @HostBinding('class.mat-spreadsheet-collapse') hostClass = true;
  @HostBinding('class.mat-spreadsheet-collapsible') get collapsedClass() {
    return this._collapse.collapsed ?? false;
  }
}
