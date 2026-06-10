import { afterNextRender, Component, viewChild } from '@angular/core';
import {
  AtomPaginationComponent,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { TABLE_BUILDER_DEMO_IMPORTS } from '../shared/table-builder.imports';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  trackUserBy,
  USER_COLUMNS,
  USER_DATA,
} from '../shared/table-builder-demo.data';
import { tableBuilderExampleById } from '../shared/table-builder-examples.catalog';

const meta = tableBuilderExampleById('pagination');

@Component({
  selector: 'app-pagination-example',
  imports: [...TABLE_BUILDER_DEMO_IMPORTS, AtomPaginationComponent, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
      [codeSnippet]="meta.codeSnippet"
    >
      <div class="example-page__table-viewport">
        <atom-table-builder
          [columns]="columns"
          [dataSource]="dataSource"
          [atomTrackBy]="trackBy"
        />
      </div>

      <atom-pagination
        #paginator
        [length]="dataSource.filteredData.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
      />
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class PaginationExampleComponent {
  protected readonly meta = meta;
  protected readonly columns = USER_COLUMNS;
  protected readonly dataSource = new AtomTableDataSource([...USER_DATA]);
  protected readonly trackBy = trackUserBy;
  protected readonly pageSize = 5;
  protected readonly pageSizeOptions = [...DEFAULT_PAGE_SIZE_OPTIONS];

  private readonly paginator = viewChild.required<AtomPaginationComponent>('paginator');

  constructor() {
    afterNextRender(() => {
      this.dataSource.atomPaginator = this.paginator();
    });
  }
}
