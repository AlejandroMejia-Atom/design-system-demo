import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomFilterCategoryDirective,
  AtomFilterChipComponent,
  AtomFilterChipLabelsDirective,
  AtomFilterPanelComponent,
  AtomListItemComponent,
  AtomSelectPanelComponent,
  AtomSelectValueDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { PRIORITY_OPTIONS } from '../shared/filter-demo.data';
import { FilterStateReadoutComponent } from '../shared/filter-state-readout.component';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-category')!;

@Component({
  selector: 'app-filter-category-example',
  imports: [
    ExamplePageComponent,
    ReactiveFormsModule,
    AtomFilterPanelComponent,
    AtomFilterCategoryDirective,
    AtomFilterChipComponent,
    AtomFilterChipLabelsDirective,
    AtomListItemComponent,
    AtomSelectPanelComponent,
    AtomSelectValueDirective,
    FilterStateReadoutComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <p class="filter-demo-note typography-caption-regular mb-m">
        Priority uses <code>[multiple]="false"</code> and a
        <code>FormControl</code> seeded with <code>'high'</code>.
      </p>

      <div class="filter-panel-demo mb-m">
        <atom-filter-panel [renderInline]="true">
          <atom-list-item
            #priorityCat="atomFilterCategory"
            label="Priority"
            [atomFilterCategory]="priorityPanel"
            [formControl]="priorityControl"
            [multiple]="false"
          >
            Priority
          </atom-list-item>
        </atom-filter-panel>
      </div>

      <atom-filter-chip
        [atomFilterChipLabels]="priorityCat.selectedLabels()"
        removeAriaLabel="Remove priority filter"
        chipAriaLabel="Priority"
      />

      <app-filter-state-readout [lines]="readoutLines()" />
    </app-example-page>

    <ng-template #priorityPanel>
      <atom-select-panel renderInline [multiple]="false">
        @for (opt of priorityOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterCategoryExampleComponent {
  protected readonly meta = meta;
  protected readonly priorityOptions = PRIORITY_OPTIONS;
  protected readonly priorityControl = new FormControl<string | null>('high');

  readoutLines(): string[] {
    const value = this.priorityControl.value;
    return [
      `FormControl value: ${value === null ? 'null' : JSON.stringify(value)}`,
      'Change selection in the panel — CVA syncs the control and chip labels.',
    ];
  }
}
