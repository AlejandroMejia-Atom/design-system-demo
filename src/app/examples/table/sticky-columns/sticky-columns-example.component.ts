import { Component } from '@angular/core';
import {
  ATOM_TABLE_IMPORTS,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import {
  WIDE_DATA,
  WIDE_DISPLAYED_COLUMNS,
} from '../shared/table-demo.data';
import { ALL_TABLE_EXAMPLES } from '../shared/table-examples.catalog';

const meta = ALL_TABLE_EXAMPLES.find((e) => e.id === 'sticky-columns')!;

@Component({
  selector: 'app-sticky-columns-example',
  imports: [...ATOM_TABLE_IMPORTS, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <div class="table-scroll">
        <table atom-table fixedLayout [dataSource]="dataSource">
          <colgroup>
            <col class="col-sticky-edge" />
            <col class="col-default" />
            <col class="col-default" />
            <col class="col-default" />
            <col class="col-default" />
            <col class="col-default" />
            <col class="col-default" />
            <col class="col-notes" />
            <col class="col-default" />
            <col class="col-sticky-edge" />
          </colgroup>

          <ng-container atomColumnDef="id" sticky>
            <th atomHeaderCell *atomHeaderCellDef>ID</th>
            <td atomCell *atomCellDef="let row">{{ row.id }}</td>
          </ng-container>

          <ng-container atomColumnDef="name">
            <th atomHeaderCell *atomHeaderCellDef>Name</th>
            <td atomCell *atomCellDef="let row">{{ row.name }}</td>
          </ng-container>

          <ng-container atomColumnDef="department">
            <th atomHeaderCell *atomHeaderCellDef>Department</th>
            <td atomCell *atomCellDef="let row">{{ row.department }}</td>
          </ng-container>

          <ng-container atomColumnDef="email">
            <th atomHeaderCell *atomHeaderCellDef>Email</th>
            <td atomCell *atomCellDef="let row">{{ row.email }}</td>
          </ng-container>

          <ng-container atomColumnDef="phone">
            <th atomHeaderCell *atomHeaderCellDef>Phone</th>
            <td atomCell *atomCellDef="let row">{{ row.phone }}</td>
          </ng-container>

          <ng-container atomColumnDef="city">
            <th atomHeaderCell *atomHeaderCellDef>City</th>
            <td atomCell *atomCellDef="let row">{{ row.city }}</td>
          </ng-container>

          <ng-container atomColumnDef="country">
            <th atomHeaderCell *atomHeaderCellDef>Country</th>
            <td atomCell *atomCellDef="let row">{{ row.country }}</td>
          </ng-container>

          <ng-container atomColumnDef="notes">
            <th atomHeaderCell *atomHeaderCellDef>Notes</th>
            <td atomCell *atomCellDef="let row">{{ row.notes }}</td>
          </ng-container>

          <ng-container atomColumnDef="status">
            <th atomHeaderCell *atomHeaderCellDef>Status</th>
            <td atomCell *atomCellDef="let row">{{ row.status }}</td>
          </ng-container>

          <ng-container atomColumnDef="actions" stickyEnd>
            <th atomHeaderCell *atomHeaderCellDef>Actions</th>
            <td atomCell *atomCellDef="let row">{{ row.actions }}</td>
          </ng-container>

          <tr atom-header-row *atomHeaderRowDef="displayedColumns"></tr>
          <tr atom-row *atomRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class StickyColumnsExampleComponent {
  protected readonly meta = meta;
  protected readonly displayedColumns = [...WIDE_DISPLAYED_COLUMNS];
  protected readonly dataSource = new AtomTableDataSource(WIDE_DATA);
}
