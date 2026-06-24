import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ATOM_FORM_FIELD_IMPORTS,
  AtomTextFieldComponent,
  AtomTextFieldInputDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { FormControlReadoutComponent } from '../shared/form-control-readout.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('text-area-form-control');

@Component({
  selector: 'app-text-area-form-control-example',
  imports: [
    ReactiveFormsModule,
    ...ATOM_FORM_FIELD_IMPORTS,
    AtomTextFieldComponent,
    AtomTextFieldInputDirective,
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
        <atom-form-field class="form-input-demo__field" counterSuffix="characters">
          <label atomFormFieldLabel for="release-notes">Release notes</label>
          <atom-text-field size="m">
            <textarea
              id="release-notes"
              atomTextFieldInput
              rows="4"
              maxlength="280"
              placeholder="Describe what changed…"
              [formControl]="notes"
            ></textarea>
          </atom-text-field>
          <span atomFormFieldSupport>Bound with [formControl] — min 20 characters.</span>
          <span atomFormFieldValidation="error">Release notes are required.</span>
        </atom-form-field>

        <app-form-control-readout
          [control]="notes"
          valueLabel="FormControl value"
          [sampleValue]="sampleNotes"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TextAreaFormControlExampleComponent {
  protected readonly meta = meta;
  protected readonly sampleNotes =
    'Added FormControl examples with validators, status readout, and patch helpers.';
  protected readonly notes = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(20), Validators.maxLength(280)],
  });
}
