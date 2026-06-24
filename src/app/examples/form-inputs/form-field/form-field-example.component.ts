import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  AtomButtonComponent,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { LANGUAGE_OPTIONS } from '../shared/form-input-demo.data';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('form-field');

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
  selector: 'app-form-field-example',
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
      <form class="form-field-demo" [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-field-demo__search">
          <label class="typography-label-bold fg-primary mb-xs" for="profile-search">
            Search
          </label>
          <p class="typography-caption-regular fg-secondary mb-xs">
            atom-search-input is not an AtomFormFieldControl — shown with a manual label in the
            same form layout.
          </p>
          <atom-search-input
            id="profile-search"
            class="form-field-demo__toolbar"
            placeholder="Filter by name or email…"
            formControlName="search"
          />
        </div>

        <atom-form-field>
          <label atomFormFieldLabel for="profile-email">Email</label>
          <atom-text-field>
            <input
              id="profile-email"
              atomTextFieldInput
              type="email"
              autocomplete="email"
              formControlName="email"
            />
          </atom-text-field>
          <span atomFormFieldSupport>We will only use this for account notifications.</span>
          <span atomFormFieldValidation="error">Enter a valid email address.</span>
        </atom-form-field>

        <atom-form-field counterSuffix="characters">
          <label atomFormFieldLabel for="profile-bio">Bio</label>
          <atom-text-field>
            <textarea
              id="profile-bio"
              atomTextFieldInput
              rows="4"
              maxlength="280"
              formControlName="bio"
            ></textarea>
          </atom-text-field>
          <span atomFormFieldSupport>Tell us a little about yourself.</span>
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Preferred language</label>
          <atom-select-input searchable placeholder="Select a language" formControlName="language">
            @for (option of languageOptions; track option.value) {
              <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
            }
          </atom-select-input>
          <span atomFormFieldValidation="error">Language is required.</span>
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Birth date</label>
          <atom-date-picker formControlName="birthDate" [max]="maxBirthDate" />
          <span atomFormFieldValidation="error">Pick a valid birth date.</span>
        </atom-form-field>

        <atom-form-field>
          <label atomFormFieldLabel>Preferred contact time</label>
          <atom-time-picker
            formControlName="contactTime"
            timeFormat="12h"
            interval="30m"
            [min]="minContactTime"
            [max]="maxContactTime"
          />
          <span atomFormFieldSupport>Office hours only (8:00 AM – 8:00 PM).</span>
        </atom-form-field>

        <div class="form-field-demo__actions">
          <button atom-button="primary" type="submit">Save profile</button>
          <button atom-button="secondary" type="button" (click)="reset()">Reset</button>
        </div>
      </form>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FormFieldExampleComponent {
  protected readonly meta = meta;
  protected readonly languageOptions = LANGUAGE_OPTIONS;
  protected readonly maxBirthDate = daysFromToday(0);
  protected readonly minContactTime = timeToday(8, 0);
  protected readonly maxContactTime = timeToday(20, 0);

  protected readonly form = new FormGroup({
    search: new FormControl(''),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    bio: new FormControl('Product designer based in Madrid.', { nonNullable: true }),
    language: new FormControl<string | null>(null, Validators.required),
    birthDate: new FormControl<Date | null>(daysFromToday(-365 * 28), Validators.required),
    contactTime: new FormControl<Date | null>(timeToday(10, 0), Validators.required),
  });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    // Demo only — values stay on screen for inspection.
  }

  reset(): void {
    this.form.reset({
      search: '',
      email: '',
      bio: '',
      language: null,
      birthDate: null,
      contactTime: null,
    });
  }
}
