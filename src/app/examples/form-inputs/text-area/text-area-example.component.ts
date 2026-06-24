import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomTextFieldComponent,
  AtomTextFieldInputDirective,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { TEXT_AREA_SIZES } from '../shared/form-input-demo.data';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('text-area');

@Component({
  selector: 'app-text-area-example',
  imports: [
    ReactiveFormsModule,
    AtomTextFieldComponent,
    AtomTextFieldInputDirective,
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
          <textarea
            atomTextFieldInput
            rows="4"
            maxlength="280"
            placeholder="Write a short bio…"
            [formControl]="bio"
          ></textarea>
        </atom-text-field>

        <p class="form-input-demo__readout typography-caption-regular">
          {{ bio.value?.length ?? 0 }} / 280 characters
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TextAreaExampleComponent {
  protected readonly meta = meta;
  protected readonly sizes = TEXT_AREA_SIZES;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly disabled = signal(false);
  protected readonly bio = new FormControl(
    'Standalone textarea inside atom-text-field — no atom-form-field wrapper.',
  );

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    if (checked) {
      this.bio.disable();
    } else {
      this.bio.enable();
    }
  }
}
