import { Component, signal } from '@angular/core';
import {
  AtomFilterTriggerComponent,
  AtomIconButtonComponent,
} from '@atomchat-io/ui-design-system';
import { faMinus, faPlus } from '@fortawesome/pro-regular-svg-icons';

import { ExamplePageComponent } from '../../table/shared/example-page.component';
import { ALL_FILTER_EXAMPLES } from '../shared/filters-examples.catalog';

const meta = ALL_FILTER_EXAMPLES.find((e) => e.id === 'filter-trigger')!;

@Component({
  selector: 'app-filter-trigger-example',
  imports: [ExamplePageComponent, AtomFilterTriggerComponent, AtomIconButtonComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="filter-demo-stack">
        <div class="filter-demo-row">
          <button
            atom-filter-trigger
            label="Filters"
            [badgeCount]="null"
            ariaLabel="Open filters"
          ></button>
          <p class="filter-demo-note typography-caption-regular">No badge (badgeCount is null)</p>
        </div>

        <div class="filter-demo-row">
          <button
            atom-filter-trigger
            label="Filters"
            [badgeCount]="badgeCount()"
            ariaLabel="Open filters"
          ></button>
          <button
            type="button"
            atom-icon-button="secondary"
            size="s"
            [icon]="minusIcon"
            ariaLabel="Decrease badge count"
            (click)="decrementBadge()"
          ></button>
          <button
            type="button"
            atom-icon-button="secondary"
            size="s"
            [icon]="plusIcon"
            ariaLabel="Increase badge count"
            (click)="incrementBadge()"
          ></button>
          <p class="filter-demo-note typography-caption-regular">
            badgeCount = {{ badgeCount() }} (active styling when &gt; 0)
          </p>
        </div>

        <div class="filter-demo-row">
          <button
            atom-filter-trigger
            [badgeCount]="2"
            [disabled]="true"
            ariaLabel="Open filters"
          >
            Disabled
          </button>
          <p class="filter-demo-note typography-caption-regular">Icon-only label via projected content</p>
        </div>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class FilterTriggerExampleComponent {
  protected readonly meta = meta;
  protected readonly badgeCount = signal(2);
  protected readonly minusIcon = faMinus;
  protected readonly plusIcon = faPlus;

  incrementBadge(): void {
    this.badgeCount.update((n) => n + 1);
  }

  decrementBadge(): void {
    this.badgeCount.update((n) => Math.max(0, n - 1));
  }
}
