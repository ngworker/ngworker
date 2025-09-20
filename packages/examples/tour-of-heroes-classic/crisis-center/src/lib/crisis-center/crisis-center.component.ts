import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-crisis-center',
  templateUrl: './crisis-center.component.html',
  styleUrls: ['./crisis-center.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrisisCenterComponent {}
