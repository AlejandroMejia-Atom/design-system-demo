import { JsonPipe } from '@angular/common';
import { afterNextRender, Component, signal, viewChild } from '@angular/core';
import {
  ATOM_TABLE_IMPORTS,
  AtomPageEvent,
  AtomPaginationComponent,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from './shared/example-page.component';
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  PAGINATOR_TABLE_COLUMNS,
  PAGINATOR_TABLE_DATA,
} from './shared/paginator-demo.data';
import { paginatorExampleById } from './shared/paginator-examples.catalog';

const meta = paginatorExampleById('data-source');

@Component({
  selector: 'app-data-source-example',
  imports: [...ATOM_TABLE_IMPORTS, AtomPaginationComponent, ExamplePageComponent, JsonPipe],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="example-page__table-viewport">
        <table atom-table [dataSource]="dataSource" atomSort>
          <ng-container atomColumnDef="name">
            <th atomHeaderCell *atomHeaderCellDef atomSortHeader="name">Name</th>
            <td atomCell *atomCellDef="let row">{{ row.name }}</td>
          </ng-container>

          <ng-container atomColumnDef="status">
            <th atomHeaderCell *atomHeaderCellDef atomSortHeader="status">Status</th>
            <td atomCell *atomCellDef="let row">{{ row.status }}</td>
          </ng-container>

          <ng-container atomColumnDef="amount">
            <th atomHeaderCell *atomHeaderCellDef atomSortHeader="amount">Amount</th>
            <td atomCell *atomCellDef="let row">{{ row.amount }}</td>
          </ng-container>

          <tr atom-header-row *atomHeaderRowDef="displayedColumns"></tr>
          <tr atom-row *atomRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>

      <atom-pagination
        #paginator
        [length]="dataSource.filteredData.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageChange)="onPageChange($event)"
      />

      <div class="example-page__panel">
        <p class="example-page__panel-title">Last pageChange event</p>
        <pre class="example-page__event-log">{{ lastEvent() | json }}</pre>
      </div>
    </app-example-page>
  `,
  styleUrl: './shared/example-layout.scss',
})
export class DataSourceExampleComponent {
  protected readonly meta = meta;
  protected readonly pageSizeOptions = [...DEFAULT_PAGE_SIZE_OPTIONS];
  protected readonly displayedColumns = [...PAGINATOR_TABLE_COLUMNS];
  protected readonly dataSource = new AtomTableDataSource(PAGINATOR_TABLE_DATA);
  protected readonly pageSize = 5;
  protected readonly lastEvent = signal<AtomPageEvent | null>(null);

  private readonly paginator = viewChild.required<AtomPaginationComponent>('paginator');

  constructor() {
    afterNextRender(() => {
      this.dataSource.atomPaginator = this.paginator();
    });
  }

  protected onPageChange(event: AtomPageEvent): void {
    this.lastEvent.set(event);
  }
}
