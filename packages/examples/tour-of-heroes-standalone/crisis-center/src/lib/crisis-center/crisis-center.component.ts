import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-crisis-center',
  imports: [RouterOutlet],
  templateUrl: './crisis-center.component.html',
  styleUrls: ['./crisis-center.component.css'],
})
export class CrisisCenterComponent {}
