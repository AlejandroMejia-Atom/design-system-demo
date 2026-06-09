import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ALL_EXAMPLES,
  DEMO_APP,
  EXAMPLE_GROUPS,
} from '../shared/demo-config';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly app = DEMO_APP;
  protected readonly groups = EXAMPLE_GROUPS;
  protected readonly exampleCount = ALL_EXAMPLES.length;
  protected readonly hasExamples = ALL_EXAMPLES.length > 0;
}
