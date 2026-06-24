import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import {
  AtomDatePickerComponent,
  AtomDateRangePickerComponent,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { formatDateRangeValue, formatDateValue } from '../shared/form-control-formatters';
import { DATE_PICKER_MODE_OPTIONS, DATE_PICKER_SIZES } from '../shared/form-input-demo.data';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('date-picker');

function monthsFromToday(offset: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setMonth(date.getMonth() + offset);
  return date;
}

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
    AtomDateRangePickerComponent,
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
            <span class="typography-caption-regular">Mode</span>
            <app-form-input-segment
              [options]="modes"
              [value]="mode()"
              (valueChange)="onModeChange($event)"
            />
          </div>
          <div class="form-input-demo__control-group">
            <span class="typography-caption-regular">Size</span>
            <app-form-input-segment
              [options]="sizes"
              [value]="size()"
              (valueChange)="onSizeChange($event)"
            />
          </div>
          @if (mode() === 'range') {
            <app-form-input-demo-toggle
              label="Double calendar"
              [checked]="doubleCalendar()"
              (checkedChange)="doubleCalendar.set($event)"
            />
          }
          <app-form-input-demo-toggle
            label="Min / max bounds"
            [checked]="bounded()"
            (checkedChange)="bounded.set($event)"
          />
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        @if (mode() === 'range') {
          <atom-date-range-picker
            class="form-input-demo__field form-input-demo__field--date"
            [size]="size()"
            [doubleCalendar]="doubleCalendar()"
            [formControl]="dateRange"
            [min]="activeMin"
            [max]="activeMax"
          />
        } @else {
          <atom-date-picker
            class="form-input-demo__field form-input-demo__field--date"
            [size]="size()"
            [formControl]="singleDate"
            [min]="activeMin"
            [max]="activeMax"
          />
        }

        <p class="form-input-demo__readout typography-caption-regular">
          Selected:
          <code>{{ mode() === 'range' ? formatRange(dateRange.value) : formatDate(singleDate.value) }}</code>
        </p>
        <p class="form-input-demo__readout typography-caption-regular">
          @if (bounded()) {
            Bounds:
            <code>min={{ formatDate(minDate) }}</code>
            ·
            <code>max={{ formatDate(maxDate) }}</code>
            <span class="fg-secondary"> (one calendar month before and after today)</span>
          } @else {
            Bounds: <code>none</code>
            <span class="fg-secondary"> — toggle “Min / max bounds” to apply ±1 month</span>
          }
        </p>
        <p class="form-input-demo__readout typography-caption-regular">
          Active API: <code>{{ apiSummary() }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class DatePickerExampleComponent {
  protected readonly meta = meta;
  protected readonly modes = DATE_PICKER_MODE_OPTIONS;
  protected readonly sizes = DATE_PICKER_SIZES;
  protected readonly mode = signal<'single' | 'range'>('single');
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly doubleCalendar = signal(false);
  protected readonly bounded = signal(true);
  protected readonly disabled = signal(false);
  protected readonly minDate = monthsFromToday(-1);
  protected readonly maxDate = monthsFromToday(1);
  protected readonly singleDate = new FormControl<Date | null>(daysFromToday(0));
  protected readonly dateRange = new FormControl<DateRange<Date> | null>(
    new DateRange(daysFromToday(-7), daysFromToday(7)),
  );

  protected readonly formatDate = formatDateValue;
  protected readonly formatRange = formatDateRangeValue;

  protected get activeMin(): Date | null {
    return this.bounded() ? this.minDate : null;
  }

  protected get activeMax(): Date | null {
    return this.bounded() ? this.maxDate : null;
  }

  protected readonly apiSummary = computed(() => {
    const parts = [`mode="${this.mode()}"`, `size="${this.size()}"`, `bounded=${this.bounded()}`];
    if (this.bounded()) {
      parts.push(`min="${formatDateValue(this.minDate)}"`, `max="${formatDateValue(this.maxDate)}"`);
    }
    if (this.mode() === 'range') {
      parts.push(`doubleCalendar=${this.doubleCalendar()}`);
    }
    parts.push(`disabled=${this.disabled()}`);
    return parts.join(' · ');
  });

  onModeChange(value: string): void {
    this.mode.set(value as 'single' | 'range');
  }

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    const control = this.mode() === 'range' ? this.dateRange : this.singleDate;
    if (checked) {
      control.disable();
    } else {
      control.enable();
    }
  }
}
