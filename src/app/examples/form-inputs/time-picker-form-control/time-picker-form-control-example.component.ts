import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ATOM_FORM_FIELD_IMPORTS, AtomTimePickerComponent } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { formatTimeValue } from '../shared/form-control-formatters';
import { FormControlReadoutComponent } from '../shared/form-control-readout.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('time-picker-form-control');

function timeToday(hours: number, minutes: number): Date {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

@Component({
  selector: 'app-time-picker-form-control-example',
  imports: [
    ReactiveFormsModule,
    ...ATOM_FORM_FIELD_IMPORTS,
    AtomTimePickerComponent,
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
          <label atomFormFieldLabel>Stand-up time</label>
          <atom-time-picker
            [formControl]="standupTime"
            timeFormat="12h"
            interval="15m"
            [min]="minTime"
            [max]="maxTime"
          />
          <span atomFormFieldSupport>FormControl syncs on blur and preset selection.</span>
          <span atomFormFieldValidation="error">Pick a valid meeting time.</span>
        </atom-form-field>

        <app-form-control-readout
          [control]="standupTime"
          valueLabel="FormControl value"
          [formatValue]="formatTime"
          [sampleValue]="sampleTime"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TimePickerFormControlExampleComponent {
  protected readonly meta = meta;
  protected readonly minTime = timeToday(8, 0);
  protected readonly maxTime = timeToday(18, 0);
  protected readonly sampleTime = timeToday(9, 30);
  protected readonly standupTime = new FormControl<Date | null>(null, Validators.required);
  protected readonly formatTime = (value: unknown) => formatTimeValue(value, true);
}
