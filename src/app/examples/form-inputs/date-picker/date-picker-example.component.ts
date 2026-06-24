import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomDatePickerComponent,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { DATE_PICKER_SIZES } from '../shared/form-input-demo.data';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('date-picker');

function daysFromToday(offset: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
}

@Component({
  selector: 'app-date-picker-example',
  imports: [
    ReactiveFormsModule,
    AtomDatePickerComponent,
    FormInputSegmentComponent,
    FormInputDemoToggleComponent,
    ExamplePageComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="form-input-demo">
        <div class="form-input-demo__controls">
          <div class="form-input-demo__control-group">
            <span class="typography-caption-regular">Size</span>
            <app-form-input-segment
              [options]="sizes"
              [value]="size()"
              (valueChange)="onSizeChange($event)"
            />
          </div>
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        <atom-date-picker
          class="form-input-demo__field form-input-demo__field--date"
          [size]="size()"
          [formControl]="birthDate"
          [min]="minDate"
          [max]="maxDate"
        />

        <p class="form-input-demo__readout typography-caption-regular">
          Selected: <code>{{ formatDate(birthDate.value) }}</code>
          · Allowed range: {{ formatDate(minDate) }} – {{ formatDate(maxDate) }}
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class DatePickerExampleComponent {
  protected readonly meta = meta;
  protected readonly sizes = DATE_PICKER_SIZES;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly disabled = signal(false);
  protected readonly minDate = daysFromToday(-365 * 80);
  protected readonly maxDate = daysFromToday(0);
  protected readonly birthDate = new FormControl<Date | null>(daysFromToday(-365 * 30));

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    if (checked) {
      this.birthDate.disable();
    } else {
      this.birthDate.enable();
    }
  }

  formatDate(value: Date | null): string {
    if (!value) {
      return '—';
    }
    return value.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
