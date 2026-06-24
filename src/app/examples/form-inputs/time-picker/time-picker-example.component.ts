import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomTimePickerComponent,
  type AtomFormFieldSize,
  type AtomTimeFormat,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import {
  TIME_FORMAT_OPTIONS,
  TIME_INTERVAL_OPTIONS,
  TIME_PICKER_SIZES,
} from '../shared/form-input-demo.data';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('time-picker');

function timeToday(hours: number, minutes: number): Date {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

@Component({
  selector: 'app-time-picker-example',
  imports: [
    ReactiveFormsModule,
    AtomTimePickerComponent,
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
            <span class="typography-caption-regular">Format</span>
            <app-form-input-segment
              [options]="formats"
              [value]="timeFormat()"
              (valueChange)="onFormatChange($event)"
            />
          </div>
          <div class="form-input-demo__control-group">
            <span class="typography-caption-regular">Interval</span>
            <app-form-input-segment
              [options]="intervals"
              [value]="interval()"
              (valueChange)="interval.set($event)"
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
          <app-form-input-demo-toggle
            label="Office hours min/max"
            [checked]="bounded()"
            (checkedChange)="bounded.set($event)"
          />
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        <atom-time-picker
          class="form-input-demo__field"
          [formControl]="meetingTime"
          [size]="size()"
          [timeFormat]="timeFormat()"
          [interval]="interval()"
          [min]="activeMin"
          [max]="activeMax"
        />

        <p class="form-input-demo__readout typography-caption-regular">
          Selected: <code>{{ formatTime(meetingTime.value) }}</code>
        </p>
        <p class="form-input-demo__readout typography-caption-regular">
          Active API: <code>{{ apiSummary() }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TimePickerExampleComponent {
  protected readonly meta = meta;
  protected readonly formats = TIME_FORMAT_OPTIONS;
  protected readonly intervals = TIME_INTERVAL_OPTIONS;
  protected readonly sizes = TIME_PICKER_SIZES;
  protected readonly timeFormat = signal<AtomTimeFormat>('12h');
  protected readonly interval = signal<string>('30m');
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly bounded = signal(true);
  protected readonly disabled = signal(false);
  protected readonly officeMin = timeToday(8, 0);
  protected readonly officeMax = timeToday(20, 0);
  protected readonly meetingTime = new FormControl<Date | null>(timeToday(14, 30));

  protected get activeMin(): Date | null {
    return this.bounded() ? this.officeMin : null;
  }

  protected get activeMax(): Date | null {
    return this.bounded() ? this.officeMax : null;
  }

  protected readonly apiSummary = computed(
    () =>
      [
        `timeFormat="${this.timeFormat()}"`,
        `interval="${this.interval()}"`,
        `size="${this.size()}"`,
        `bounded=${this.bounded()}`,
        `disabled=${this.disabled()}`,
      ].join(' · '),
  );

  onFormatChange(value: string): void {
    this.timeFormat.set(value as AtomTimeFormat);
  }

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    if (checked) {
      this.meetingTime.disable();
    } else {
      this.meetingTime.enable();
    }
  }

  formatTime(value: Date | null): string {
    if (!value) {
      return '—';
    }
    return value.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: this.timeFormat() === '12h',
    });
  }
}
