import { Component, signal } from '@angular/core';
import {
  AtomFilterChipComponent,
  AtomFilterChipLabelsDirective,
  AtomFilterRowComponent,
  AtomFilterTriggerComponent,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { CHIP_LABEL_SAMPLES } from '../shared/filter-demo.data';
import { FilterDemoSegmentComponent } from '../shared/filter-demo-segment.component';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-row')!;

@Component({
  selector: 'app-filter-row-example',
  imports: [
    ExamplePageComponent,
    AtomFilterRowComponent,
    AtomFilterTriggerComponent,
    AtomFilterChipComponent,
    AtomFilterChipLabelsDirective,
    FilterDemoSegmentComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <atom-filter-row
        triggerLabel="Filters"
        (allFiltersCleared)="clearAll()"
        (triggerClick)="onTriggerClick()"
      >
        <button
          atom-filter-trigger
          label="Filters"
          [badgeCount]="appliedCategoryCount()"
          ariaLabel="Open filters"
        ></button>

        @if (statusActive()) {
          <atom-filter-chip
            [atomFilterChipLabels]="statusLabels"
            removeAriaLabel="Remove status filters"
            chipAriaLabel="Status"
            (cleared)="statusActive.set(false)"
          />
        }

        @if (priorityActive()) {
          <atom-filter-chip
            [atomFilterChipLabels]="priorityLabels"
            removeAriaLabel="Remove priority filters"
            chipAriaLabel="Priority"
            (cleared)="priorityActive.set(false)"
          />
        }
      </atom-filter-row>

      <p class="filter-demo-note typography-caption-regular mt-m">
        Toggle categories below to simulate applied filters. The row's built-in
        "Clear filters" button uses <code>ATOM_FILTER_ROW_LABELS.cleanFiltersButton</code>.
      </p>

      <div class="filter-demo-toolbar mt-s">
        <app-filter-demo-segment
          label="Status"
          [active]="statusActive()"
          (activeChange)="statusActive.set($event)"
        />
        <app-filter-demo-segment
          label="Priority"
          [active]="priorityActive()"
          (activeChange)="priorityActive.set($event)"
        />
      </div>

      @if (lastEvent()) {
        <p class="filter-demo-note typography-caption-regular">{{ lastEvent() }}</p>
      }
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterRowExampleComponent {
  protected readonly meta = meta;
  protected readonly statusLabels = [...CHIP_LABEL_SAMPLES.few];
  protected readonly priorityLabels = ['High'];
  protected readonly statusActive = signal(true);
  protected readonly priorityActive = signal(true);
  protected readonly lastEvent = signal<string | null>(null);

  protected appliedCategoryCount(): number {
    return Number(this.statusActive()) + Number(this.priorityActive());
  }

  clearAll(): void {
    this.statusActive.set(false);
    this.priorityActive.set(false);
    this.lastEvent.set('(allFiltersCleared) — row cleared every chip');
  }

  onTriggerClick(): void {
    this.lastEvent.set('(triggerClick) — wire atomDropdownTriggerFor in real usage');
  }
}
