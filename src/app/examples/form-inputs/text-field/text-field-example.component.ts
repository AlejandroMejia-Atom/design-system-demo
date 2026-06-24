import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomTextFieldComponent,
  AtomTextFieldInputDirective,
  AtomTextFieldLeadingDirective,
  AtomTextFieldTrailingDirective,
  type AtomFormFieldSize,
  type AtomTextFieldInputType,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { TEXT_FIELD_SIZES, TEXT_FIELD_TYPE_OPTIONS } from '../shared/form-input-demo.data';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('text-field');

@Component({
  selector: 'app-text-field-example',
  imports: [
    ReactiveFormsModule,
    AtomTextFieldComponent,
    AtomTextFieldInputDirective,
    AtomTextFieldLeadingDirective,
    AtomTextFieldTrailingDirective,
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
          <div class="form-input-demo__control-group">
            <span class="typography-caption-regular">Type</span>
            <app-form-input-segment
              [options]="inputTypes"
              [value]="inputType()"
              (valueChange)="onTypeChange($event)"
            />
          </div>
          <app-form-input-demo-toggle
            label="Leading @"
            [checked]="showLeading()"
            (checkedChange)="showLeading.set($event)"
          />
          <app-form-input-demo-toggle
            label="Trailing .com"
            [checked]="showTrailing()"
            (checkedChange)="showTrailing.set($event)"
          />
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        <atom-text-field class="form-input-demo__field" [size]="size()">
          @if (showLeading()) {
            <span atomTextFieldLeading class="typography-body-regular fg-secondary">@</span>
          }
          <input
            atomTextFieldInput
            [type]="inputType()"
            [placeholder]="placeholder()"
            [formControl]="value"
          />
          @if (showTrailing()) {
            <span atomTextFieldTrailing class="typography-body-regular fg-secondary">.com</span>
          }
        </atom-text-field>

        <p class="form-input-demo__readout typography-caption-regular">
          Value: <code>{{ value.value || '—' }}</code>
        </p>
        <p class="form-input-demo__readout typography-caption-regular">
          Active API: <code>{{ apiSummary() }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TextFieldExampleComponent {
  protected readonly meta = meta;
  protected readonly sizes = TEXT_FIELD_SIZES;
  protected readonly inputTypes = TEXT_FIELD_TYPE_OPTIONS;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly inputType = signal<AtomTextFieldInputType>('email');
  protected readonly showLeading = signal(true);
  protected readonly showTrailing = signal(true);
  protected readonly disabled = signal(false);
  protected readonly value = new FormControl('demo.user');

  protected readonly placeholder = computed(() => {
    switch (this.inputType()) {
      case 'password':
        return 'Enter password';
      case 'url':
        return 'https://example.com';
      case 'email':
        return 'username';
      default:
        return 'Type here…';
    }
  });

  protected readonly apiSummary = computed(
    () =>
      [
        `size="${this.size()}"`,
        `type="${this.inputType()}"`,
        `leading=${this.showLeading()}`,
        `trailing=${this.showTrailing()}`,
        `disabled=${this.disabled()}`,
      ].join(' · '),
  );

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onTypeChange(value: string): void {
    this.inputType.set(value as AtomTextFieldInputType);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    if (checked) {
      this.value.disable();
    } else {
      this.value.enable();
    }
  }
}
