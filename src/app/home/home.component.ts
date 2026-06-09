import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ALL_TABLE_EXAMPLES,
  TABLE_EXAMPLE_GROUPS,
} from '../examples/table/shared/table-examples.catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly groups = TABLE_EXAMPLE_GROUPS;
  protected readonly exampleCount = ALL_TABLE_EXAMPLES.length;
}
