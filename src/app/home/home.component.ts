import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ALL_PAGINATOR_EXAMPLES,
  PAGINATOR_EXAMPLE_GROUPS,
} from '../examples/paginator/shared/paginator-examples.catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly groups = PAGINATOR_EXAMPLE_GROUPS;
  protected readonly exampleCount = ALL_PAGINATOR_EXAMPLES.length;
}
