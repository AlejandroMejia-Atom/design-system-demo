import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  ATOM_TABLE_BUILDER_IMPORTS,
  AtomTagComponent,
  type AtomCellContext,
  type AtomTableColumn,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import { PRODUCT_DATA, trackProductBy, type ProductRow } from '../shared/table-builder-demo.data';
import { tableBuilderExampleById } from '../shared/table-builder-examples.catalog';

const meta = tableBuilderExampleById('custom-template');

@Component({
  selector: 'app-custom-template-example',
  imports: [...ATOM_TABLE_BUILDER_IMPORTS, AtomTagComponent, ExamplePageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
      [codeSnippet]="meta.codeSnippet"
    >
      <div class="example-page__table-viewport">
        <atom-table-builder
          [columns]="columns()"
          [dataSource]="data"
          [atomTrackBy]="trackBy"
        />
      </div>

      <ng-template #statusTpl let-value="value">
        <span atomTag [intent]="value ? 'success' : 'neutral'">
          {{ value ? 'Active' : 'Inactive' }}
        </span>
      </ng-template>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class CustomTemplateExampleComponent implements AfterViewInit {
  protected readonly meta = meta;
  protected readonly data = PRODUCT_DATA;
  protected readonly trackBy = trackProductBy;

  private readonly statusTpl =
    viewChild.required<TemplateRef<AtomCellContext<ProductRow>>>('statusTpl');
  private readonly _columns = signal<AtomTableColumn<ProductRow>[]>([]);
  protected readonly columns = this._columns.asReadonly();

  ngAfterViewInit(): void {
    this._columns.set([
      { columnName: 'name', columnLabel: 'Name', accessor: 'name' },
      {
        columnName: 'active',
        columnLabel: 'Status',
        accessor: 'active',
        cellTpl: this.statusTpl(),
      },
      { columnName: 'amount', columnLabel: 'Amount', accessor: 'amount', columnType: 'currency' },
    ]);
  }
}
