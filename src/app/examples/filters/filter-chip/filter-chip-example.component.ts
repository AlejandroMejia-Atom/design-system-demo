import { Component, signal } from '@angular/core';
import {
  AtomFilterChipComponent,
  AtomFilterChipLabelsDirective,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { CHIP_LABEL_SAMPLES } from '../shared/filter-demo.data';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-chip')!;

@Component({
  selector: 'app-filter-chip-example',
  imports: [
    ExamplePageComponent,
    AtomFilterChipComponent,
    AtomFilterChipLabelsDirective,
  ],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="filter-demo-stack">
        <atom-filter-chip
          [atomFilterChipLabels]="fewLabels"
          removeAriaLabel="Remove status filters"
          chipAriaLabel="Status"
          (cleared)="onCleared('few')"
          (chipClick)="onChipClick('few')"
        />

        <atom-filter-chip
          [atomFilterChipLabels]="manyLabels"
          removeAriaLabel="Remove status filters"
          chipAriaLabel="Status"
          (cleared)="onCleared('many')"
        />

        <atom-filter-chip
          [atomFilterChipLabels]="longLabels"
          removeAriaLabel="Remove long label filter"
          chipAriaLabel="Department"
        />
      </div>

      @if (lastEvent()) {
        <p class="filter-demo-note typography-caption-regular mt-m">{{ lastEvent() }}</p>
      }
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterChipExampleComponent {
  protected readonly meta = meta;
  protected readonly fewLabels = [...CHIP_LABEL_SAMPLES.few];
  protected readonly manyLabels = [...CHIP_LABEL_SAMPLES.many];
  protected readonly longLabels = [...CHIP_LABEL_SAMPLES.long];
  protected lastEvent = signal<string | null>(null);

  onCleared(which: string): void {
    this.lastEvent.set(`(cleared) from "${which}" chip`);
  }

  onChipClick(which: string): void {
    this.lastEvent.set(`(chipClick) on "${which}" chip — reopen category panel`);
  }
}
