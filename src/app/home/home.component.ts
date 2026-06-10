import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_EXAMPLE_GROUPS } from '../examples/app-example-groups';
import { ALL_FULL_TABLE_EXAMPLES } from '../examples/full-table/shared/full-table-examples.catalog';
import { ALL_TABLE_EXAMPLES } from '../examples/table/shared/table-examples.catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly groups = APP_EXAMPLE_GROUPS;
  protected readonly exampleCount =
    ALL_FULL_TABLE_EXAMPLES.length + ALL_TABLE_EXAMPLES.length;
}
