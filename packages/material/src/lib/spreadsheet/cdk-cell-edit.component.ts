import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'cdk-cell-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [class.cdk-cell-raw-show]="showCellRaw">{{ value }}</div>
    <input
      #cellInputRef
      (keyup.enter)="cellInputRef.blur()"
      [class.cdk-cell-edit-show]="showCellEdit"
      [value]="value"
      type="text"
    />
  `,
})
export class CdkCellEditComponent implements OnInit {
  constructor(private readonly _cdr: ChangeDetectorRef) {}

  @HostBinding('class.cdk-cell-edit') hostClass = true;
  @Input() value = '';

  @ViewChild('cellInputRef', { static: true })
  cellInputRef!: ElementRef<HTMLInputElement>;

  cellInputElement!: HTMLInputElement;
  showCellRaw = false;
  showCellEdit = false;

  set show(value: boolean) {
    this.showCellRaw = !value;
    this.showCellEdit = value;
    this._cdr.detectChanges();

    if (this.showCellEdit) {
      this.cellInputElement.select();
    } else {
      this.cellInputElement.dispatchEvent(new Event('blur'));
    }
  }

  ngOnInit() {
    this.cellInputElement = this.cellInputRef.nativeElement;
  }
}
