import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-crisis-center-home',
  imports: [],
  templateUrl: './crisis-center-home.component.html',
  styleUrls: ['./crisis-center-home.component.css'],
})
export class CrisisCenterHomeComponent {}
