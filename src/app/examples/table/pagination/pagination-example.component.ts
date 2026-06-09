import { Component, afterNextRender, viewChild } from '@angular/core';
import {
  ATOM_TABLE_IMPORTS,
  AtomPaginationComponent,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  DEMO_DATA,
  STANDARD_COLUMNS,
} from '../shared/table-demo.data';
import { ALL_TABLE_EXAMPLES } from '../shared/table-examples.catalog';

const meta = ALL_TABLE_EXAMPLES.find((e) => e.id === 'pagination')!;

@Component({
  selector: 'app-pagination-example',
  imports: [...ATOM_TABLE_IMPORTS, AtomPaginationComponent, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
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

      <atom-pagination
        #paginator
        [length]="dataSource.filteredData.length"
        [pageSize]="5"
        [pageSizeOptions]="[5, 10, 25]"
      />
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class PaginationExampleComponent {
  protected readonly meta = meta;
  protected readonly displayedColumns = [...STANDARD_COLUMNS];
  protected readonly dataSource = new AtomTableDataSource(DEMO_DATA);
  private readonly paginator = viewChild.required<AtomPaginationComponent>('paginator');

  constructor() {
    afterNextRender(() => {
      this.dataSource.atomPaginator = this.paginator();
    });
  }
}
