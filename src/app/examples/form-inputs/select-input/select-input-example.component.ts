import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomListItemComponent,
  AtomSelectGroupComponent,
  AtomSelectInputComponent,
  AtomSelectValueDirective,
  type AtomFormFieldSize,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { LANGUAGE_OPTIONS, SELECT_INPUT_SIZES } from '../shared/form-input-demo.data';
import { FormInputDemoToggleComponent } from '../shared/form-input-demo-toggle.component';
import { FormInputSegmentComponent } from '../shared/form-input-segment.component';
import { formInputExampleById } from '../shared/form-inputs-examples.catalog';

const meta = formInputExampleById('select-input');

type SelectLayout = 'single-flat' | 'single-grouped' | 'multiple-flat' | 'multiple-grouped';

@Component({
  selector: 'app-select-input-example',
  imports: [
    ReactiveFormsModule,
    AtomSelectInputComponent,
    AtomSelectGroupComponent,
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
            label="Multiple"
            [checked]="multiple()"
            (checkedChange)="onMultipleChange($event)"
          />
          <app-form-input-demo-toggle
            label="Grouped options"
            [checked]="grouped()"
            (checkedChange)="onGroupedChange($event)"
          />
          <app-form-input-demo-toggle
            label="Loading"
            [checked]="loading()"
            (checkedChange)="loading.set($event)"
          />
          <app-form-input-demo-toggle
            label="Hide clear footer"
            [checked]="hideClearFooter()"
            (checkedChange)="hideClearFooter.set($event)"
          />
          <app-form-input-demo-toggle
            label="Disabled"
            [checked]="disabled()"
            (checkedChange)="onDisabledChange($event)"
          />
        </div>

        @switch (layout()) {
          @case ('single-flat') {
            <atom-select-input
              class="form-input-demo__field"
              placeholder="Select a language"
              [size]="size()"
              [searchable]="searchable()"
              [loading]="loading()"
              loadingCaption="Fetching options…"
              [hideClearFooter]="hideClearFooter()"
              [formControl]="singleSelection"
            >
              @for (option of options; track option.value) {
                <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
              }
            </atom-select-input>
          }
          @case ('single-grouped') {
            <atom-select-input
              class="form-input-demo__field"
              placeholder="Select a language"
              [size]="size()"
              [searchable]="searchable()"
              [loading]="loading()"
              loadingCaption="Fetching options…"
              [hideClearFooter]="hideClearFooter()"
              [formControl]="singleSelection"
            >
              <atom-select-group label="Western Europe">
                @for (option of westernEuropeOptions; track option.value) {
                  <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
                }
              </atom-select-group>
              <atom-select-group label="Americas">
                @for (option of americasOptions; track option.value) {
                  <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
                }
              </atom-select-group>
            </atom-select-input>
          }
          @case ('multiple-flat') {
            <atom-select-input
              class="form-input-demo__field"
              multiple
              placeholder="Select languages"
              [size]="size()"
              [searchable]="searchable()"
              [loading]="loading()"
              loadingCaption="Fetching options…"
              [hideClearFooter]="hideClearFooter()"
              [formControl]="multiSelection"
            >
              @for (option of options; track option.value) {
                <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
              }
            </atom-select-input>
          }
          @case ('multiple-grouped') {
            <atom-select-input
              class="form-input-demo__field"
              multiple
              placeholder="Select languages"
              [size]="size()"
              [searchable]="searchable()"
              [loading]="loading()"
              loadingCaption="Fetching options…"
              [hideClearFooter]="hideClearFooter()"
              [formControl]="multiSelection"
            >
              <atom-select-group label="Western Europe">
                @for (option of westernEuropeOptions; track option.value) {
                  <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
                }
              </atom-select-group>
              <atom-select-group label="Americas">
                @for (option of americasOptions; track option.value) {
                  <atom-list-item [atomSelectValue]="option.value" [label]="option.label" />
                }
              </atom-select-group>
            </atom-select-input>
          }
        }

        <p class="form-input-demo__readout typography-caption-regular">
          Selected: <code>{{ selectedLabel() }}</code>
        </p>
        <p class="form-input-demo__readout typography-caption-regular">
          Active API: <code>{{ apiSummary() }}</code>
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SelectInputExampleComponent {
  protected readonly meta = meta;
  protected readonly options = LANGUAGE_OPTIONS;
  protected readonly westernEuropeOptions = LANGUAGE_OPTIONS.filter((option) =>
    ['en', 'fr', 'de'].includes(option.value),
  );
  protected readonly americasOptions = LANGUAGE_OPTIONS.filter((option) => option.value === 'es');
  protected readonly sizes = SELECT_INPUT_SIZES;
  protected readonly size = signal<AtomFormFieldSize>('m');
  protected readonly searchable = signal(true);
  protected readonly multiple = signal(false);
  protected readonly grouped = signal(false);
  protected readonly loading = signal(false);
  protected readonly hideClearFooter = signal(false);
  protected readonly disabled = signal(false);
  protected readonly singleSelection = new FormControl<string | null>('es');
  protected readonly multiSelection = new FormControl<string[]>([], { nonNullable: true });

  protected readonly layout = computed<SelectLayout>(() => {
    if (this.multiple()) {
      return this.grouped() ? 'multiple-grouped' : 'multiple-flat';
    }
    return this.grouped() ? 'single-grouped' : 'single-flat';
  });

  protected readonly apiSummary = computed(
    () =>
      [
        `size="${this.size()}"`,
        `searchable=${this.searchable()}`,
        `multiple=${this.multiple()}`,
        `grouped=${this.grouped()}`,
        `loading=${this.loading()}`,
        `hideClearFooter=${this.hideClearFooter()}`,
        `disabled=${this.disabled()}`,
      ].join(' · '),
  );

  onSizeChange(value: string): void {
    this.size.set(value as AtomFormFieldSize);
  }

  onGroupedChange(checked: boolean): void {
    this.grouped.set(checked);
    this.syncDisabledState();
  }

  onMultipleChange(checked: boolean): void {
    this.multiple.set(checked);
    if (checked) {
      this.multiSelection.setValue(this.singleSelection.value ? [this.singleSelection.value] : []);
    } else {
      const first = this.multiSelection.value[0] ?? null;
      this.singleSelection.setValue(first);
    }
    this.syncDisabledState();
  }

  onDisabledChange(checked: boolean): void {
    this.disabled.set(checked);
    this.syncDisabledState();
  }

  private syncDisabledState(): void {
    const control = this.multiple() ? this.multiSelection : this.singleSelection;
    if (this.disabled()) {
      control.disable({ emitEvent: false });
    } else {
      control.enable({ emitEvent: false });
    }
  }

  selectedLabel(): string {
    if (this.multiple()) {
      const labels = this.multiSelection.value.map(
        (code) => this.options.find((option) => option.value === code)?.label ?? code,
      );
      return labels.length ? labels.join(', ') : '—';
    }
    const value = this.singleSelection.value;
    return this.options.find((option) => option.value === value)?.label ?? '—';
  }
}
