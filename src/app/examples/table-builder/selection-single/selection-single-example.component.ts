import { Component, signal } from '@angular/core';
import { ATOM_TABLE_BUILDER_IMPORTS } from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  BASIC_COLUMNS,
  PRODUCT_DATA,
  trackProductBy,
  type ProductRow,
} from '../shared/table-builder-demo.data';
import { tableBuilderExampleById } from '../shared/table-builder-examples.catalog';

const meta = tableBuilderExampleById('selection-single');

@Component({
  selector: 'app-selection-single-example',
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
          [selectable]="true"
          [multiple]="false"
          (rowClick)="onRowClick($event)"
          (selectionChange)="onSelectionChange($event)"
        />
      </div>

      <div class="example-page__panel p-m bg-secondary mt-m">
        <p class="example-page__panel-title typography-label-bold fg-secondary mb-s">
          Active selection
        </p>
        <p class="example-page__panel-value typography-caption-regular fg-primary">
          {{ selectedLabel() }}
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SelectionSingleExampleComponent {
  protected readonly meta = meta;
  protected readonly data = PRODUCT_DATA;
  protected readonly columns = BASIC_COLUMNS;
  protected readonly trackBy = trackProductBy;
  protected readonly selectedLabel = signal('No row selected');

  protected onRowClick(row: ProductRow): void {
    this.selectedLabel.set(`Clicked: ${row.name}`);
  }

  protected onSelectionChange(rows: readonly ProductRow[]): void {
    const selected = rows.at(-1);
    this.selectedLabel.set(selected ? `Selected: ${selected.name}` : 'No row selected');
  }
}
