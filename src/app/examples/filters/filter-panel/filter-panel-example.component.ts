import { Component, signal } from '@angular/core';
import {
  AtomFilterCategoryDirective,
  AtomFilterPanelComponent,
  AtomListItemComponent,
  AtomSearchInputComponent,
  AtomSelectPanelComponent,
  AtomSelectSearchDirective,
  AtomSelectValueDirective,
  CategoryActivatedDetail,
  CategoryClearedDetail,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../shared/filter-demo.data';
import { FilterStateReadoutComponent } from '../shared/filter-state-readout.component';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-panel')!;

@Component({
  selector: 'app-filter-panel-example',
  imports: [
    ExamplePageComponent,
    AtomFilterPanelComponent,
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
      <div class="filter-panel-demo">
        <atom-filter-panel
          [renderInline]="true"
          (categoryActivated)="onCategoryActivated($event)"
          (categoryCleared)="onCategoryCleared($event)"
          (allCleared)="onAllCleared()"
        >
          <atom-list-item label="Status" [atomFilterCategory]="statusPanel">
            Status
          </atom-list-item>
          <atom-list-item label="Priority" [atomFilterCategory]="priorityPanel">
            Priority
          </atom-list-item>
        </atom-filter-panel>
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
      <atom-select-panel renderInline atomSelectSearch [multiple]="true">
        <atom-search-input placeholder="Search priority…" />
        @for (opt of priorityOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterPanelExampleComponent {
  protected readonly meta = meta;
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly priorityOptions = PRIORITY_OPTIONS;
  protected readonly events = signal<string[]>(['Select values in the right column.']);

  onCategoryActivated(detail: CategoryActivatedDetail): void {
    this.events.update((lines) => [
      ...lines,
      `(categoryActivated) index=${detail.index} label="${detail.label}"`,
    ]);
  }

  onCategoryCleared(detail: CategoryClearedDetail): void {
    this.events.update((lines) => [
      ...lines,
      `(categoryCleared) index=${detail.index} label="${detail.label}"`,
    ]);
  }

  onAllCleared(): void {
    this.events.update((lines) => [...lines, '(allCleared)']);
  }

  readoutLines(): string[] {
    return this.events();
  }
}
