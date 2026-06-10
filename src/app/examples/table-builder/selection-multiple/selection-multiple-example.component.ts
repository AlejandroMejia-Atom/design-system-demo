import { Component, signal } from '@angular/core';
import { TABLE_BUILDER_DEMO_IMPORTS } from '../shared/table-builder.imports';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  BASIC_COLUMNS,
  PRODUCT_DATA,
  trackProductBy,
  type ProductRow,
} from '../shared/table-builder-demo.data';
import { tableBuilderExampleById } from '../shared/table-builder-examples.catalog';

const meta = tableBuilderExampleById('selection-multiple');

@Component({
  selector: 'app-selection-multiple-example',
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
          [selectable]="true"
          [multiple]="true"
          (selectionChange)="onSelectionChange($event)"
        />
      </div>

      <div class="example-page__panel p-m bg-secondary mt-m">
        <p class="example-page__panel-title typography-label-bold fg-secondary mb-s">
          Selected rows
        </p>
        <p class="example-page__panel-value typography-caption-regular fg-primary">
          {{ selectedCount() }} selected — {{ selectedSummary() }}
        </p>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SelectionMultipleExampleComponent {
  protected readonly meta = meta;
  protected readonly data = PRODUCT_DATA;
  protected readonly columns = BASIC_COLUMNS;
  protected readonly trackBy = trackProductBy;
  protected readonly selectedCount = signal(0);
  protected readonly selectedSummary = signal('none');

  protected onSelectionChange(rows: readonly ProductRow[]): void {
    this.selectedCount.set(rows.length);
    this.selectedSummary.set(rows.map((row) => row.name).join(', ') || 'none');
  }
}
