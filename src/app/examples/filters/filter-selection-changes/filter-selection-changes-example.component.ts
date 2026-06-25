import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AtomFilterCategoryDirective,
  AtomFilterPanelComponent,
  AtomListItemComponent,
  AtomSearchInputComponent,
  AtomSelectPanelComponent,
  AtomSelectSearchDirective,
  AtomSelectValueDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { STATUS_OPTIONS, TAG_OPTIONS } from '../shared/filter-demo.data';
import { FilterStateReadoutComponent } from '../shared/filter-state-readout.component';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-selection-changes')!;

@Component({
  selector: 'app-filter-selection-changes-example',
  imports: [
    ExamplePageComponent,
    ReactiveFormsModule,
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
      <div class="filter-demo-stack">
        <section>
          <h3 class="typography-body-bold">With FormControl</h3>
          <p class="filter-demo-note typography-caption-regular mb-s">
            Bind <code>[formControl]</code> and subscribe to
            <code>valueChanges</code>. Emits when the user toggles options in the
            right column.
          </p>
          <div class="filter-panel-demo">
            <atom-filter-panel [renderInline]="true">
              <atom-list-item
                label="Status"
                [atomFilterCategory]="statusPanel"
                [formControl]="statusControl"
              >
                Status
              </atom-list-item>
            </atom-filter-panel>
          </div>
          <app-filter-state-readout [lines]="statusEvents()" />
        </section>

        <section>
          <h3 class="typography-body-bold">Without FormControl</h3>
          <p class="filter-demo-note typography-caption-regular mb-s">
            Listen to <code>(selectionChanged)</code> on the inner
            <code>atom-select-panel</code> and read
            <code>selectedValues()</code> / <code>selectedLabels()</code> from the
            panel instance (the event carries no payload).
          </p>
          <div class="filter-panel-demo">
            <atom-filter-panel [renderInline]="true">
              <atom-list-item
                label="Tags"
                [atomFilterCategory]="tagsPanel"
              >
                Tags
              </atom-list-item>
            </atom-filter-panel>
          </div>
          <app-filter-state-readout [lines]="tagsEvents()" />
        </section>
      </div>
    </app-example-page>

    <ng-template #statusPanel>
      <atom-select-panel renderInline atomSelectSearch [multiple]="true">
        <atom-search-input placeholder="Search status…" />
        @for (opt of statusOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>

    <ng-template #tagsPanel>
      <atom-select-panel
        #tagsSelectPanel
        renderInline
        atomSelectSearch
        [multiple]="true"
        (selectionChanged)="onTagsSelectionChanged(tagsSelectPanel)"
      >
        <atom-search-input placeholder="Search tags…" />
        @for (opt of tagOptions; track opt.value) {
          <atom-list-item [atomSelectValue]="opt.value" [label]="opt.label" />
        }
      </atom-select-panel>
    </ng-template>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterSelectionChangesExampleComponent {
  protected readonly meta = meta;
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly tagOptions = TAG_OPTIONS;

  protected readonly statusControl = new FormControl<string[]>([]);
  protected readonly statusEvents = signal<string[]>([
    'Toggle status options — valueChanges events appear below.',
  ]);
  protected readonly tagsEvents = signal<string[]>([
    'Toggle tag options — selectionChanged events appear below.',
  ]);

  constructor() {
    this.statusControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.appendStatusEvent(`valueChanges: ${JSON.stringify(value)}`);
      });
  }

  onTagsSelectionChanged(panel: AtomSelectPanelComponent): void {
    this.appendTagsEvent(
      `selectionChanged — values: ${JSON.stringify(panel.selectedValues())}, labels: [${panel.selectedLabels().join(', ')}], count: ${panel.selectedCount()}`,
    );
  }

  private appendStatusEvent(line: string): void {
    this.statusEvents.update((lines) => [...lines, line]);
  }

  private appendTagsEvent(line: string): void {
    this.tagsEvents.update((lines) => [...lines, line]);
  }
}
