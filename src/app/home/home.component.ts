import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ALL_FILTER_EXAMPLES,
  FILTER_EXAMPLE_GROUPS,
} from '../examples/filters/shared/filters-examples.catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly groups = FILTER_EXAMPLE_GROUPS;
  protected readonly exampleCount = ALL_FILTER_EXAMPLES.length;
}
