import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtomSearchInputComponent } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { FormControlReadoutComponent } from '../shared/form-control-readout.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('search-input-form-control');

@Component({
  selector: 'app-search-input-form-control-example',
  imports: [
    ReactiveFormsModule,
    AtomSearchInputComponent,
    FormControlReadoutComponent,
    ExamplePageComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="form-input-demo">
        <label class="typography-label-bold fg-primary" for="user-search">
          Filter users
        </label>
        <atom-search-input
          id="user-search"
          class="form-input-demo__field"
          placeholder="Search by name (min. 3 characters)…"
          [formControl]="query"
        />

        <app-form-control-readout
          [control]="query"
          valueLabel="FormControl value"
          [sampleValue]="'maria'"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SearchInputFormControlExampleComponent {
  protected readonly meta = meta;
  protected readonly query = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
}
