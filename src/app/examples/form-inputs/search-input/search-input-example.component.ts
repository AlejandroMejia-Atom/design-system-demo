import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomSearchInputComponent,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { SEARCH_INPUT_SIZES } from '../shared/form-input-demo.data';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('search-input');

@Component({
  selector: 'app-search-input-example',
  imports: [
    ReactiveFormsModule,
    AtomSearchInputComponent,
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
            label="Expandable"
            [checked]="expandable()"
            (checkedChange)="expandable.set($event)"
          />
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        <atom-search-input
          class="form-input-demo__field"
          [size]="size()"
          [expandable]="expandable()"
          placeholder="Search users…"
          [formControl]="query"
          (search)="lastSearch.set($event)"
        />

        <p class="form-input-demo__readout typography-caption-regular">
          Bound value: <code>{{ query.value || '—' }}</code>
          · Last search event: <code>{{ lastSearch() || '—' }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SearchInputExampleComponent {
  protected readonly meta = meta;
  protected readonly sizes = SEARCH_INPUT_SIZES;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly expandable = signal(false);
  protected readonly disabled = signal(false);
  protected readonly lastSearch = signal('');
  protected readonly query = new FormControl('');

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    if (checked) {
      this.query.disable();
    } else {
      this.query.enable();
    }
  }
}
