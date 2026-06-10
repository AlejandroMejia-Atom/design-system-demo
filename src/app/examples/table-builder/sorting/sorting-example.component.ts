import { Component } from '@angular/core';
import { TABLE_BUILDER_DEMO_IMPORTS } from '../shared/table-builder.imports';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  PRODUCT_DATA,
  SORT_COLUMNS,
  trackProductBy,
} from '../shared/table-builder-demo.data';
import { tableBuilderExampleById } from '../shared/table-builder-examples.catalog';

const meta = tableBuilderExampleById('sorting');

@Component({
  selector: 'app-sorting-example',
  imports: [...TABLE_BUILDER_DEMO_IMPORTS, ExamplePageComponent],
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
          [dataSource]="data"
          [atomTrackBy]="trackBy"
        />
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SortingExampleComponent {
  protected readonly meta = meta;
  protected readonly data = PRODUCT_DATA;
  protected readonly columns = SORT_COLUMNS;
  protected readonly trackBy = trackProductBy;
}
