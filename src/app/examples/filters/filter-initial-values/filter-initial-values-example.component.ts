import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomButtonComponent,
  AtomFilterCategoryDirective,
  AtomFilterComponent,
  AtomListItemComponent,
  AtomSearchInputComponent,
  AtomSelectPanelComponent,
  AtomSelectSearchDirective,
  AtomSelectValueDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import {
  INITIAL_PRIORITY_FILTER,
  INITIAL_STATUS_FILTER,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from '../shared/filter-demo.data';
import { FilterStateReadoutComponent } from '../shared/filter-state-readout.component';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-initial-values')!;

@Component({
  selector: 'app-filter-initial-values-example',
  imports: [
    ExamplePageComponent,
    ReactiveFormsModule,
    AtomButtonComponent,
    AtomFilterComponent,
    AtomFilterCategoryDirective,
    AtomListItemComponent,
    AtomSelectPanelComponent,
    AtomSelectSearchDirective,
    AtomSelectValueDirective,
    AtomSearchInputComponent,
    FilterStateReadoutComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <p class="filter-demo-note typography-caption-regular mb-m">
        Each category binds a <code>FormControl</code> with a pre-filled value.
        Chips and the trigger badge reflect applied filters before the panel opens.
      </p>

      <atom-filter label="Filters">
        <atom-list-item
          label="Status"
          [atomFilterCategory]="statusPanel"
          [formControl]="statusControl"
        >
          Status
        </atom-list-item>
        <atom-list-item
          label="Priority"
          [atomFilterCategory]="priorityPanel"
          [formControl]="priorityControl"
          [multiple]="false"
        >
          Priority
        </atom-list-item>
      </atom-filter>

      <div class="filter-demo-toolbar mt-m">
        <button atom-button="secondary" size="s" type="button" (click)="applyRouteDefaults()">
          Reset to route defaults
        </button>
        <button atom-button="tertiary" size="s" type="button" (click)="applyAlternatePreset()">
          Apply alternate preset
        </button>
      </div>

      <app-filter-state-readout [lines]="readoutLines()" />
    </app-example-page>

    <ng-template #statusPanel>
      <atom-select-panel renderInline atomSelectSearch [multiple]="true">
        <atom-search-input placeholder="Search status…" />
        @for (opt of statusOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>

    <ng-template #priorityPanel>
      <atom-select-panel renderInline atomSelectSearch [multiple]="false">
        <atom-search-input placeholder="Search priority…" />
        @for (opt of priorityOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterInitialValuesExampleComponent {
  protected readonly meta = meta;
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly priorityOptions = PRIORITY_OPTIONS;

  protected readonly statusControl = new FormControl<string[]>([
    ...INITIAL_STATUS_FILTER,
  ]);
  protected readonly priorityControl = new FormControl<string | null>(
    INITIAL_PRIORITY_FILTER,
  );

  applyRouteDefaults(): void {
    this.statusControl.setValue([...INITIAL_STATUS_FILTER]);
    this.priorityControl.setValue(INITIAL_PRIORITY_FILTER);
  }

  applyAlternatePreset(): void {
    this.statusControl.setValue(['resolved', 'closed']);
    this.priorityControl.setValue('urgent');
  }

  readoutLines(): string[] {
    return [
      `Status (multi): ${JSON.stringify(this.statusControl.value)}`,
      `Priority (single): ${JSON.stringify(this.priorityControl.value)}`,
      'writeValue runs through the category CVA — panel selections sync via requestEagerAttach.',
    ];
  }
}
