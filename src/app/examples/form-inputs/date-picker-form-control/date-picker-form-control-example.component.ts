import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ATOM_FORM_FIELD_IMPORTS, AtomDatePickerComponent } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { formatDateValue } from '../shared/form-control-formatters';
import { FormControlReadoutComponent } from '../shared/form-control-readout.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('date-picker-form-control');

function daysFromToday(offset: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
}

@Component({
  selector: 'app-date-picker-form-control-example',
  imports: [
    ReactiveFormsModule,
    ...ATOM_FORM_FIELD_IMPORTS,
    AtomDatePickerComponent,
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
        <atom-form-field class="form-input-demo__field form-input-demo__field--date">
          <label atomFormFieldLabel>Contract start date</label>
          <atom-date-picker [formControl]="startDate" [min]="minDate" [max]="maxDate" />
          <span atomFormFieldSupport>
            Date | null on the FormControl — picker min/max also register as validators.
          </span>
          <span atomFormFieldValidation="error">Pick a valid start date.</span>
        </atom-form-field>

        <app-form-control-readout
          [control]="startDate"
          valueLabel="FormControl value"
          [formatValue]="formatDate"
          [sampleValue]="sampleDate"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class DatePickerFormControlExampleComponent {
  protected readonly meta = meta;
  protected readonly minDate = daysFromToday(-365);
  protected readonly maxDate = daysFromToday(365);
  protected readonly sampleDate = daysFromToday(14);
  protected readonly startDate = new FormControl<Date | null>(null, Validators.required);
  protected readonly formatDate = formatDateValue;
}
