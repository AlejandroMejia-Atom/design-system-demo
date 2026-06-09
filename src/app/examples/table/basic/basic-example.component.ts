import { Component } from '@angular/core';
import {
  ATOM_TABLE_IMPORTS,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  DEMO_DATA,
  STANDARD_COLUMNS,
} from '../shared/table-demo.data';
import { ALL_TABLE_EXAMPLES } from '../shared/table-examples.catalog';

const meta = ALL_TABLE_EXAMPLES.find((e) => e.id === 'basic')!;

@Component({
  selector: 'app-basic-example',
  imports: [...ATOM_TABLE_IMPORTS, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="example-page__table-viewport">
      <table atom-table [dataSource]="dataSource">
        <ng-container atomColumnDef="name">
          <th atomHeaderCell *atomHeaderCellDef>Name</th>
          <td atomCell *atomCellDef="let row">{{ row.name }}</td>
        </ng-container>

        <ng-container atomColumnDef="status">
          <th atomHeaderCell *atomHeaderCellDef>Status</th>
          <td atomCell *atomCellDef="let row">{{ row.status }}</td>
        </ng-container>

        <ng-container atomColumnDef="amount">
          <th atomHeaderCell *atomHeaderCellDef>Amount</th>
          <td atomCell *atomCellDef="let row">{{ row.amount }}</td>
        </ng-container>

        <tr atom-header-row *atomHeaderRowDef="displayedColumns"></tr>
        <tr atom-row *atomRowDef="let row; columns: displayedColumns"></tr>
      </table>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class BasicExampleComponent {
  protected readonly meta = meta;
  protected readonly displayedColumns = [...STANDARD_COLUMNS];
  protected readonly dataSource = new AtomTableDataSource(DEMO_DATA);
}
