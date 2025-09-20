import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-crisis-center',
  imports: [RouterOutlet],
  templateUrl: './crisis-center.component.html',
  styleUrls: ['./crisis-center.component.css'],
})
export class CrisisCenterComponent {}
