import { MatTableModule } from '@angular/material/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'mat-cell-edit',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'mat-cell-edit' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [class.mat-cell-raw-show]="showCellRaw">{{ value }}</div>
    <input
      #matCellInputRef
      (keyup.enter)="matCellInputRef.blur()"
      [class.mat-cell-edit-show]="showCellEdit"
      [value]="value"
      type="text"
    />
  `,
})
export class MatCellEditPluginComponent implements OnInit {
  constructor(private readonly _cdr: ChangeDetectorRef) {}

  @Input() value = '';

  @ViewChild('matCellInputRef', { static: true })
  matCellInputRef!: ElementRef<HTMLInputElement>;

  matCellInputElement!: HTMLInputElement;
  showCellRaw = false;
  showCellEdit = false;

  set show(value: boolean) {
    this.showCellRaw = !value;
    this.showCellEdit = value;
    this._cdr.detectChanges();

    if (this.showCellEdit) {
      this.matCellInputElement.select();
    } else {
      this.matCellInputElement.dispatchEvent(new Event('blur'));
    }
  }

  ngOnInit() {
    this.matCellInputElement = this.matCellInputRef.nativeElement;
  }
}

@NgModule({
  imports: [MatTableModule],
  declarations: [MatCellEditPluginComponent],
  exports: [MatCellEditPluginComponent],
  entryComponents: [MatCellEditPluginComponent],
})
export class MatTableCellInputModule {}
