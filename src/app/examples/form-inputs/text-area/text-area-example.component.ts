import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomTextFieldComponent,
  AtomTextFieldInputDirective,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import {
  COUNTER_MODE_OPTIONS,
  TEXT_AREA_MAXLENGTH_OPTIONS,
  TEXT_AREA_SIZES,
} from '../shared/form-input-demo.data';
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
          <div class="form-input-demo__control-group">
            <span class="typography-caption-regular">maxlength</span>
            <app-form-input-segment
              [options]="maxlengthOptions"
              [value]="maxlengthOption()"
              (valueChange)="maxlengthOption.set($event)"
            />
          </div>
          <div class="form-input-demo__control-group">
            <span class="typography-caption-regular">counterMode</span>
            <app-form-input-segment
              [options]="counterModeOptions"
              [value]="counterMode()"
              (valueChange)="onCounterModeChange($event)"
            />
          </div>
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        <atom-text-field class="form-input-demo__field" [size]="size()" [counterMode]="counterMode()">
          <textarea
            atomTextFieldInput
            rows="4"
            [attr.maxlength]="maxlength()"
            placeholder="Write a short bio…"
            [formControl]="bio"
          ></textarea>
        </atom-text-field>

        <p class="form-input-demo__readout typography-caption-regular">
          {{ bio.value?.length ?? 0 }} / {{ maxlength() }} characters
        </p>
        <p class="form-input-demo__readout typography-caption-regular">
          Active API: <code>{{ apiSummary() }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class TextAreaExampleComponent {
  protected readonly meta = meta;
  protected readonly sizes = TEXT_AREA_SIZES;
  protected readonly maxlengthOptions = TEXT_AREA_MAXLENGTH_OPTIONS;
  protected readonly counterModeOptions = COUNTER_MODE_OPTIONS;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly maxlengthOption = signal<string>('280');
  protected readonly counterMode = signal<'char' | 'word'>('char');
  protected readonly disabled = signal(false);
  protected readonly bio = new FormControl(
    'Standalone textarea inside atom-text-field — no atom-form-field wrapper.',
  );

  protected readonly maxlength = computed(() => Number(this.maxlengthOption()));

  protected readonly apiSummary = computed(
    () =>
      `size="${this.size()}" · maxlength=${this.maxlength()} · counterMode="${this.counterMode()}" · disabled=${this.disabled()}`,
  );

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onCounterModeChange(value: string): void {
    this.counterMode.set(value as 'char' | 'word');
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
