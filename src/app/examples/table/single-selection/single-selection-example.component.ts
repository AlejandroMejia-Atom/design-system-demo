import { Component } from '@angular/core';
import {
  ATOM_TABLE_IMPORTS,
  AtomTableDataSource,
} from '@atomchat-io/ui-design-system';

import { ExamplePageComponent } from '../shared/example-page.component';
import { DEMO_DATA } from '../shared/table-demo.data';
import { ALL_TABLE_EXAMPLES } from '../shared/table-examples.catalog';

const meta = ALL_TABLE_EXAMPLES.find((e) => e.id === 'single-selection')!;

@Component({
  selector: 'app-single-selection-example',
  imports: [...ATOM_TABLE_IMPORTS, ExamplePageComponent],
  template: `
    <app-example-page
      [title]="meta.title"
      [description]="meta.description"
      [checklist]="meta.checklist"
    >
      <table
        atom-table
        atomSelectable
        atomSelectionMode="single"
        [dataSource]="dataSource"
      >
        <ng-container atomColumnDef="name">
          <th atomHeaderCell *atomHeaderCellDef>Name</th>
          <td atomCell *atomCellDef="let row">{{ row.name }}</td>
        </ng-container>

        <ng-container atomColumnDef="status">
          <th atomHeaderCell *atomHeaderCellDef>Status</th>
          <td atomCell *atomCellDef="let row">{{ row.status }}</td>
        </ng-container>

        <tr atom-header-row *atomHeaderRowDef="displayedColumns"></tr>
        <tr
          atom-row
          *atomRowDef="let row; columns: displayedColumns"
          [atomRowValue]="row"
        ></tr>
      </table>
    </app-example-page>
  `,
  styleUrl: '../shared/example-layout.scss',
})
export class SingleSelectionExampleComponent {
  protected readonly meta = meta;
  protected readonly displayedColumns = ['name', 'status'];
  protected readonly dataSource = new AtomTableDataSource(DEMO_DATA.slice(0, 6));
}
