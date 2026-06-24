import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ATOM_FORM_FIELD_IMPORTS,
  AtomButtonComponent,
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
import { LANGUAGE_OPTIONS } from '../shared/form-input-demo.data';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('form-group');

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
  selector: 'app-form-group-example',
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
    AtomButtonComponent,
    ExamplePageComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <form class="form-group-demo" [formGroup]="form">
        <atom-search-input
          class="form-field-demo__toolbar"
          placeholder="Quick filter…"
          formControlName="search"
        />

        <atom-form-field>
          <label atomFormFieldLabel>Display name</label>
          <atom-text-field>
            <input atomTextFieldInput type="text" formControlName="displayName" />
          </atom-text-field>
          <span atomFormFieldValidation="error">Display name is required.</span>
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Language</label>
          <atom-select-input searchable placeholder="Select language" formControlName="language">
            @for (option of languageOptions; track option.value) {
              <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
            }
          </atom-select-input>
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Go-live date</label>
          <atom-date-picker formControlName="goLiveDate" [min]="minGoLiveDate" />
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Check-in time</label>
          <atom-time-picker formControlName="checkInTime" timeFormat="24h" interval="30m" />
        </atom-form-field>

        <pre class="form-group-demo__json typography-caption-regular">{{ formSnapshot() }}</pre>

        <div class="form-group-demo__actions">
          <button atom-button="primary" size="s" type="button" (click)="markAllTouched()">
            Mark all touched
          </button>
          <button atom-button="secondary" size="s" type="button" (click)="patchSample()">
            Patch sample
          </button>
          <button atom-button="tertiary" size="s" type="button" (click)="toggleDisabled()">
            {{ formDisabled() ? 'Enable form' : 'Disable form' }}
          </button>
          <button atom-button="tertiary" size="s" type="button" (click)="reset()">Reset</button>
        </div>
      </form>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FormGroupExampleComponent {
  protected readonly meta = meta;
  protected readonly languageOptions = LANGUAGE_OPTIONS;
  protected readonly minGoLiveDate = daysFromToday(0);
  protected readonly formDisabled = signal(false);

  protected readonly form = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    displayName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    language: new FormControl<string | null>(null, Validators.required),
    goLiveDate: new FormControl<Date | null>(null, Validators.required),
    checkInTime: new FormControl<Date | null>(null, Validators.required),
  });

  formSnapshot(): string {
    const raw = this.form.getRawValue();
    return JSON.stringify(
      {
        ...raw,
        goLiveDate: formatDateValue(raw.goLiveDate),
        checkInTime: formatTimeValue(raw.checkInTime, false),
        status: this.form.status,
        valid: this.form.valid,
        touched: this.form.touched,
      },
      null,
      2,
    );
  }

  markAllTouched(): void {
    this.form.markAllAsTouched();
  }

  patchSample(): void {
    this.form.patchValue({
      search: 'release',
      displayName: 'Atom DS Team',
      language: 'en',
      goLiveDate: daysFromToday(30),
      checkInTime: timeToday(10, 0),
    });
  }

  toggleDisabled(): void {
    const next = !this.formDisabled();
    this.formDisabled.set(next);
    if (next) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  reset(): void {
    this.formDisabled.set(false);
    this.form.reset({
      search: '',
      displayName: '',
      language: null,
      goLiveDate: null,
      checkInTime: null,
    });
  }
}
