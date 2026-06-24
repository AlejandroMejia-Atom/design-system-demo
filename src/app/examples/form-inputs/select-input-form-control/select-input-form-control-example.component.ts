import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ATOM_FORM_FIELD_IMPORTS,
  AtomListItemComponent,
  AtomSelectInputComponent,
  AtomSelectValueDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { FormControlReadoutComponent } from '../shared/form-control-readout.component';
import { LANGUAGE_OPTIONS } from '../shared/form-input-demo.data';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('select-input-form-control');

@Component({
  selector: 'app-select-input-form-control-example',
  imports: [
    ReactiveFormsModule,
    ...ATOM_FORM_FIELD_IMPORTS,
    AtomSelectInputComponent,
    AtomListItemComponent,
    AtomSelectValueDirective,
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
          <label atomFormFieldLabel>Locale</label>
          <atom-select-input searchable placeholder="Pick a language" [formControl]="language">
            @for (option of options; track option.value) {
              <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
            }
          </atom-select-input>
          <span atomFormFieldSupport>
            atom-select-input implements ControlValueAccessor — bind [formControl] directly.
          </span>
          <span atomFormFieldValidation="error">Language is required.</span>
        </atom-form-field>

        <app-form-control-readout
          [control]="language"
          valueLabel="FormControl value"
          [formatValue]="formatLanguage"
          [sampleValue]="'es'"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SelectInputFormControlExampleComponent {
  protected readonly meta = meta;
  protected readonly options = LANGUAGE_OPTIONS;
  protected readonly language = new FormControl<string | null>(null, Validators.required);

  formatLanguage = (value: unknown): string => {
    const code = typeof value === 'string' ? value : null;
    return this.options.find((option) => option.value === code)?.label ?? '—';
  };
}
