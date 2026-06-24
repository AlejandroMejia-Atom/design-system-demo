import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomTextFieldComponent,
  AtomTextFieldInputDirective,
  AtomTextFieldLeadingDirective,
  AtomTextFieldTrailingDirective,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { TEXT_FIELD_SIZES } from '../shared/form-input-demo.data';
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
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        <atom-text-field class="form-input-demo__field" [size]="size()">
          <span atomTextFieldLeading class="typography-body-regular fg-secondary">@</span>
          <input
            atomTextFieldInput
            type="email"
            placeholder="username"
            [formControl]="email"
          />
          <span atomTextFieldTrailing class="typography-body-regular fg-secondary">.com</span>
        </atom-text-field>

        <p class="form-input-demo__readout typography-caption-regular">
          Value: <code>{{ email.value || '—' }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TextFieldExampleComponent {
  protected readonly meta = meta;
  protected readonly sizes = TEXT_FIELD_SIZES;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly email = new FormControl('demo.user');
  protected readonly disabled = signal(false);

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    if (checked) {
      this.email.disable();
    } else {
      this.email.enable();
    }
  }
}
