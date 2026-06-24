import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ATOM_FORM_FIELD_IMPORTS,
  AtomDatePickerComponent,
  AtomListItemComponent,
  AtomSearchInputComponent,
  AtomSelectInputComponent,
  AtomSelectValueDirective,
  AtomTextFieldComponent,
  AtomTextFieldInputDirective,
  AtomTimePickerComponent,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { formatDateValue, formatTimeValue } from '../shared/form-control-formatters';
import { FormControlReadoutComponent } from '../shared/form-control-readout.component';
import { LANGUAGE_OPTIONS } from '../shared/form-input-demo.data';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('form-control');

const READOUT_TARGETS = ['search', 'email', 'bio', 'language', 'date', 'time'] as const;
type ReadoutTarget = (typeof READOUT_TARGETS)[number];

function daysFromToday(offset: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
}

function timeToday(hours: number, minutes: number): Date {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

@Component({
  selector: 'app-form-control-example',
  imports: [
    ReactiveFormsModule,
    ...ATOM_FORM_FIELD_IMPORTS,
    AtomTextFieldComponent,
    AtomTextFieldInputDirective,
    AtomSearchInputComponent,
    AtomSelectInputComponent,
    AtomListItemComponent,
    AtomSelectValueDirective,
    AtomDatePickerComponent,
    AtomTimePickerComponent,
    FormInputSegmentComponent,
    FormControlReadoutComponent,
    ExamplePageComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="form-control-demo">
        <p class="typography-caption-regular fg-secondary">
          Each control is bound with <code>[formControl]</code>. Component API knobs live in the
          standalone playgrounds — here the focus is validators, value sync, and status readout.
        </p>

        <div class="form-field-demo__search">
          <label class="typography-label-bold fg-primary" for="fc-search">Search filter</label>
          <atom-search-input
            id="fc-search"
            class="form-field-demo__toolbar"
            placeholder="Filter (min. 3 characters)…"
            [formControl]="search"
          />
        </div>

        <atom-form-field>
          <label atomFormFieldLabel for="fc-email">Work email</label>
          <atom-text-field>
            <input
              id="fc-email"
              atomTextFieldInput
              type="email"
              autocomplete="email"
              placeholder="you@company.com"
              [formControl]="email"
            />
          </atom-text-field>
          <span atomFormFieldValidation="error">Enter a valid email address.</span>
        </atom-form-field>

        <atom-form-field counterSuffix="characters">
          <label atomFormFieldLabel for="fc-bio">Bio</label>
          <atom-text-field>
            <textarea
              id="fc-bio"
              atomTextFieldInput
              rows="4"
              maxlength="280"
              placeholder="Short bio…"
              [formControl]="bio"
            ></textarea>
          </atom-text-field>
          <span atomFormFieldValidation="error">Bio must be at least 20 characters.</span>
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Language</label>
          <atom-select-input searchable placeholder="Select a language" [formControl]="language">
            @for (option of languageOptions; track option.value) {
              <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
            }
          </atom-select-input>
          <span atomFormFieldValidation="error">Language is required.</span>
        </atom-form-field>

        <atom-form-field class="form-input-demo__field--date">
          <label atomFormFieldLabel>Go-live date</label>
          <atom-date-picker [formControl]="goLiveDate" [min]="minGoLiveDate" />
          <span atomFormFieldValidation="error">Pick a valid go-live date.</span>
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Check-in time</label>
          <atom-time-picker
            [formControl]="checkInTime"
            timeFormat="12h"
            interval="30m"
            [min]="minCheckInTime"
            [max]="maxCheckInTime"
          />
          <span atomFormFieldValidation="error">Pick a check-in time.</span>
        </atom-form-field>

        <div class="form-control-demo__inspect">
          <span class="typography-caption-regular fg-secondary">Inspect FormControl</span>
          <app-form-input-segment
            [options]="readoutTargets"
            [value]="readoutTarget()"
            (valueChange)="onReadoutTargetChange($event)"
          />
        </div>

        <app-form-control-readout
          [control]="activeControl()"
          [valueLabel]="readoutLabel()"
          [formatValue]="activeFormatter()"
          [sampleValue]="activeSample()"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FormControlExampleComponent {
  protected readonly meta = meta;
  protected readonly languageOptions = LANGUAGE_OPTIONS;
  protected readonly readoutTargets = READOUT_TARGETS;
  protected readonly minGoLiveDate = daysFromToday(0);
  protected readonly minCheckInTime = timeToday(8, 0);
  protected readonly maxCheckInTime = timeToday(20, 0);

  protected readonly readoutTarget = signal<ReadoutTarget>('email');

  protected readonly search = new FormControl('', {
    nonNullable: true,
    validators: [Validators.minLength(3)],
  });
  protected readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  protected readonly bio = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(20), Validators.maxLength(280)],
  });
  protected readonly language = new FormControl<string | null>(null, Validators.required);
  protected readonly goLiveDate = new FormControl<Date | null>(null, Validators.required);
  protected readonly checkInTime = new FormControl<Date | null>(null, Validators.required);

  protected readonly activeControl = computed(() => this.controlFor(this.readoutTarget()));

  protected readonly readoutLabel = computed(() => {
    switch (this.readoutTarget()) {
      case 'search':
        return 'Search FormControl';
      case 'email':
        return 'Email FormControl';
      case 'bio':
        return 'Bio FormControl';
      case 'language':
        return 'Language FormControl';
      case 'date':
        return 'Go-live date FormControl';
      case 'time':
        return 'Check-in time FormControl';
    }
  });

  protected readonly activeFormatter = computed(() => {
    switch (this.readoutTarget()) {
      case 'language':
        return this.formatLanguage;
      case 'date':
        return formatDateValue;
      case 'time':
        return (value: unknown) => formatTimeValue(value, true);
      default:
        return undefined;
    }
  });

  protected readonly activeSample = computed(() => {
    switch (this.readoutTarget()) {
      case 'search':
        return 'release';
      case 'email':
        return 'demo@atom.chat';
      case 'bio':
        return 'Product designer exploring reactive forms with the Atom design system.';
      case 'language':
        return 'es';
      case 'date':
        return daysFromToday(14);
      case 'time':
        return timeToday(10, 0);
    }
  });

  formatLanguage = (value: unknown): string => {
    const code = typeof value === 'string' ? value : null;
    return this.languageOptions.find((option) => option.value === code)?.label ?? '—';
  };

  onReadoutTargetChange(value: string): void {
    if ((READOUT_TARGETS as readonly string[]).includes(value)) {
      this.readoutTarget.set(value as ReadoutTarget);
    }
  }

  private controlFor(target: ReadoutTarget): FormControl<unknown> {
    switch (target) {
      case 'search':
        return this.search;
      case 'email':
        return this.email;
      case 'bio':
        return this.bio;
      case 'language':
        return this.language;
      case 'date':
        return this.goLiveDate;
      case 'time':
        return this.checkInTime;
    }
  }
}
