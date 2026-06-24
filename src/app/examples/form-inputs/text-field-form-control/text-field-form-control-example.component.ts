import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ATOM_FORM_FIELD_IMPORTS,
  AtomTextFieldComponent,
  AtomTextFieldInputDirective,
  AtomTextFieldLeadingDirective,
  AtomTextFieldTrailingDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { FormControlReadoutComponent } from '../shared/form-control-readout.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('text-field-form-control');

@Component({
  selector: 'app-text-field-form-control-example',
  imports: [
    ReactiveFormsModule,
    ...ATOM_FORM_FIELD_IMPORTS,
    AtomTextFieldComponent,
    AtomTextFieldInputDirective,
    AtomTextFieldLeadingDirective,
    AtomTextFieldTrailingDirective,
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
        <atom-form-field class="form-input-demo__field">
          <label atomFormFieldLabel for="work-email">Work email</label>
          <atom-text-field>
            <span atomTextFieldLeading class="typography-body-regular fg-secondary">@</span>
            <input
              id="work-email"
              atomTextFieldInput
              type="email"
              autocomplete="email"
              placeholder="username"
              [formControl]="email"
            />
            <span atomTextFieldTrailing class="typography-body-regular fg-secondary">.com</span>
          </atom-text-field>
          <span atomFormFieldSupport>Type a username — validators run on the FormControl.</span>
          <span atomFormFieldValidation="error">Enter a valid email username.</span>
        </atom-form-field>

        <app-form-control-readout
          [control]="email"
          valueLabel="FormControl value"
          [sampleValue]="'demo.user'"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TextFieldFormControlExampleComponent {
  protected readonly meta = meta;
  protected readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-z0-9._-]+$/i)],
  });
}
