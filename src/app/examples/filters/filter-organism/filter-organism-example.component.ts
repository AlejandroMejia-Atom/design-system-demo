import { Component, signal } from '@angular/core';
import {
  AtomFilterCategoryDirective,
  AtomFilterComponent,
  AtomListItemComponent,
  AtomSearchInputComponent,
  AtomSelectPanelComponent,
  AtomSelectSearchDirective,
  AtomSelectValueDirective,
  CategoryClearedDetail,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { PRIORITY_OPTIONS, STATUS_OPTIONS, TAG_OPTIONS } from '../shared/filter-demo.data';
import { FilterDemoToggleComponent } from '../shared/filter-demo-toggle.component';
import { FilterStateReadoutComponent } from '../shared/filter-state-readout.component';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-organism')!;

@Component({
  selector: 'app-filter-organism-example',
  imports: [
    ExamplePageComponent,
    AtomFilterComponent,
    AtomFilterCategoryDirective,
    AtomListItemComponent,
    AtomSelectPanelComponent,
    AtomSelectSearchDirective,
    AtomSelectValueDirective,
    AtomSearchInputComponent,
    FilterDemoToggleComponent,
    FilterStateReadoutComponent,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <p class="filter-demo-note typography-caption-regular mb-m">
        See the checklist: category list items must be static. Toggle
        <code>showChips</code> to compare compact toolbar mode.
      </p>

      <app-filter-demo-toggle
        class="mb-m"
        label="Show chips"
        [checked]="showChips()"
        (checkedChange)="showChips.set($event)"
      />

      <atom-filter
        label="Filters"
        [showChips]="showChips()"
        (opened)="log('opened')"
        (closed)="log('closed')"
        (allCleared)="log('allCleared')"
        (categoryCleared)="onCategoryCleared($event)"
      >
        <atom-list-item label="Status" [atomFilterCategory]="statusPanel">Status</atom-list-item>
        <atom-list-item label="Priority" [atomFilterCategory]="priorityPanel">Priority</atom-list-item>
        <atom-list-item label="Tags" [atomFilterCategory]="tagsPanel">Tags</atom-list-item>
      </atom-filter>

      <app-filter-state-readout [lines]="events()" />
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
      <atom-select-panel renderInline atomSelectSearch [multiple]="true">
        <atom-search-input placeholder="Search priority…" />
        @for (opt of priorityOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>

    <ng-template #tagsPanel>
      <atom-select-panel renderInline atomSelectSearch [multiple]="true">
        <atom-search-input placeholder="Search tags…" />
        @for (opt of tagOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterOrganismExampleComponent {
  protected readonly meta = meta;
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly priorityOptions = PRIORITY_OPTIONS;
  protected readonly tagOptions = TAG_OPTIONS;
  protected readonly showChips = signal(true);
  protected readonly events = signal<string[]>(['Open the filter and apply selections.']);

  log(name: string): void {
    this.events.update((lines) => [...lines, `(${name})`]);
  }

  onCategoryCleared(detail: CategoryClearedDetail): void {
    this.events.update((lines) => [
      ...lines,
      `(categoryCleared) "${detail.label}"`,
    ]);
  }
}
