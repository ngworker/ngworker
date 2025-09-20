import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-crisis-center-home',
  imports: [],
  templateUrl: './crisis-center-home.component.html',
  styleUrls: ['./crisis-center-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrisisCenterHomeComponent {}
