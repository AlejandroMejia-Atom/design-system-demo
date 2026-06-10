import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ALL_TABLE_BUILDER_EXAMPLES,
  TABLE_BUILDER_EXAMPLE_GROUPS,
} from '../examples/table-builder/shared/table-builder-examples.catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly groups = TABLE_BUILDER_EXAMPLE_GROUPS;
  protected readonly exampleCount = ALL_TABLE_BUILDER_EXAMPLES.length;
}
