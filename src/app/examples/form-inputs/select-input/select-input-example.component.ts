import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomListItemComponent,
  AtomSelectInputComponent,
  AtomSelectValueDirective,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { LANGUAGE_OPTIONS, SELECT_INPUT_SIZES } from '../shared/form-input-demo.data';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('select-input');

@Component({
  selector: 'app-select-input-example',
  imports: [
    ReactiveFormsModule,
    AtomSelectInputComponent,
    AtomListItemComponent,
    AtomSelectValueDirective,
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
            label="Searchable"
            [checked]="searchable()"
            (checkedChange)="searchable.set($event)"
          />
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        <atom-select-input
          class="form-input-demo__field"
          placeholder="Select a language"
          [size]="size()"
          [searchable]="searchable()"
          [formControl]="language"
        >
          @for (option of options; track option.value) {
            <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
          }
        </atom-select-input>

        <p class="form-input-demo__readout typography-caption-regular">
          Selected: <code>{{ selectedLabel() }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SelectInputExampleComponent {
  protected readonly meta = meta;
  protected readonly options = LANGUAGE_OPTIONS;
  protected readonly sizes = SELECT_INPUT_SIZES;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly searchable = signal(true);
  protected readonly disabled = signal(false);
  protected readonly language = new FormControl<string | null>('es');

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    if (checked) {
      this.language.disable();
    } else {
      this.language.enable();
    }
  }

  selectedLabel(): string {
    const value = this.language.value;
    return this.options.find((option) => option.value === value)?.label ?? '—';
  }
}
