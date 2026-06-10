import { Component } from '@angular/core';
import { ATOM_TABLE_BUILDER_IMPORTS } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  BASIC_COLUMNS,
  PRODUCT_DATA,
  trackProductBy,
} from '../shared/table-builder-demo.data';
import { tableBuilderExampleById } from '../shared/table-builder-examples.catalog';

const meta = tableBuilderExampleById('basic');

@Component({
  selector: 'app-basic-example',
  imports: [...ATOM_TABLE_BUILDER_IMPORTS, ExamplePageComponent],
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
export class BasicExampleComponent {
  protected readonly meta = meta;
  protected readonly data = PRODUCT_DATA;
  protected readonly columns = BASIC_COLUMNS;
  protected readonly trackBy = trackProductBy;
}
