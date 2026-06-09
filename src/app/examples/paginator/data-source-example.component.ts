import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { AtomPageEvent, AtomPaginationComponent } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from './shared/example-page.component';
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  PAGINATOR_DEMO_ITEMS,
} from './shared/paginator-demo.data';
import { paginatorExampleById } from './shared/paginator-examples.catalog';

const meta = paginatorExampleById('data-source');

const ATOM_TABLE_INTEGRATION_HINT = `// atom-table integration
const dataSource = new AtomTableDataSource(rows);
afterNextRender(() => {
  dataSource.atomPaginator = paginator();
});`;

@Component({
  selector: 'app-data-source-example',
  imports: [AtomPaginationComponent, ExamplePageComponent, JsonPipe],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <ul class="example-page__item-list" aria-label="Current page records">
        @for (item of visibleItems(); track item.id) {
          <li class="example-page__item">
            <span>{{ item.label }}</span>
            <span class="example-page__item-status">{{ item.status }}</span>
          </li>
        } @empty {
          <li class="example-page__item">No records on this page.</li>
        }
      </ul>

      <atom-pagination
        [length]="datasetLength()"
        [pageSize]="pageSize()"
        [pageIndex]="pageIndex()"
        [pageSizeOptions]="pageSizeOptions"
        (pageChange)="onPageChange($event)"
      />

      <div class="example-page__panel">
        <p class="example-page__panel-title">Last pageChange event</p>
        <pre class="example-page__event-log">{{ lastEvent() | json }}</pre>
      </div>

      <pre class="example-page__code-hint">{{ tableIntegrationHint }}</pre>
    </app-example-page>
  `,
  styleUrl: './shared/example-layout.scss',
})
export class DataSourceExampleComponent {
  protected readonly meta = meta;
  protected readonly tableIntegrationHint = ATOM_TABLE_INTEGRATION_HINT;
  protected readonly pageSizeOptions = [...DEFAULT_PAGE_SIZE_OPTIONS];
  protected readonly allItems = PAGINATOR_DEMO_ITEMS;

  protected readonly datasetLength = signal(this.allItems.length);
  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(10);
  protected readonly lastEvent = signal<AtomPageEvent | null>(null);

  protected readonly visibleItems = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.allItems.slice(start, start + this.pageSize());
  });

  protected onPageChange(event: AtomPageEvent): void {
    this.lastEvent.set(event);
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
