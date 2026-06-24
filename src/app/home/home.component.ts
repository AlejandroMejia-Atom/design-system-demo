import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ALL_FORM_INPUT_EXAMPLES,
  FORM_INPUT_EXAMPLE_GROUPS,
} from '../examples/form-inputs/shared/form-inputs-examples.catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly groups = FORM_INPUT_EXAMPLE_GROUPS;
  protected readonly exampleCount = ALL_FORM_INPUT_EXAMPLES.length;
}
